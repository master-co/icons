// Installs a published release into an empty project the way a user would, uses it, and checks that
// every package carries a registry signature and a provenance attestation from this repository.
//
//   node scripts/verify-package.mjs 1.0.0
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { setTimeout } from 'node:timers/promises'

const version = process.argv[2]
assert.match(version ?? '', /^\d+\.\d+\.\d+(?:-[\w.]+)?$/, 'Usage: node scripts/verify-package.mjs <version>')
const packages = ['@master/icons', ...['react', 'vue', 'svelte', 'preact', 'astro'].map(name => `@master/icons-${name}`)]
const run = (command, args, cwd) => execFileSync(command, args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] })

// The registry can take a moment to serve a version everywhere after publication.
for (const name of packages) {
  for (let attempt = 1; ; attempt++) {
    try { run('npm', ['view', `${name}@${version}`, 'version']); break }
    catch (error) { if (attempt === 20) throw error; await setTimeout(15000) }
  }
}

const project = mkdtempSync(join(tmpdir(), 'master-icons-consumer-'))
writeFileSync(join(project, 'package.json'), JSON.stringify({ name: 'consumer', private: true, type: 'module' }))
run('npm', ['install', '--no-fund', '--no-audit', `@master/icons@${version}`, `@master/icons-react@${version}`, 'react@19', 'react-dom@19'], project)

for (const name of ['@master/icons', '@master/icons-react']) {
  const manifest = JSON.parse(readFileSync(join(project, 'node_modules', name, 'package.json'), 'utf8'))
  assert.equal(manifest.version, version, `${name} installed ${manifest.version}`)
}
writeFileSync(join(project, 'smoke.mjs'), `
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Search, renderSvg } from '@master/icons';
import { SearchIcon } from '@master/icons-react';
import { SearchIcon as Fixed } from '@master/icons-react/16/soft';
assert.match(renderSvg(Search, { size: 20, strokeWidth: 2 }), /viewBox="0 0 20 20"/);
assert.match(renderToStaticMarkup(createElement(SearchIcon, { size: 20, label: 'Search' })), /aria-label="Search"/);
assert.match(renderToStaticMarkup(createElement(Fixed)), /viewBox="0 0 16 16"/);
`)
run('node', ['smoke.mjs'], project)

// Every installed package, these included, carries a valid registry signature and provenance.
run('npm', ['audit', 'signatures'], project)
for (const name of packages) {
  const dist = JSON.parse(run('npm', ['view', `${name}@${version}`, 'dist', '--json'], project))
  assert.ok(dist.attestations?.provenance, `${name}@${version} has no provenance attestation`)
}
console.log(`✓ ${packages.length} packages at ${version} install, render and carry provenance`)
