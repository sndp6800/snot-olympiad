'use strict';

// Pure server-side grading. All session fields must come from trusted storage.
// Route integration MUST authenticate the actor, check current entitlement and
// atomically transition active -> submitted before returning this result.
// This function alone does not provide persistence, locking or authorization middleware.
function gradePracticeSubmission(session, actorId, answers, now = Date.now()) {
  const fail = message => { throw new Error(message); };
  if (!session || session.kind !== 'practice' ||
      typeof actorId !== 'string' || !actorId ||
      typeof session.ownerId !== 'string' || session.ownerId !== actorId) {
    fail('Practice session unavailable');
  }
  if (session.status !== 'active' || !Number.isFinite(now) ||
      !Number.isFinite(session.expiresAt) || now >= session.expiresAt) {
    fail('Practice session inactive or expired');
  }
  const questions = session.questions;
  const key = session.answerKey;
  if (!Array.isArray(questions) || !questions.length || questions.length > 100 ||
      !Array.isArray(key) || key.length !== questions.length) fail('Invalid stored session');
  const byId = new Map();
  for (const q of questions) {
    if (!q || typeof q.id !== 'string' || !q.id || byId.has(q.id) ||
        !Array.isArray(q.options) || q.options.length < 2 ||
        q.options.some(o => !o || typeof o.id !== 'string' || !o.id) ||
        new Set(q.options.map(o => o.id)).size !== q.options.length) {
      fail('Invalid stored question');
    }
    byId.set(q.id, q);
  }
  const keys = new Map();
  for (const a of key) {
    if (!a || !byId.has(a.id) || keys.has(a.id) ||
        typeof a.explanation !== 'string' ||
        !byId.get(a.id).options.some(o => o.id === a.correctOptionId)) {
      fail('Invalid stored answer key');
    }
    keys.set(a.id, a);
  }
  if (!Array.isArray(answers) || answers.length > questions.length) fail('Invalid answers');
  const submitted = new Map();
  for (const answer of answers) {
    if (!answer || typeof answer.questionId !== 'string' ||
        !byId.has(answer.questionId) || submitted.has(answer.questionId) ||
        (answer.optionId !== null &&
          !byId.get(answer.questionId).options.some(o => o.id === answer.optionId))) {
      fail('Unknown, duplicate or invalid answer');
    }
    submitted.set(answer.questionId, answer.optionId);
  }
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;
  const review = questions.map(q => {
    const a = keys.get(q.id);
    const selectedOptionId = submitted.has(q.id) ? submitted.get(q.id) : null;
    const outcome = selectedOptionId === null ? 'unanswered' :
      selectedOptionId === a.correctOptionId ? 'correct' : 'incorrect';
    if (outcome === 'correct') correct++;
    else if (outcome === 'incorrect') incorrect++;
    else unanswered++;
    return {questionId:q.id, selectedOptionId, correctOptionId:a.correctOptionId,
      explanation:a.explanation, outcome};
  });
  return {total:questions.length, correct, incorrect, unanswered,
    score:correct, maxScore:questions.length,
    percentage:Math.round(correct / questions.length * 10000) / 100, review};
}
module.exports = { gradePracticeSubmission };
