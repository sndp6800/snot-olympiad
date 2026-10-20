# Practice grading integration

The new practiceGrading service is a pure server-side utility, not a mounted API. It accepts the trusted persisted session, authenticated student ID, submitted answers and a server clock. It validates practice-only scope, owner, active state, numeric expiry, stored question/answer-key consistency and answer membership. Scores use equal one-point questions with no negative marking; they are practice scores, never official exam rankings.

## Required route and persistence contract

1. Authenticate the caller. Resolve the student from trusted account records. Guardian views do not implicitly authorize submitting as a student.
2. Fetch the session by ID and owner, check school boundaries and current entitlement server-side. Never accept a client-supplied session, key, expiry, owner or clock.
3. Call gradePracticeSubmission with stored questions/key and only the submitted answer array. Unknown IDs, repeated IDs and invalid option IDs are rejected. Missing or null answers score zero.
4. Atomically update active -> submitted with the computed result and submission identifier, checking owner, expiry and status in the database update predicate. Return review ONLY after the update succeeds. Concurrent losers must not overwrite the winner or receive a newly computed answer review.
5. On a legitimate retry, fetch the persisted completed result after rechecking ownership; do not grade again. Return stored results consistently.
6. Store recent-question history from actual persisted sessions. Keep official exam collections inaccessible to practice routes.
7. Render explanations as text, not unsanitized HTML. Apply request-size limits and per-user rate limits at the route.

The pure service cannot enforce locks, persisted completion, JWT validity, paid entitlement, guardian linkage or school ownership by itself. These remain required before mounting a public endpoint.

## Verification

Eight grading tests passed in a V8 JavaScript isolate. These tests use no RNG. Native Node, HTTP, MongoDB concurrency and browser tests were not run: no usable execution environment was available. Run native tests with:

`node --test backend/tests/practiceEngine.test.js backend/tests/practiceGrading.test.js`

Existing local staging releases and the Next.js/Express project are separate implementations. Reconcile their workflows before migration; do not replace either blindly or import demonstration data as real records. The user's reported localhost Study Buddy no-response bug is not fixed by this grading utility. Diagnosing it requires the current local app source and runtime request/error evidence.

No deployment, live-data migration, payment activation or AI provider activation is performed by this change.
