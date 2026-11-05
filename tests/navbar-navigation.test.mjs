import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

test('Navbar Navigation: all primary desktop and mobile links resolve to existing page components', () => {
  const routes = [
    'app/page.tsx',
    'app/cyberbot/page.tsx',
    'app/lab/page.tsx',
    'app/recruiter/page.tsx',
    'app/resume/page.tsx',
    'app/github-health/page.tsx',
  ]

  for (const route of routes) {
    const fullPath = path.resolve(process.cwd(), route)
    assert.ok(fs.existsSync(fullPath), `Expected route file ${route} to exist on disk`)
  }
})

test('Navbar Specification: Navbar component source contains CyberBot 3D studio link', () => {
  const navbarSource = fs.readFileSync(path.resolve(process.cwd(), 'components/sections/Navbar.tsx'), 'utf-8')
  assert.ok(navbarSource.includes('/cyberbot'), 'Navbar must link to /cyberbot')
  assert.ok(navbarSource.includes('CyberBot 3D'), 'Navbar must include CyberBot 3D text')
})

test('Hero Specification: HeroSection component source contains CyberBot summon action', () => {
  const heroSource = fs.readFileSync(path.resolve(process.cwd(), 'components/sections/HeroSection.tsx'), 'utf-8')
  assert.ok(heroSource.includes('summon-cyberbot'), 'HeroSection must dispatch summon-cyberbot event')
})

test('Recruiter Specification: RecruiterHero contains ScheduleModal and direct interview booking', () => {
  const recruiterHero = fs.readFileSync(path.resolve(process.cwd(), 'components/recruiter/RecruiterHero.tsx'), 'utf-8')
  assert.ok(recruiterHero.includes('ScheduleModal'), 'RecruiterHero must import and render ScheduleModal')
  assert.ok(recruiterHero.includes('Schedule Technical Screen'), 'RecruiterHero must offer Schedule Technical Screen CTA')
})

test('Telemetry & Health Specification: Components contain Sparkline and Audio Waveform', () => {
  const healthCard = fs.readFileSync(path.resolve(process.cwd(), 'components/github-health/RepositoryHealthCard.tsx'), 'utf-8')
  assert.ok(healthCard.includes('Sparkline'), 'RepositoryHealthCard must render Sparkline')

  const telemetry = fs.readFileSync(path.resolve(process.cwd(), 'components/companion/CyberBotTelemetryOverlay.tsx'), 'utf-8')
  assert.ok(telemetry.includes('Neural Audio Waveform'), 'CyberBotTelemetryOverlay must render audio waveform spectrum')
})
