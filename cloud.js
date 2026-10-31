/* Optional Firebase Firestore tracking. No student records sync before consent and configuration. */
(()=>{
'use strict';
const cfg=window.G7_FIREBASE_CONFIG||{};
const configured=window.G7_CLOUD_LIVE_ENABLED===true && !!(cfg.apiKey&&cfg.projectId&&cfg.appId&&!Object.values(cfg).some(x=>String(x).includes('PASTE_')));
const optKey='grade7-auto-cloud-consent-v1';
let sdk,auth,db,ready,teacherListener,marksListener,rows=new Map(),marks=new Map();
const api={configured,ready:false,mode:configured?'initializing':'not-configured',studentConnected:false,teacherVerified:false,teacherUid:'',uid:'',lastSynced:'',error:'',connectStudent,syncProgress,signInTeacher,signOutTeacher,saveWritingMark,removeStudentCloudProgress};
window.G7Cloud=api;
function notify(){window.dispatchEvent(new CustomEvent('grade7-cloud-state',{detail:{mode:api.mode,error:api.error}}))}
function fail(e){api.error=e?.message||'Sync unavailable';api.mode='error';notify()}
function consent(){try{return JSON.parse(localStorage.getItem(optKey)||'null')}catch(e){return null}}
function cleanHistory(list){return (Array.isArray(list)?list:[]).slice(-100).map(h=>{
 const x={id:String(h.id||'').slice(0,130),type:h.type==='exam'?'exam':'practice',date:String(h.date||'').slice(0,32),at:String(h.at||'').slice(0,45),label:String(h.label||'').slice(0,120),skill:String(h.skill||'').slice(0,40),correct:Math.max(0,Math.min(60,Number(h.correct)||0)),total:Math.max(1,Math.min(60,Number(h.total)||1)),pct:Math.max(0,Math.min(100,Number(h.pct)||0))};
 if(x.type==='exam'){x.wordCount=Math.max(0,Number(h.wordCount)||0);x.parts={};for(const k of ['vocab','grammar','readingA','readingB']){const p=h.parts?.[k];if(p)x.parts[k]={earned:Number(p.earned)||0,total:Number(p.total)||1}}}return x;
})}
async function studentUser(){
 await ready;
 if(auth.currentUser&&!auth.currentUser.isAnonymous)throw Error('Sign out of the teacher account first.');
 if(!auth.currentUser)await sdk.signInAnonymously(auth);
 if(!auth.currentUser?.isAnonymous)throw Error('Student sign-in was not available.');
 return auth.currentUser;
}
async function connectStudent(st){
 if(!configured)throw Error('The teacher has not activated Firebase.');
 if(typeof st?.fullName!=='string'||st.fullName.trim().length<3||st.fullName.trim().length>80||!['7/1','7/2'].includes(st?.className))throw Error('Enter your full name and class.');
 if(st.consent!==true)throw Error('Consent is required.');
 try{
  const u=await studentUser();
  const ref=sdk.doc(db,'students',u.uid);
  const old=await sdk.getDoc(ref);
  if(old.exists()){
   if(old.data().className!==st.className||old.data().fullName!==st.fullName.trim())throw Error('This browser is linked to a different student. Use another browser profile.');
   window.dispatchEvent(new CustomEvent('grade7-cloud-import',{detail:{history:cleanHistory(old.data().history)}}));
  }
  localStorage.setItem(optKey,JSON.stringify({uid:u.uid,code:'G7'+u.uid.slice(0,15),className:st.className,fullName:st.fullName.trim(),consent:true}));
  api.studentConnected=true;api.uid=u.uid;api.mode='student-connected';api.error='';notify();return {uid:u.uid};
 }catch(e){fail(e);throw e}
}
async function syncProgress(st,history){
 const c=consent();if(!configured||!c?.consent||!api.studentConnected||!auth?.currentUser?.isAnonymous)return {skipped:true};
 if(c.uid!==auth.currentUser.uid||c.className!==st.className)throw Error('Student code does not match this session.');
 try{
  await sdk.setDoc(sdk.doc(db,'students',c.uid),{studentCode:c.code,fullName:c.fullName,className:c.className,nickname:'',history:cleanHistory(history),version:1,consent:true,updatedAt:new Date().toISOString(),savedAt:sdk.serverTimestamp()});
  api.lastSynced=new Date().toLocaleString();api.error='';api.mode='student-connected';notify();return {saved:true};
 }catch(e){fail(e);throw e}
}
function notifyTeacher(){
 const records=[];
 for(const [uid,r] of rows){records.push({uid,student:{code:String(r.studentCode||''),class:String(r.className||''),name:String(r.fullName||'')},exportedAt:String(r.updatedAt||''),history:cleanHistory(r.history),marks:marks.get(uid)||{}})}
 window.dispatchEvent(new CustomEvent('grade7-teacher-data',{detail:{records}}));
}
async function startTeacher(u){
 if(teacherListener)teacherListener();if(marksListener)marksListener();teacherListener=marksListener=null;
 api.teacherVerified=false;api.teacherUid=u.uid;api.mode='teacher-verifying';notify();
 try{
  await sdk.getDocs(sdk.query(sdk.collection(db,'students'),sdk.limit(1)));
  api.teacherVerified=true;api.mode='teacher-connected';api.error='';notify();
  teacherListener=sdk.onSnapshot(sdk.collection(db,'students'),snap=>{rows=new Map(snap.docs.map(d=>[d.id,d.data()]));notifyTeacher()},fail);
  marksListener=sdk.onSnapshot(sdk.collection(db,'writingMarks'),snap=>{marks=new Map(snap.docs.map(d=>[d.id,d.data().marks||{}]));notifyTeacher()},fail);
 }catch(e){api.mode='teacher-denied';api.error='Teacher account is not authorised in Firestore rules. '+(e?.message||'');notify()}
}
async function signInTeacher(email,password){
 await ready;if(!email||!password)throw Error('Enter teacher email and password.');
 try{
  const credentials=await sdk.signInWithEmailAndPassword(auth,email,password);
  await startTeacher(credentials.user);
  if(!api.teacherVerified)throw Error(api.error||'Teacher is not authorised.');return {uid:credentials.user.uid};
 }catch(e){if(api.mode!=='teacher-denied')fail(e);throw e}
}
async function signOutTeacher(){
 await ready;if(teacherListener)teacherListener();if(marksListener)marksListener();
 teacherListener=marksListener=null;rows.clear();marks.clear();api.teacherVerified=false;api.teacherUid='';api.studentConnected=false;api.uid='';
 await sdk.signOut(auth);api.mode='ready';api.error='';notifyTeacher();notify();
}
async function removeStudentCloudProgress(){
 await ready;const u=auth.currentUser;if(!u?.isAnonymous)throw Error('Not a student session');
 await sdk.deleteDoc(sdk.doc(db,'students',u.uid));localStorage.removeItem(optKey);api.studentConnected=false;api.mode='ready';notify();
}
async function saveWritingMark(uid,examId,score){
 await ready;if(!api.teacherVerified||!rows.has(uid)||!/^exam-[A-Za-z0-9_-]{5,160}$/.test(examId))throw Error('Teacher authentication or exam ID invalid.');
 const ref=sdk.doc(db,'writingMarks',uid);
 if(score===null||score===undefined||score===''){
  await sdk.setDoc(ref,{marks:{},updatedAt:sdk.serverTimestamp()},{merge:true});
  await sdk.updateDoc(ref,{['marks.'+examId]:sdk.deleteField()});
 }else{
  if(!Number.isInteger(score)||score<0||score>40)throw Error('Writing score must be from 0 to 40.');
  await sdk.setDoc(ref,{marks:{[examId]:score},updatedAt:sdk.serverTimestamp()},{merge:true});
 }
}
async function initialize(){
 if(!configured){api.ready=true;return}
 try{
  const base='https://www.gstatic.com/firebasejs/11.10.0/';
  const [a,b,c]=await Promise.all([import(base+'firebase-app.js'),import(base+'firebase-auth.js'),import(base+'firebase-firestore.js')]);
  sdk={...a,...b,...c};auth=sdk.getAuth(sdk.initializeApp(cfg));db=sdk.getFirestore();
  api.ready=true;api.mode='ready';notify();
  sdk.onAuthStateChanged(auth,async u=>{
   if(!u)return;
   if(!u.isAnonymous){await startTeacher(u);return}
   const c=consent();if(!c?.consent||c.uid!==u.uid)return;
   try{
    const d=await sdk.getDoc(sdk.doc(db,'students',u.uid));
    if(d.exists()&&d.data().fullName===c.fullName&&d.data().className===c.className){
     window.dispatchEvent(new CustomEvent('grade7-cloud-import',{detail:{history:cleanHistory(d.data().history)}}));
     api.studentConnected=true;api.uid=u.uid;api.mode='student-connected';notify();
    }
   }catch(e){fail(e)}
  });
 }catch(e){fail(e);throw e}
}
ready=initialize();ready.catch(()=>{});
})();