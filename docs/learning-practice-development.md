# Learning and practice foundation

Status: server-side utility only. Not mounted in Express or deployed. No UI, payments, AI integration or imported content yet.

Implemented: approved practice-only selection by grade, subject, language, topic and difficulty; unique question IDs; recent-history preference with repeatedCount; opt-in option shuffle; public question projection separate from private answer key; reviewed resource rights gate for commercial use and delivery type.

Run tests: `node --test backend/tests/practiceEngine.test.js` with Node 20+.

Validation: eight tests passed in a JavaScript isolate with a randomInt shim. Native Node execution, full application build and browser verification remain pending because the execution environment was unavailable.

Required integration:
- Persist resources, practice questions, blueprints, student attempt history and owner-scoped sessions in MongoDB. Keep actual exam questions in a separate restricted collection.
- Enforce student/guardian linkage, school isolation, free/paid entitlements and creator authorization server-side.
- Call buildPracticeSession on the server only. Return only questions, never the complete object. Persist the private answerKey with owner and expiry; grade server-side before releasing explanations.
- Read recent IDs from persisted attempt history, not client requests. Preserve option IDs for grading. Leave order-sensitive options unshuffled.
- Rights metadata must come from trusted reviewer operations with audit logs. Review the exact asset and requested delivery rights. The gate does not independently establish legal permission.
- Add class/subject/chapter/language UI, practice player, results and accessible age-appropriate layouts.
- Add verified, idempotent payment webhooks and effective-dated pricing. Never unlock access from client success flags. No commercial prices chosen yet.
- Populate 50–100 reviewed practice items per supported class/subject, expanding over time. Small pools cannot guarantee zero repeats.

MBA submission and SNOT production remain separate workstreams; MBA deadline retains priority. Contact configuration belongs in deployment settings and is omitted from this public document.
