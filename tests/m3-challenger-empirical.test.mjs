import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

// Mock DOM environment for state synchronization empirical testing
class MockLocalStorage {
  constructor() {
    this.store = new Map()
    this.throwOnSet = false
    this.throwOnGet = false
  }
  getItem(key) {
    if (this.throwOnGet) throw new Error('SecurityError: Access denied')
    return this.store.has(key) ? this.store.get(key) : null
  }
  setItem(key, val) {
    if (this.throwOnSet) throw new Error('QuotaExceededError')
    this.store.set(key, String(val))
  }
  removeItem(key) {
    this.store.delete(key)
  }
  clear() {
    this.store.clear()
  }
}

class MockEventTarget {
  constructor() {
    this.listeners = new Map()
  }
  addEventListener(type, cb) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set())
    }
    this.listeners.get(type).add(cb)
  }
  removeEventListener(type, cb) {
    if (this.listeners.has(type)) {
      this.listeners.get(type).delete(cb)
    }
  }
  dispatchEvent(event) {
    const handlers = this.listeners.get(event.type)
    if (handlers) {
      for (const handler of handlers) {
        handler(event)
      }
    }
    return true
  }
}

class MockCustomEvent {
  constructor(type, init = {}) {
    this.type = type
    this.detail = init.detail
  }
}

test('State Synchronization: savePerformanceMode dual storage key and dual event dispatch', async () => {
  const mockStorage = new MockLocalStorage()
  const mockWindow = new MockEventTarget()
  mockWindow.localStorage = mockStorage
  mockWindow.innerWidth = 1024

  // Setup global environment
  globalThis.window = mockWindow
  globalThis.localStorage = mockStorage
  globalThis.CustomEvent = MockCustomEvent

  const { savePerformanceMode, getSavedPerformanceMode } = await import('../lib/performance.ts')

  let perfEventFired = false
  let perfEventDetail = null
  let expEventFired = false
  let expEventDetail = null

  mockWindow.addEventListener('performance-mode-change', (e) => {
    perfEventFired = true
    perfEventDetail = e.detail
  })

  mockWindow.addEventListener('experience-mode-change', (e) => {
    expEventFired = true
    expEventDetail = e.detail
  })

  // Test 1: Save 'balanced'
  savePerformanceMode('balanced')
  assert.equal(mockStorage.getItem('portfolio_performance_mode'), 'balanced', 'Primary key must be updated')
  assert.equal(mockStorage.getItem('portfolio-experience-mode'), 'balanced', 'Experience key must be synchronized')
  assert.equal(perfEventFired, true, 'performance-mode-change event must fire')
  assert.equal(perfEventDetail, 'balanced', 'Event detail must match saved mode')
  assert.equal(expEventFired, true, 'experience-mode-change event must fire')
  assert.equal(expEventDetail, 'balanced', 'Experience event detail must match saved mode')

  // Test 2: Save 'low-bandwidth'
  savePerformanceMode('low-bandwidth')
  assert.equal(mockStorage.getItem('portfolio_performance_mode'), 'low-bandwidth')
  assert.equal(mockStorage.getItem('portfolio-experience-mode'), 'low-bandwidth')
  assert.equal(perfEventDetail, 'low-bandwidth')
  assert.equal(expEventDetail, 'low-bandwidth')

  // Test 3: Save 'immersive'
  savePerformanceMode('immersive')
  assert.equal(mockStorage.getItem('portfolio_performance_mode'), 'immersive')
  assert.equal(mockStorage.getItem('portfolio-experience-mode'), 'immersive')
  assert.equal(perfEventDetail, 'immersive')
  assert.equal(expEventDetail, 'immersive')
})

