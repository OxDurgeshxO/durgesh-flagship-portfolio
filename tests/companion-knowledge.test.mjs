import test from 'node:test'
import assert from 'node:assert/strict'
import { searchKnowledge, CYBERBOT_KNOWLEDGE_CORPUS, SECTION_CONTEXT_CHIPS } from '../lib/companion/knowledge.ts'
import { CYBERBOT_SKINS, ALL_SKIN_IDS, getNextSkinId } from '../lib/companion/skins.ts'
import { CyberBotVoiceListener } from '../lib/companion/voice-recognition.ts'

test('Semantic Knowledge Engine: corpus contains all flagship domains', () => {
  assert.equal(CYBERBOT_KNOWLEDGE_CORPUS.length, 18)
  const ids = CYBERBOT_KNOWLEDGE_CORPUS.map((e) => e.id)
  const expectedDomains = [
    'roleradar', 'fitness', 'marketmatch', 'jarvis', 'cnn', 'spaceedu',
    'architecture', 'security', 'accessibility', 'education', 'certifications',
    'github', 'contact', 'stack', 'resume', 'performance', 'audit', 'cyberbot'
  ]
  for (const domain of expectedDomains) {
    assert.ok(ids.includes(domain), `Corpus must contain domain ${domain}`)
  }
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

  const rSpace = searchKnowledge('Planetary Kepler orbital physics simulation')
  assert.ok(rSpace)
  assert.equal(rSpace.id, 'spaceedu')

  const rJarvis = searchKnowledge('Tell me about the Jarvis voice assistant')
  assert.ok(rJarvis)
  assert.equal(rJarvis.id, 'jarvis')

  const rSecurity = searchKnowledge('Content security policy and permissions')
  assert.ok(rSecurity)
  assert.equal(rSecurity.id, 'security')

  const rEmpty = searchKnowledge('')
  assert.equal(rEmpty, null)

  const rGibberish = searchKnowledge('xyzabc1234599999nonexistent')
  assert.equal(rGibberish, null)
})

test('Semantic Knowledge Engine: fuzzy typo tolerance resolves queries with character errors', () => {
  // 1-character typo in roleradar -> rolrader
  const f1 = searchKnowledge('Tell me about rolrader')
  assert.ok(f1, 'Fuzzy match should find roleradar for rolrader')
  assert.equal(f1.id, 'roleradar')

  // Typo in fittrack -> fttrack
  const f2 = searchKnowledge('fttrack pose detection')
  assert.ok(f2, 'Fuzzy match should find fitness for fttrack')
  assert.equal(f2.id, 'fitness')

  // Typo in skills -> skils
  const f3 = searchKnowledge('core skils and tools')
  assert.ok(f3, 'Fuzzy match should find stack for skils')
  assert.equal(f3.id, 'stack')

  // Typo in spaceedu -> spacee
  const f4 = searchKnowledge('spacee 3d simulation')
  assert.ok(f4, 'Fuzzy match should find spaceedu for spacee')
  assert.equal(f4.id, 'spaceedu')
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

test('Contextual Scroll Spy: all key sections provide valid suggestion chips', () => {
  const requiredSections = [
    'hero', 'about', 'experience', 'projects', 'featured-projects',
    'github-projects', 'education', 'lab', 'contact'
  ]
  for (const sec of requiredSections) {
    const chips = SECTION_CONTEXT_CHIPS[sec]
    assert.ok(chips, `Section ${sec} must have defined contextual chips`)
    assert.ok(chips.length >= 2, `Section ${sec} must provide at least 2 contextual chips`)
    for (const chip of chips) {
      assert.ok(typeof chip === 'string' && chip.trim().length > 3)
    }
  }
})


