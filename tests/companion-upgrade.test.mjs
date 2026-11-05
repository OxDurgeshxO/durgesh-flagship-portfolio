import test from 'node:test'
import assert from 'node:assert/strict'
import { CyberBotSpeechEngine, stripEmojis } from '../lib/companion/speech.ts'

test('stripEmojis removes Unicode emojis and trims whitespace cleanly', () => {
  const input = "🚀 Check out RoleRadar — an enterprise AI platform! 🤖✨"
  const output = stripEmojis(input)
  assert.equal(output, "Check out RoleRadar — an enterprise AI platform!")
  assert.equal(stripEmojis(""), "")
  assert.equal(stripEmojis("   "), "")
})

test('CyberBotSpeechEngine enforces singleton pattern', () => {
  const instance1 = CyberBotSpeechEngine.getInstance()
  const instance2 = CyberBotSpeechEngine.getInstance()
  assert.equal(instance1, instance2)
})

test('CyberBotSpeechEngine safely handles SSR/Node environment without window.speechSynthesis', () => {
  const engine = CyberBotSpeechEngine.getInstance()
  assert.equal(engine.isAvailable(), false)
  assert.equal(engine.isCurrentlySpeaking(), false)

  let ended = false
  // Should gracefully invoke onEnd callback even without browser speech engine
  engine.speak("Hello world", {
    onEnd: () => {
      ended = true
    }
  })
  assert.equal(ended, true)

  // Cancel should not throw
  assert.doesNotThrow(() => engine.cancel())
})

