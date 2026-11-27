import {readFile, readdir} from 'node:fs/promises';
import {basename, resolve} from 'node:path';
import {catalog} from '../src/catalog.mjs';
import {adaptedSources, preservedNotices} from '../src/provenance.mjs';
import {repoRoot} from '../../../scripts/lib/paths.mjs';

function comment(text) {
  return text ? `<!--\n${text.replaceAll('--','—')}\n-->\n` : '';
}

const modificationNotice = 'Modified by Master Icons.';
// Apache 2.0 section 4(b) keeps the modification statement with the file,
// including in an archive whose README carries the authors and license.
export function archiveHeader(name) {
  const source = adaptedSources[name];
  return source?.license === 'Apache-2.0' ? comment(modificationNotice) : '';
}

export function withSvgHeader(svg, header) {
  const start = svg.indexOf('<svg');
  if (start < 0) throw new Error('Missing SVG root');
  return header + svg.slice(start);
}

const marker = '<!-- Generated artwork notices -->';
const endMarker = '<!-- End generated artwork notices -->';

export function creditedReadme(readme, credits) {
  const start = readme.indexOf(marker);
  if (start < 0) return readme.trimEnd()+'\n\n'+marker+'\n'+credits+'\n'+endMarker+'\n';
  const end = readme.indexOf(endMarker,start);
  if (end < 0) throw new Error('Missing end of the generated artwork notices in README.md');
  return readme.slice(0,start)+marker+'\n'+credits+'\n'+readme.slice(end);
}

export async function loadArtworkNotices() {
  const licenseFiles = {};
  for (const name of (await readdir(resolve(repoRoot,'licenses'))).sort()) {
    const path = 'licenses/'+name;
    licenseFiles[path] = await readFile(resolve(repoRoot,path),'utf8');
  }
  // The pinned Lucide license identifies the original Feather filenames.
  // Use the upstream filename even when the public Master name differs.
  const lucide = licenseFiles['licenses/lucide.txt'];
  const parts = lucide.match(/^([\s\S]+?)\n---\n\s*The following Lucide icons are derived from the Feather project:\s*\n([^\n]+)\s*\nThe MIT License \(MIT\) \(for the icons listed above\)\s*\n([\s\S]+)$/);
  if (!parts) throw new Error('Review the updated Lucide / Feather license before packaging');
  const featherNames = new Set(parts[2].split(', '));
  function sourceNotices(source) {
    if (source.licenseFile === 'licenses/lucide.txt') {
      const texts = [parts[1].trim()];
      if (featherNames.has(basename(source.reference,'.svg'))) texts.push('The MIT License (MIT)\n\n'+parts[3].trim());
      return texts;
    }
    return [licenseFiles[source.licenseFile].trim()];
  }

  const standaloneHeaders = new Map();
  const grouped = new Map();
  for (const entry of catalog) {
    const source = adaptedSources[entry.name];
    let texts = [];
    if (source?.standaloneNotice) {
      texts = [source.standaloneNotice];
    } else if (source?.license === 'Apache-2.0') {
      texts = [`${source.copyright}\n${source.reference}\n${modificationNotice}`, licenseFiles['licenses/Apache-2.0.txt'].trim()];
    } else if (source) {
      const sources = source.additionalSources ? [...source.additionalSources] : [source];
      if (source.baseSource && source.baseSourceRole !== 'historical') sources.unshift(source.baseSource);
      texts = [...new Set(sources.flatMap(sourceNotices))];
    } else if (preservedNotices[entry.name]) {
      texts = [licenseFiles['licenses/hugeicons-MIT.txt'].trim()];
    } else if (entry.source?.notice) {
      texts = [entry.source.notice];
    }
    standaloneHeaders.set(entry.name, entry.source?.noticeDelivery === 'bundle' ? '' : comment(texts.join('\n\n')));
    if (!texts.length && entry.category === 'brands') {
      texts = [`${entry.source.library}. ${entry.source.author}. ${entry.source.license}.`];
    }
    for (const text of texts) {
      if (!grouped.has(text)) grouped.set(text,[]);
      grouped.get(text).push(entry.name);
    }
  }
  const sections = [];
  for (const [text,names] of grouped) {
    sections.push(names.sort().map(name=>'`'+name+'`').join(', ')+'\n\n```text\n'+text+'\n```');
  }
  const credits = '\nEach notice applies to the listed drawings at every size, corner and stroke width. Include the applicable notices when redistributing individual files.\n\n'+sections.join('\n\n');
  return {standaloneHeaders,credits,licenseFiles};
}
