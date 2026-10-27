(function(){
var DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var S=(window.__ESA&&window.__ESA.schedule)||{0:[],1:[],2:[],3:[],4:[],5:[],6:[]};
var sel=new Date().getDay()||1;
function fmt(h){var hh=Math.floor(h),mm=Math.round((h-hh)*60),ap=hh>=12?'PM':'AM',h12=hh%12===0?12:hh%12;return h12+':'+String(mm).padStart(2,'0')+' '+ap;}
function live(){
 var now=new Date(),cur=now.getHours()+now.getMinutes()/60,today=now.getDay(),next=null;
 for(var off=0;off<8&&!next;off++){var dow=(today+off)%7;for(var i=0;i<S[dow].length;i++){var c=S[dow][i];if(off===0&&c[0]<=cur)continue;next={h:c[0],name:c[1],group:c[2],off:off,dow:dow};break;}}
 var mins=next?Math.round((next.off*24+next.h-cur)*60):0;
 var cd=!next?'':mins<60?'in '+mins+'m':mins<1440?'in '+Math.floor(mins/60)+'h '+(mins%60)+'m':'in '+Math.round(mins/1440)+'d';
 var vals={today:DAYS[today]+' \u00b7 '+now.toLocaleDateString('en-US',{month:'long',day:'numeric'}),name:next?next.name:'Open mat',time:next?fmt(next.h):'',when:next?(next.off===0?'Today':next.off===1?'Tomorrow':DAYS[next.dow]):'',countdown:cd};
 Object.keys(vals).forEach(function(k){document.querySelectorAll('[data-live="'+k+'"]').forEach(function(el){el.textContent=vals[k];});});
 var key=next?next.dow+':'+next.h:'';
 var tabs=document.querySelector('[data-live="tabs"]');
 if(tabs){tabs.innerHTML=[1,2,3,4,5,6].map(function(d){return '<button type="button" class="sc-tab'+(d===sel?' is-active':'')+'" data-day="'+d+'">'+DAYS[d]+'</button>';}).join('');}
 var list=document.querySelector('[data-live="dayList"]');
 if(list){list.innerHTML=S[sel].map(function(c){var nx=(sel+':'+c[0])===key,past=sel===today&&c[0]<=cur;return '<div class="sc-row'+(nx?' is-next':'')+(past?' is-past':'')+'"><div class="sc-row-time">'+fmt(c[0])+'</div><div class="sc-row-name">'+c[1]+'</div><div class="sc-row-meta">'+c[2]+'</div><div class="sc-row-flag">'+(nx?'Up next':'')+'</div></div>';}).join('');}
 var wk=document.querySelector('[data-live="week"]');
 if(wk){var shown=wk.dataset.revealed==='1';wk.innerHTML=[1,2,3,4,5,6].map(function(d){var t=d===today?' is-today':'';return '<div class="hm-day'+t+'" data-a="day"'+(shown?' style="opacity:1;visibility:visible"':'')+'><div class="hm-day-label'+t+'">'+DAYS[d].slice(0,3)+'</div><div class="hm-day-list">'+S[d].map(function(c){var cls='hm-cls'+((d+':'+c[0])===key?' is-next':'')+((d===today&&c[0]<=cur)?' is-past':'');return '<div class="'+cls+'"><div class="hm-cls-time">'+fmt(c[0])+'</div><div class="hm-cls-name">'+c[1]+'</div><div class="hm-cls-group">'+c[2]+'</div></div>';}).join('')+'</div></div>';}).join('');}
}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-day]');if(!b)return;sel=+b.getAttribute('data-day');live();if(window.gsap)gsap.from('.sc-row',{y:16,autoAlpha:0,duration:.6,stagger:.05,ease:'expo.out'});});
live();setInterval(live,60000);
})();