test('State Synchronization: getSavedPerformanceMode fallback resolution', async () => {
  const mockStorage = new MockLocalStorage()
  const mockWindow = new MockEventTarget()
  mockWindow.localStorage = mockStorage
  mockWindow.innerWidth = 1024

  globalThis.window = mockWindow
  globalThis.localStorage = mockStorage
  globalThis.CustomEvent = MockCustomEvent

  const { getSavedPerformanceMode } = await import('../lib/performance.ts')

  // Case A: Only portfolio_performance_mode is set
  mockStorage.clear()
  mockStorage.setItem('portfolio_performance_mode', 'balanced')
  assert.equal(getSavedPerformanceMode(), 'balanced', 'Should read primary key when experience key absent')

  // Case B: Only portfolio-experience-mode is set (legacy or accessibility panel write)
  mockStorage.clear()
  mockStorage.setItem('portfolio-experience-mode', 'low-bandwidth')
  assert.equal(getSavedPerformanceMode(), 'low-bandwidth', 'Should fall back to experience key when primary absent')

  // Case C: Neither set, desktop width >= 768
  mockStorage.clear()
  mockWindow.innerWidth = 1024
  assert.equal(getSavedPerformanceMode(), 'immersive', 'Default for desktop width is immersive')

  // Case D: Neither set, mobile width < 768
  mockStorage.clear()
  mockWindow.innerWidth = 375
  assert.equal(getSavedPerformanceMode(), 'balanced', 'Default for mobile width is balanced')

  // Case E: Corrupted or unrecognized storage value
  mockStorage.clear()
  mockStorage.setItem('portfolio_performance_mode', 'turbo-speed-mode')
  mockWindow.innerWidth = 1024
  assert.equal(getSavedPerformanceMode(), 'immersive', 'Corrupted key falls back to default')
})

test('State Synchronization: Resilience under storage quota or permission exceptions', async () => {
  const mockStorage = new MockLocalStorage()
  const mockWindow = new MockEventTarget()
  mockWindow.localStorage = mockStorage
  mockWindow.innerWidth = 1024

  globalThis.window = mockWindow
  globalThis.localStorage = mockStorage
  globalThis.CustomEvent = MockCustomEvent

  const { savePerformanceMode, getSavedPerformanceMode } = await import('../lib/performance.ts')

  // Quota exception on save
  mockStorage.throwOnSet = true
  assert.doesNotThrow(() => {
    savePerformanceMode('balanced')
  }, 'savePerformanceMode must handle quota exceptions without throwing')
  mockStorage.throwOnSet = false

  // Security exception on read
  mockStorage.throwOnGet = true
  assert.doesNotThrow(() => {
    const mode = getSavedPerformanceMode()
    assert.equal(mode, 'immersive', 'Should return safe fallback on storage exception')
  }, 'getSavedPerformanceMode must handle storage read exceptions gracefully')
  mockStorage.throwOnGet = false
})

test('State Synchronization: Cross-module interop with lib/experience-mode.ts', async () => {
  const mockStorage = new MockLocalStorage()
  const mockWindow = new MockEventTarget()
  mockWindow.localStorage = mockStorage
  mockWindow.innerWidth = 1024
  mockWindow.matchMedia = () => ({ matches: false })

  globalThis.window = mockWindow
  globalThis.localStorage = mockStorage
  globalThis.CustomEvent = MockCustomEvent

  const { savePerformanceMode, getSavedPerformanceMode } = await import('../lib/performance.ts')
  const { saveExperienceMode, getSavedExperienceMode } = await import('../lib/experience-mode.ts')

  // 1. AccessibilityPanel writes via saveExperienceMode -> getSavedPerformanceMode reads it
  mockStorage.clear()
  saveExperienceMode('low-bandwidth')
  assert.equal(getSavedPerformanceMode(), 'low-bandwidth', 'performance.ts must read mode saved by experience-mode.ts')
  assert.equal(getSavedExperienceMode(), 'low-bandwidth')

  // 2. HeroSection / Toggle writes via savePerformanceMode -> getSavedExperienceMode reads it
  savePerformanceMode('balanced')
  assert.equal(getSavedExperienceMode(), 'balanced', 'experience-mode.ts must read mode saved by performance.ts')
  assert.equal(getSavedPerformanceMode(), 'balanced')
})

