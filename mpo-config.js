/* Shared config for MPO Cup 2026. Needs firebase-init.js loaded first (provides db, REG, SET). */
const MPO_CATS=["Low Intermediate Men's Doubles","Low Intermediate Women's Doubles","High Intermediate Men's Doubles","High Intermediate Women's Doubles","Advanced Open (All-Gender Doubles)"];
const MPO_STATUSES=["Submitted","Confirmed-Unpaid","Confirmed-Paid","Rejected"];
const MPO_DEF={date:"November 28–29, 2026",venue:"Balai Mindoro",fee:"₱1,500 per player",slots:"24",open:"2026-10-13",close:"2026-11-17",mode:"open",contact:"",phone:"",email:""};
const mpoEsc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
async function mpoSettings(){const d=(await SET.get()).data()||{},o={};for(const k in MPO_DEF)o[k]=d["x_"+k]??MPO_DEF[k];return o;}
async function mpoSave(o){const d={};for(const k in o)d["x_"+k]=o[k];await SET.set(d,{merge:true});}
const mpoFmt=(iso,o)=>new Date(iso+"T12:00:00+08:00").toLocaleDateString("en-PH",{timeZone:"Asia/Manila",...o});
function mpoState(s){if(s.mode==="open")return"open";if(s.mode==="closed")return"closed";
 const n=Date.now(),a=Date.parse(s.open+"T00:00:00+08:00"),b=Date.parse(s.close+"T23:59:59+08:00");return n<a?"soon":n>b?"closed":"open";}
function mpoStatusText(s,st){return st==="open"?"Registration is open until "+mpoFmt(s.close,{month:"long",day:"numeric",year:"numeric"})+".":st==="soon"?"Registration opens "+mpoFmt(s.open,{weekday:"long",month:"long",day:"numeric",year:"numeric"})+".":"Registration is closed.";}
