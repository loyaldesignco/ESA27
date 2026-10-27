/* SOUZA BLACK BELT ROSTER — data comes from Sanity (Black belts).
   [name, black belt date YYYY-MM-DD / YYYY-MM / YYYY (or null), role ('Coach','Instructor' or '')]
   Degrees calculate automatically on each anniversary (IBJJF: 3,3,3,5,5,5 years). */
(function(){
var ROSTER=(window.__ESA&&window.__ESA.roster)||[];
var STEPS=[3,3,3,5,5,5];
function parse(s){var p=String(s).split('-');return new Date(+p[0],(+p[1]||1)-1,+p[2]||1);}
function degree(s){var a=parse(s),now=new Date(),d=0,t=0;for(var i=0;i<STEPS.length;i++){t+=STEPS[i];if(now>=new Date(a.getFullYear()+t,a.getMonth(),a.getDate()))d++;else break;}return d;}
function ord(n){var s=['th','st','nd','rd'],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0]);}
function word(n){var o='zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split(' '),t='  twenty thirty forty fifty sixty seventy eighty ninety'.split(' ');var w=n<20?o[n]:n<100?t[Math.floor(n/10)]+(n%10?'-'+o[n%10]:''):String(n);return w.charAt(0).toUpperCase()+w.slice(1);}
function list(){return ROSTER.map(function(r){var d=r[3]!=null?r[3]:r[1]?degree(r[1]):0;return{name:r[0],date:r[1],note:r[2],degree:d,short:d?ord(d)+' degree':'Black belt',rank:d?ord(d)+' degree black belt':'Black belt'};}).sort(function(a,b){return b.degree-a.degree||(a.date?parse(a.date):9e15)-(b.date?parse(b.date):9e15);});}
window.SouzaRoster={list:list,word:word,find:function(n){return list().filter(function(p){return p.name===n;})[0]||null;}};
})();