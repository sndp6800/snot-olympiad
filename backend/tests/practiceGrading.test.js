const test = require('node:test');
const assert = require('node:assert/strict');
const { gradePracticeSubmission: grade } = require('../services/practiceGrading');
const make = () => ({
 kind:'practice', ownerId:'student-test', status:'active', expiresAt:2000,
 questions:[{id:'q1',options:[{id:'a'},{id:'b'}]},
            {id:'q2',options:[{id:'a'},{id:'b'}]},
            {id:'q3',options:[{id:'a'},{id:'b'}]}],
 answerKey:['q1','q2','q3'].map(id=>({id,correctOptionId:'b',explanation:'Test explanation'}))
});
test('grades correct, incorrect and omitted answers',()=>{
 const r=grade(make(),'student-test',[{questionId:'q1',optionId:'b'},
 {questionId:'q2',optionId:'a'}],1000);
 assert.deepEqual([r.correct,r.incorrect,r.unanswered,r.percentage],[1,1,1,33.33]);
});
test('does not accept a different owner or exam session',()=>{
 assert.throws(()=>grade(make(),'another-student',[],1000));
 assert.throws(()=>grade({...make(),kind:'exam'},'student-test',[],1000));
});
test('rejects exact expiry, missing expiry and submitted state',()=>{
 for(const patch of [{expiresAt:1000},{expiresAt:undefined},{status:'submitted'}])
 assert.throws(()=>grade({...make(),...patch},'student-test',[],1000));
});
test('rejects duplicate, unknown and malformed answers',()=>{
 for(const answers of [
 [{questionId:'q1',optionId:'b'},{questionId:'q1',optionId:'a'}],
 [{questionId:'other',optionId:'b'}],[{questionId:'q1',optionId:'forged'}],
 [{questionId:'q1'}],null])
 assert.throws(()=>grade(make(),'student-test',answers,1000));
});
test('ignores injected score and treats explicit null as unanswered',()=>{
 const r=grade(make(),'student-test',[{questionId:'q1',optionId:null,score:100}],1000);
 assert.equal(r.score,0); assert.equal(r.unanswered,3);
});
test('rejects corrupt answer keys',()=>{
 for(const key of [[], [make().answerKey[0],make().answerKey[0],make().answerKey[2]],
 make().answerKey.map(a=>({...a,correctOptionId:'missing'}))])
 assert.throws(()=>grade({...make(),answerKey:key},'student-test',[],1000));
});
test('option order does not change scoring',()=>{
 const s=make(); s.questions.forEach(q=>q.options.reverse());
 assert.equal(grade(s,'student-test',[{questionId:'q1',optionId:'b'}],1000).score,1);
});
test('does not mutate stored session or include identity in result',()=>{
 const s=make(), before=JSON.stringify(s), r=grade(s,'student-test',[],1000);
 assert.equal(JSON.stringify(s),before); assert.equal(r.ownerId,undefined);
});
