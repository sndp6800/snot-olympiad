'use strict';
const { randomInt } = require('node:crypto');

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function validQuestion(q) {
  return q && typeof q.id === 'string' && q.id.length > 0 &&
    q.bank === 'practice' && q.status === 'approved' &&
    typeof q.prompt === 'string' && q.prompt.trim().length > 0 &&
    typeof q.explanation === 'string' &&
    Array.isArray(q.options) && q.options.length >= 2 &&
    q.options.every(o => o && typeof o.id === 'string' && typeof o.text === 'string') &&
    new Set(q.options.map(o => o.id)).size === q.options.length &&
    q.options.some(o => o.id === q.correctOptionId);
}

// Server-only. Never serialize the private answerKey in a session-start response.
// Caller must verify identity, enrollment, entitlement and persist session ownership.
function buildPracticeSession(bank, config) {
  const { grade, subject, language, blueprint, recentIds = [] } = config;
  if (!Array.isArray(bank) || !Array.isArray(blueprint) || !blueprint.length ||
      typeof grade !== 'string' || typeof subject !== 'string' ||
      typeof language !== 'string' || !Array.isArray(recentIds)) {
    throw new Error('Invalid practice configuration');
  }
  const seenBuckets = new Set();
  let total = 0;
  for (const bucket of blueprint) {
    const key = JSON.stringify([bucket.topic, bucket.difficulty]);
    if (typeof bucket.topic !== 'string' || !bucket.topic ||
        !['easy', 'medium', 'hard'].includes(bucket.difficulty) ||
        !Number.isInteger(bucket.count) || bucket.count < 1 || seenBuckets.has(key)) {
      throw new Error('Invalid or duplicate blueprint bucket');
    }
    seenBuckets.add(key);
    total += bucket.count;
  }
  if (total > 100) throw new Error('Session cannot exceed 100 questions');
  const candidates = bank.filter(q => validQuestion(q) && q.grade === grade &&
    q.subject === subject && q.language === language);
  if (new Set(candidates.map(q => q.id)).size !== candidates.length) {
    throw new Error('Duplicate question IDs');
  }
  const recent = new Set(recentIds);
  const chosen = [];
  for (const bucket of blueprint) {
    const pool = candidates.filter(q => q.topic === bucket.topic &&
      q.difficulty === bucket.difficulty);
    if (pool.length < bucket.count) throw new Error('Insufficient approved practice questions');
    chosen.push(...[
      ...shuffle(pool.filter(q => !recent.has(q.id))),
      ...shuffle(pool.filter(q => recent.has(q.id)))
    ].slice(0, bucket.count));
  }
  const ordered = shuffle(chosen);
  return {
    questions: ordered.map(q => ({
      id: q.id, prompt: q.prompt, topic: q.topic, difficulty: q.difficulty,
      options: (q.shuffleOptions === true ? shuffle(q.options) : q.options)
        .map(o => ({ id: o.id, text: o.text }))
    })),
    answerKey: ordered.map(q => ({
      id: q.id, correctOptionId: q.correctOptionId, explanation: q.explanation
    })),
    repeatedCount: chosen.filter(q => recent.has(q.id)).length
  };
}

// Review is mandatory even for an open license. Store evidence for this exact asset.
// This gate does not replace rights review and does not validate external URLs.
function canPublishResource(resource) {
  const r = resource && resource.rights;
  return Boolean(resource && resource.status === 'approved' && r &&
    r.reviewedBy && r.reviewedAt && r.evidenceUrl && r.attribution &&
    r.commercialUseAllowed === true &&
    ['original', 'permission', 'CC0', 'CC-BY', 'CC-BY-SA'].includes(r.basis) &&
    ['link', 'embed', 'host'].includes(resource.delivery) &&
    Array.isArray(r.allowedDelivery) && r.allowedDelivery.includes(resource.delivery) &&
    (r.basis !== 'CC-BY-SA' || r.shareAlikeSatisfied === true));
}
module.exports = { buildPracticeSession, canPublishResource };
