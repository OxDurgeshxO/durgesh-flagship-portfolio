import test from 'node:test'
import assert from 'node:assert/strict'
import { searchKnowledge, CYBERBOT_KNOWLEDGE_CORPUS } from '../lib/companion/knowledge.ts'
import { CYBERBOT_SKINS, ALL_SKIN_IDS, getNextSkinId } from '../lib/companion/skins.ts'
import { CyberBotVoiceListener } from '../lib/companion/voice-recognition.ts'

test('Semantic Knowledge Engine: corpus contains all flagship domains', () => {
  assert.ok(CYBERBOT_KNOWLEDGE_CORPUS.length >= 6)
  const ids = CYBERBOT_KNOWLEDGE_CORPUS.map((e) => e.id)
  assert.ok(ids.includes('roleradar'))
  assert.ok(ids.includes('fitness'))
  assert.ok(ids.includes('marketmatch'))
  assert.ok(ids.includes('education'))
  assert.ok(ids.includes('certifications'))
  assert.ok(ids.includes('contact'))
})

test('Semantic Knowledge Engine: queries resolve to correct entries', () => {
  const r1 = searchKnowledge('Tell me about RoleRadar')
  assert.ok(r1)
  assert.equal(r1.id, 'roleradar')
  assert.ok(r1.actionUrl)

  const r2 = searchKnowledge('MediaPipe pose workout detection')
  assert.ok(r2)
  assert.equal(r2.id, 'fitness')

  const r3 = searchKnowledge('What university did he study MCA at?')
  assert.ok(r3)
  assert.equal(r3.id, 'education')

  const r4 = searchKnowledge('How can I contact or hire Durgesh?')
  assert.ok(r4)
  assert.equal(r4.id, 'contact')

  const rEmpty = searchKnowledge('')
  assert.equal(rEmpty, null)

  const rGibberish = searchKnowledge('xyzabc1234599999nonexistent')
  assert.equal(rGibberish, null)
})

test('Chassis Skin Palettes: all 4 skins are configured with valid color values', () => {
  assert.equal(ALL_SKIN_IDS.length, 4)
  for (const id of ALL_SKIN_IDS) {
    const skin = CYBERBOT_SKINS[id]
    assert.ok(skin, `Skin ${id} must exist in registry`)
    assert.match(skin.bodyColor, /^#[0-9a-fA-F]{6}$/)
    assert.match(skin.reactorColor, /^#[0-9a-fA-F]{6}$/)
    assert.match(skin.antennaColor, /^#[0-9a-fA-F]{6}$/)
    assert.ok(skin.bodyRoughness >= 0 && skin.bodyRoughness <= 1)
    assert.ok(skin.bodyMetalness >= 0 && skin.bodyMetalness <= 1)
  }

  // Next skin cycling
  assert.equal(getNextSkinId('cobalt-prime'), 'cyber-neon')
  assert.equal(getNextSkinId('matrix-hologram'), 'cobalt-prime')
})

test('Voice Command Listener: accurately classifies speech transcripts', () => {
  const listener = CyberBotVoiceListener.getInstance()
  const results = []
  
  listener.listen((res) => {
    results.push(res)
  })

  listener.handleTranscript('please do a flip trick')
  assert.equal(results[results.length - 1].action, 'flip')

  listener.handleTranscript('show me your portfolio projects')
  assert.equal(results[results.length - 1].action, 'projects')

  listener.handleTranscript('give me the guided tour')
  assert.equal(results[results.length - 1].action, 'tour')

  listener.handleTranscript('download resume pdf')
  assert.equal(results[results.length - 1].action, 'resume')

  listener.handleTranscript('send an email to contact')
  assert.equal(results[results.length - 1].action, 'contact')

  listener.handleTranscript('dance to the beat')
  assert.equal(results[results.length - 1].action, 'dance')

  listener.handleTranscript('switch skin theme')
  assert.equal(results[results.length - 1].action, 'skin')

  listener.handleTranscript('what is roleradar?')
  assert.equal(results[results.length - 1].action, 'query')
})

