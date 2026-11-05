import test from 'node:test'
import assert from 'node:assert/strict'
import { stripEmojis } from '../lib/companion/speech.ts'
import { CYBERBOT_SKINS, ALL_SKIN_IDS } from '../lib/companion/skins.ts'
import { SUGGESTED_QUESTION_CHIPS } from '../lib/companion/knowledge.ts'

test('Companion Accessibility: stripEmojis cleans text for screen-readers and Web Speech', () => {
  const input = '🚀 Check out RoleRadar — an enterprise AI career intelligence platform! 🏋️'
  const cleaned = stripEmojis(input)
  assert.equal(cleaned.includes('🚀'), false)
  assert.equal(cleaned.includes('🏋️'), false)
  assert.ok(cleaned.startsWith('Check out RoleRadar'))
})

test('Companion Accessibility: all suggested chips have meaningful content and no dead whitespace', () => {
  assert.ok(SUGGESTED_QUESTION_CHIPS.length >= 3)
  for (const chip of SUGGESTED_QUESTION_CHIPS) {
    assert.ok(chip.trim().length > 3)
    const stripped = stripEmojis(chip)
    assert.ok(stripped.length > 0)
  }
})

test('Companion Accessibility: all skin palettes define high-contrast badge text classes', () => {
  for (const skinId of ALL_SKIN_IDS) {
    const skin = CYBERBOT_SKINS[skinId]
    assert.ok(skin.badgeBg, `Skin ${skinId} must have badgeBg`)
    assert.ok(skin.badgeText, `Skin ${skinId} must have badgeText`)
    assert.ok(skin.accentBorder, `Skin ${skinId} must have accentBorder`)
  }
})

