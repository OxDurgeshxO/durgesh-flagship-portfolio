import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const PROJECT_ROOT = process.cwd()

test('M4 Empirical: SpaceEdu Route & Embedded Simulation Integrity', async (t) => {
  const pagePath = path.join(PROJECT_ROOT, 'app/spaceedu/page.tsx')
  assert.ok(fs.existsSync(pagePath), 'app/spaceedu/page.tsx must exist')
  const pageSrc = fs.readFileSync(pagePath, 'utf8')

  await t.test('Page is declared as client component', () => {
    assert.match(pageSrc, /^["']use client["'];?/, 'Must have "use client" directive')
  })

  await t.test('Iframe embeds /spaceedu.html with necessary permissions and title', () => {
    assert.match(pageSrc, /<iframe[\s\S]*?src=["']\/spaceedu\.html["']/, 'Iframe must target /spaceedu.html')
    assert.match(pageSrc, /title=["'][^"']*SpaceEdu[^"']*["']/, 'Iframe must have accessible title attribute')
    assert.match(pageSrc, /allow=["'][^"']*fullscreen[^"']*["']/, 'Iframe must allow fullscreen')
    assert.match(pageSrc, /allow=["'][^"']*accelerometer[^"']*["']/, 'Iframe must allow accelerometer')
    assert.match(pageSrc, /allow=["'][^"']*gyroscope[^"']*["']/, 'Iframe must allow gyroscope')
  })

  await t.test('Provides loading spinner and state handler', () => {
    assert.match(pageSrc, /useState\(true\)/, 'Must initialize isLoading state')
    assert.match(pageSrc, /onLoad=\{[\s\S]*?setIsLoading\(false\)/, 'Must remove loading overlay on iframe onLoad')
  })

  await t.test('Provides accessible fallback inside iframe markup', () => {
    assert.match(pageSrc, /does not support inline frames/i, 'Must provide text for non-iframe clients')
    assert.match(pageSrc, /href=["']\/spaceedu\.html["']/, 'Fallback must provide direct link')
  })

  await t.test('Provides navigation controls: back to portfolio and standalone window', () => {
    assert.match(pageSrc, /<Link[\s\S]*?href=["']\/["'][\s\S]*?aria-label=["'][^"']*portfolio[^"']*["']/i, 'Must have accessible Link back to /')
    assert.match(pageSrc, /<a[\s\S]*?href=["']\/spaceedu\.html["'][\s\S]*?target=["']_blank["'][\s\S]*?rel=["']noopener noreferrer["']/, 'Must have secure standalone link with target="_blank" and rel="noopener noreferrer"')
  })

  await t.test('Target public/spaceedu.html exists and is valid WebGL simulation', () => {
    const publicHtml = path.join(PROJECT_ROOT, 'public/spaceedu.html')
    assert.ok(fs.existsSync(publicHtml), 'public/spaceedu.html must exist')
    const stats = fs.statSync(publicHtml)
    assert.ok(stats.size > 10000, `spaceedu.html should be complete (>10KB), actual: ${stats.size} bytes`)
    const htmlContent = fs.readFileSync(publicHtml, 'utf8')
    assert.match(htmlContent, /<!DOCTYPE html>/i, 'Must be valid HTML5 document')
    assert.match(htmlContent, /<title>[\s\S]*?SpaceEdu/i, 'Must contain SpaceEdu title')
  })

  await t.test('Static export artifacts exist in out directory', () => {
    const outSpaceEdu = path.join(PROJECT_ROOT, 'out/spaceedu/index.html')
    const outRawHtml = path.join(PROJECT_ROOT, 'out/spaceedu.html')
    assert.ok(fs.existsSync(outSpaceEdu), 'out/spaceedu/index.html must exist after next build')
    assert.ok(fs.existsSync(outRawHtml), 'out/spaceedu.html must exist in export')
  })

  await t.test('Global entry points link to /spaceedu', () => {
    const footerSrc = fs.readFileSync(path.join(PROJECT_ROOT, 'components/sections/Footer.tsx'), 'utf8')
    assert.match(footerSrc, /href=["']\/spaceedu["']/, 'Footer must link to /spaceedu')

    const cmdPaletteSrc = fs.readFileSync(path.join(PROJECT_ROOT, 'components/CommandPalette.tsx'), 'utf8')
    assert.match(cmdPaletteSrc, /router\.push\(["']\/spaceedu["']\)/, 'CommandPalette must include /spaceedu action')
  })
})

test('M4 Empirical: UNLOX® Trademark & UTF-8 Encoding Verification', async (t) => {
  const aboutPath = path.join(PROJECT_ROOT, 'components/sections/AboutSection.tsx')
  const aboutSrc = fs.readFileSync(aboutPath, 'utf8')

  await t.test('AboutSection.tsx contains exact UNLOX® string', () => {
    assert.match(aboutSrc, /AI Program Fellow at UNLOX® and Be10x/, 'AboutSection bio must contain UNLOX®')
  })

  await t.test('UNLOX® is correctly UTF-8 encoded with byte sequence 554e4c4f58c2ae', () => {
    const match = aboutSrc.match(/UNLOX[^\s.,;)]+/)
    assert.ok(match, 'Must find UNLOX string match')
    assert.equal(match[0], 'UNLOX®', 'Match must strictly equal UNLOX®')

    const buf = Buffer.from(match[0], 'utf8')
    assert.equal(buf.toString('hex'), '554e4c4f58c2ae', 'Hex representation must be 554e4c4f58c2ae (U+00AE)')

    const codePoints = [...match[0]].map(c => c.codePointAt(0))
    assert.deepEqual(codePoints, [0x55, 0x4E, 0x4C, 0x4F, 0x58, 0x00AE], 'Unicode code points must end with U+00AE')
  })

  await t.test('Zero occurrences of typo UNLOXr in source files', () => {
    const checkDirs = ['app', 'components', 'lib', 'public']
    const foundBadFiles = []

    function scanDir(dir) {
      const fullDir = path.join(PROJECT_ROOT, dir)
      if (!fs.existsSync(fullDir)) return
      const entries = fs.readdirSync(fullDir, { withFileTypes: true })
      for (const entry of entries) {
        const fullPath = path.join(fullDir, entry.name)
        if (entry.isDirectory()) {
          scanDir(path.join(dir, entry.name))
        } else if (/\.(tsx|ts|jsx|js|json|html)$/.test(entry.name)) {
          const content = fs.readFileSync(fullPath, 'utf8')
          if (content.includes('UNLOXr')) {
            foundBadFiles.push(fullPath)
          }
        }
      }
    }

    for (const d of checkDirs) {
      scanDir(d)
    }

    assert.equal(foundBadFiles.length, 0, `Found UNLOXr typo in source files: ${foundBadFiles.join(', ')}`)
  })

  await t.test('Zero mojibake or corrupt encodings in AboutSection.tsx', () => {
    const badEncodings = ['UNLOXÂ®', 'UNLOX&reg;', 'UNLOX?', 'UNLOX\uFFFD']
    for (const bad of badEncodings) {
      assert.ok(!aboutSrc.includes(bad), `AboutSection must not contain mojibake: ${bad}`)
    }
  })

  await t.test('Rendered out/index.html contains UNLOX®', () => {
    const indexPath = path.join(PROJECT_ROOT, 'out/index.html')
    assert.ok(fs.existsSync(indexPath), 'out/index.html must exist')
    const indexHtml = fs.readFileSync(indexPath, 'utf8')
    assert.ok(indexHtml.includes('UNLOX®'), 'Rendered index.html must contain UNLOX®')
  })
})

test('M4 Empirical: CyberBot Tour Landmark Step Alignment', async (t) => {
  const companionPath = path.join(PROJECT_ROOT, 'components/companion/RoamingCompanion3D.tsx')
  const companionSrc = fs.readFileSync(companionPath, 'utf8')

  await t.test('TOUR_LANDMARKS Step 3 points to github-projects', () => {
    const tourMatch = companionSrc.match(/const TOUR_LANDMARKS = \[([\s\S]*?)\]/)
    assert.ok(tourMatch, 'Must find TOUR_LANDMARKS declaration')
    const tourBlock = tourMatch[1]

    assert.match(tourBlock, /id:\s*['"]github-projects['"][\s\S]*?title:\s*['"]Engineering Catalog['"]/, 'Tour step 3 must target id github-projects')
    assert.doesNotMatch(tourBlock, /id:\s*['"]projects['"][\s\S]*?title:\s*['"]Engineering Catalog['"]/, 'Tour step 3 must NOT target id projects')
  })

  await t.test('ProjectsSection.tsx declares <section id="github-projects">', () => {
    const projectsPath = path.join(PROJECT_ROOT, 'components/sections/ProjectsSection.tsx')
    const projectsSrc = fs.readFileSync(projectsPath, 'utf8')
    assert.match(projectsSrc, /<section[\s\S]*?id=["']github-projects["']/, 'ProjectsSection must declare id="github-projects"')
  })

  await t.test('FeaturedProjectsSection.tsx declares id="featured-projects" and id="projects"', () => {
    const featuredPath = path.join(PROJECT_ROOT, 'components/sections/FeaturedProjectsSection.tsx')
    const featuredSrc = fs.readFileSync(featuredPath, 'utf8')
    assert.match(featuredSrc, /id=["']projects["']/, 'FeaturedProjectsSection must declare id="projects"')
    assert.match(featuredSrc, /id=["']featured-projects["']/, 'FeaturedProjectsSection must declare id="featured-projects"')
  })

  await t.test('All TOUR_LANDMARKS target elements exist in rendered out/index.html', () => {
    const indexHtmlPath = path.join(PROJECT_ROOT, 'out/index.html')
    assert.ok(fs.existsSync(indexHtmlPath), 'out/index.html must exist')
    const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8')

    const expectedLandmarks = [
      'hero',
      'featured-projects',
      'github-projects',
      'experience',
      'contact'
    ]

    for (const landmarkId of expectedLandmarks) {
      const idPattern = new RegExp(`id=["']${landmarkId}["']`)
      assert.ok(idPattern.test(indexHtml), `Rendered index.html must contain DOM element with id="${landmarkId}"`)
    }
  })

  await t.test('RoamingCompanion3D scroll spy includes github-projects', () => {
    assert.match(companionSrc, /id:\s*['"]github-projects['"][\s\S]*?msg:\s*['"][^'"]*GitHub sync/i, 'Scroll spy must include github-projects')
  })
})
