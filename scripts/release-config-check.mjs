// Holds the release workflow to its contract: npm publishes with provenance and no stored npm config, every
// public package publishes publicly, and the site is delivered through the pages-stable Git ref only after a
// completed release, without any Cloudflare credential. Run with `bun run check:release`.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { YAML } from 'bun'

const read = file => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')
const releaseWorkflow = YAML.parse(read('.github/workflows/release.yml'))
const ciWorkflow = YAML.parse(read('.github/workflows/ci.yml'))

assert.equal(releaseWorkflow.concurrency['cancel-in-progress'], false, 'Never cancel a release halfway through publishing')
assert.equal(releaseWorkflow.jobs.validation.uses, './.github/workflows/ci.yml', 'A release follows CI')
assert.equal(releaseWorkflow.jobs.validation.with?.release, true, 'Release runs the release gates of CI')

const release = releaseWorkflow.jobs.release
assert.equal(release.permissions['id-token'], 'write', 'npm trusted publishing and provenance require GitHub OIDC')
const runs = release.steps.map(step => step.run ?? '')
const install = runs.findIndex(run => /^npm install --global npm@/m.test(run))
const build = runs.findIndex(run => run.includes('bun run build:icons'))
const publish = runs.findIndex(run => /bun x aronrepo release\b/.test(run))
const strokes = runs.findIndex(run => run.includes('bun run build:strokes'))
assert.ok(install >= 0 && build > install && strokes > build && publish > strokes, 'Install the OIDC npm CLI and build the packages and download sets before publication')
const { default: config } = await import('../aronrepo.config.js')
assert.equal(config.release.assets.length, 12, 'Nine native and three custom-weight download sets are release assets')
for (const asset of config.release.assets) assert.doesNotMatch(asset.name, /\d+\.\d+\.\d+|\{tag\}/, 'Asset names carry no version, so releases/latest/download links stay stable')
for (const env of [releaseWorkflow.env, release.env, ...release.steps.map(step => step.env)]) {
  for (const key of Object.keys(env ?? {})) {
    assert.doesNotMatch(key, /^npm_config|^node_auth_token$/i, 'The release must not inject npm config')
  }
}

const site = releaseWorkflow.jobs['deploy-site']
assert.deepEqual(site.needs, ['release', 'verify-registry'], 'Site delivery follows the release and its registry check')
for (const condition of [`needs.release.result == 'success'`, `needs.verify-registry.result == 'success'`,
  `needs.release.outputs.released == 'false'`, `needs.verify-registry.result == 'skipped'`]) {
  assert.ok(site.if.includes(condition), `Site delivery is missing a release gate: ${condition}`)
}
assert.deepEqual(site.permissions, { contents: 'write' })
const delivery = site.steps.map(step => step.run ?? '').join('\n')
assert.match(delivery, /refs\/heads\/pages-stable/, 'The site is delivered by moving pages-stable')
assert.doesNotMatch(delivery, /--force|\s-f\s/, 'pages-stable only moves forward')
for (const [file, workflow] of [['release.yml', releaseWorkflow], ['ci.yml', ciWorkflow]]) {
  assert.doesNotMatch(JSON.stringify(workflow), /CLOUDFLARE_API_TOKEN|CLOUDFLARE_ACCOUNT_ID|wrangler pages deploy/, `${file}: Git delivery must not use Cloudflare credentials or uploads`)
}
assert.equal(JSON.parse(read('package.json')).scripts['build:site:cloudflare-pages'], 'bash scripts/build-site-hosted.sh')
assert.match(read('scripts/build-site-hosted.sh'), /PUBLIC_URL=https:\/\/icons\.master\.co/)

for (const name of ['icons', 'icons-react', 'icons-vue', 'icons-svelte', 'icons-preact', 'icons-astro']) {
  const manifest = JSON.parse(read(`packages/${name}/package.json`))
  assert.equal(manifest.private, undefined, `${manifest.name} must be publishable`)
  assert.deepEqual(manifest.publishConfig, { access: 'public', provenance: true }, `${manifest.name} publishes publicly with provenance`)
  assert.equal(manifest.repository?.url, 'https://github.com/master-co/icons.git', `${manifest.name} provenance names this repository`)
  assert.equal(manifest.repository?.directory, `packages/${name}`)
}

// CI validates on one Node version in parallel jobs; together they must still run every gate.
const ciSteps = Object.values(ciWorkflow.jobs).flatMap(job => job.steps)
const validation = ciSteps.map(step => step.run ?? '').join('\n')
for (const command of ['bun run check:release', 'bun run check:package', 'aronrepo check', 'bun run test:turbo', 'bun run check\n', 'bun run test:frameworks:browser', 'bun run test:browser\n', 'bun run test:site\n', 'git diff --exit-code -- packages/icons/icons']) assert.ok((validation + '\n').includes(command), `CI must run ${command.trim()}`)
// Release gates never skip on a release; only the development checks do.
for (const step of ciSteps) {
  const development = /check:reproducible|test:site:dev|test:site:hmr/.test(step.run ?? '')
  assert.equal(step.if === '${{ !inputs.release }}', development, `${step.run ?? step.uses}: only development checks skip on a release`)
}
for (const [name, job] of Object.entries(ciWorkflow.jobs)) {
  assert.equal(job.strategy, undefined, `${name}: CI validates on a single Node version`)
  assert.ok(job['timeout-minutes'] <= 30, `${name}: a stalled job must not hold a release for an hour`)
}
// A browser job never installs browsers: its container is the Playwright image of the locked version.
const playwright = read('bun.lock').match(/"@playwright\/test@(\d+\.\d+\.\d+)"/)[1]
assert.doesNotMatch(validation, /playwright install/, 'Browser jobs use the Playwright image instead of installing browsers')
for (const [name, job] of Object.entries(ciWorkflow.jobs)) {
  if (!job.steps.some(step => /test:(frameworks:)?browser|test:site/.test(step.run ?? ''))) continue
  assert.equal(job.container?.image, `mcr.microsoft.com/playwright:v${playwright}-noble`, `${name}: the Playwright image must match bun.lock`)
}

process.stdout.write('Validated provenance npm publication and gated pages-stable delivery without Cloudflare credentials.\n')