test('CyberBotStudioShell: StudioWebGLErrorBoundary implementation and error recovery contract', () => {
  const shellPath = path.resolve('components/companion/CyberBotStudioShell.tsx')
  const content = fs.readFileSync(shellPath, 'utf8')

  // 1. Verify Error Boundary exists with proper React lifecycle methods
  assert.ok(content.includes('class StudioWebGLErrorBoundary extends React.Component'), 'Class StudioWebGLErrorBoundary must exist')
  assert.ok(content.includes('static getDerivedStateFromError()'), 'getDerivedStateFromError must be implemented')
  assert.ok(content.includes('componentDidCatch(err: any)'), 'componentDidCatch must log or capture error')
  assert.ok(content.includes('hasError: true'), 'State must transition to hasError: true')

  // 2. Verify fallback view renders accessible recovery UI
  assert.ok(content.includes('WebGL Acceleration Unavailable'), 'Fallback title must be present')
  assert.ok(content.includes('3D hardware acceleration encountered a fault'), 'Fallback descriptive text must be present')
  assert.ok(content.includes('Reload 3D Engine'), 'Actionable reload button must be present')
  assert.ok(content.includes('this.setState({ hasError: false })'), 'Reload button must reset error state')

  // 3. Verify Canvas is wrapped in StudioWebGLErrorBoundary
  assert.ok(content.includes('<StudioWebGLErrorBoundary>\n            <Canvas') ||
            content.includes('<StudioWebGLErrorBoundary><Canvas') ||
            content.includes('<StudioWebGLErrorBoundary>\n              <Canvas') ||
            content.match(/<StudioWebGLErrorBoundary>[\s\S]*?<Canvas/),
            'Canvas element must be wrapped in StudioWebGLErrorBoundary')
})

test('Security & Reliability: Permissions-Policy and Link Security Hygiene', () => {
  // 1. Permissions-Policy in public/_headers
  const headersPath = path.resolve('public/_headers')
  const headers = fs.readFileSync(headersPath, 'utf8')
  assert.ok(headers.includes('microphone=(self)'), 'Permissions-Policy must allow self-origin microphone access')
  assert.ok(!headers.includes('microphone=()'), 'Permissions-Policy must not globally disable microphone')

  // 2. QuickDial resume download rel="noopener noreferrer"
  const quickDialPath = path.resolve('components/companion/CyberBotQuickDial.tsx')
  const qdContent = fs.readFileSync(quickDialPath, 'utf8')
  assert.ok(qdContent.includes("link.rel = 'noopener noreferrer'"), 'CyberBotQuickDial must specify rel="noopener noreferrer" on download anchor')

  // 3. RoamingCompanion3D resume download rel="noopener noreferrer"
  const roamingPath = path.resolve('components/companion/RoamingCompanion3D.tsx')
  const rcContent = fs.readFileSync(roamingPath, 'utf8')
  assert.ok(rcContent.includes("link.rel = 'noopener noreferrer'"), 'RoamingCompanion3D must specify rel="noopener noreferrer" on download anchor')

  // 4. FitTrackDemo unhandled play rejection catch
  const fitTrackPath = path.resolve('components/lab/FitTrackDemo.tsx')
  const ftContent = fs.readFileSync(fitTrackPath, 'utf8')
  assert.ok(ftContent.includes('videoRef.current.play().catch('), 'FitTrackDemo must catch autoplay promise rejections')

  // 5. MarketMatchDemo res.ok verification
  const mmPath = path.resolve('components/lab/MarketMatchDemo.tsx')
  const mmContent = fs.readFileSync(mmPath, 'utf8')
  assert.ok(mmContent.includes('if (!res.ok)'), 'MarketMatchDemo must validate HTTP response status')
})
