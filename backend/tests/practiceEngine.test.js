const test = require('node:test');
const assert = require('node:assert/strict');

const { buildPracticeSession, canPublishResource } = require('../services/practiceEngine');
const bank = Array.from({length: 12}, (_, i) => ({
  id: String(i), bank: 'practice', status: 'approved', grade: '5',
  subject: 'Maths', language: 'en', topic: 'fractions', difficulty: 'easy',
  prompt: 'Test fixture ' + i, explanation: 'Fixture explanation',
  options: [{id: 'a', text: 'A'}, {id: 'b', text: 'B'}],
  correctOptionId: 'b', shuffleOptions: true
}));
const config = {grade: '5', subject: 'Maths', language: 'en',
  blueprint: [{topic: 'fractions', difficulty: 'easy', count: 5}]};
test('selects unique questions and strips all answer metadata', () => {
  const result = buildPracticeSession(bank, config);
  assert.equal(new Set(result.questions.map(q => q.id)).size, 5);
  for (const q of result.questions) {
    assert.equal(q.correctOptionId, undefined);
    assert.equal(q.explanation, undefined);
    assert.equal(result.answerKey.find(a => a.id === q.id).correctOptionId, 'b');
  }
});
test('excludes official exam and unapproved questions', () => {
  assert.throws(() => buildPracticeSession(bank.map(q => ({...q, bank: 'exam'})), config));
  assert.throws(() => buildPracticeSession(bank.map(q => ({...q, status: 'draft'})), config));
});
test('prefers unseen questions and reports unavoidable repeats', () => {
  const recentIds = bank.slice(0, 7).map(q => q.id);
  assert.equal(buildPracticeSession(bank, {...config, recentIds}).repeatedCount, 0);
  assert.equal(buildPracticeSession(bank, {...config, recentIds: bank.map(q => q.id)}).repeatedCount, 5);
});
test('rejects insufficient pools, duplicates and invalid blueprint', () => {
  assert.throws(() => buildPracticeSession(bank.slice(0, 2), config));
  assert.throws(() => buildPracticeSession([...bank, bank[0]], config));
  assert.throws(() => buildPracticeSession(bank, {...config, blueprint: [...config.blueprint, ...config.blueprint]}));
  assert.throws(() => buildPracticeSession(bank, {...config, blueprint: [{topic:'fractions',difficulty:'easy',count:101}]}));
});
test('filters class, subject and language', () => {
  for (const key of ['grade', 'subject', 'language']) {
    assert.throws(() => buildPracticeSession(bank, {...config, [key]: 'other'}));
  }
});
test('preserves order for options that must not be shuffled', () => {
  const result = buildPracticeSession(bank.map(q => ({...q, shuffleOptions:false})), config);
  for (const q of result.questions) assert.deepEqual(q.options.map(o => o.id), ['a','b']);
});
const resource = {status:'approved', delivery:'embed', rights:{
  basis:'CC-BY', reviewedBy:'reviewer', reviewedAt:'2026-10-20',
  evidenceUrl:'https://example.org/license', attribution:'Test creator',
  commercialUseAllowed:true, allowedDelivery:['embed']
}};
test('requires reviewed commercial permission and delivery rights', () => {
  assert.equal(canPublishResource(resource), true);
  assert.equal(canPublishResource({...resource, delivery:'host'}), false);
  assert.equal(canPublishResource({...resource, rights:{...resource.rights, commercialUseAllowed:false}}), false);
  assert.equal(canPublishResource({...resource, rights:{...resource.rights, basis:'CC-BY-NC'}}), false);
  assert.equal(canPublishResource({...resource, rights:{...resource.rights, evidenceUrl:''}}), false);
  assert.equal(canPublishResource(null), false);
});
test('requires share-alike review where applicable', () => {
  assert.equal(canPublishResource({...resource, rights:{...resource.rights, basis:'CC-BY-SA'}}), false);
  assert.equal(canPublishResource({...resource, rights:{...resource.rights, basis:'CC-BY-SA',shareAlikeSatisfied:true}}), true);
});
