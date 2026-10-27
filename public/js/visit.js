(function(){
var mp=document.querySelector('[data-map]');if(mp&&!mp.firstChild){var f=document.createElement('iframe');f.title='Map to '+((window.__ESA&&window.__ESA.site&&window.__ESA.site.mapTitle)||'the academy');f.src='https://www.google.com/maps?q='+encodeURIComponent((window.__ESA&&window.__ESA.site&&window.__ESA.site.mapQuery)||'')+'&z=15&output=embed';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';f.style.cssText='position:absolute;inset:0;width:100%;height:100%;border:0;filter:grayscale(1) contrast(1.05)';mp.appendChild(f);}
if(!window.gsap||!window.ScrollTrigger)return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var gsap=window.gsap,ST=window.ScrollTrigger;gsap.registerPlugin(ST);
var q=function(k,r){return Array.prototype.slice.call((r||document).querySelectorAll('[data-a="'+k+'"]'));};
var E='expo.out',IO='expo.inOut';
var tl=gsap.timeline({defaults:{ease:E}});tl.from(q('nav'),{yPercent:-100,duration:1.1},0);
var t1=q('heroTitle')[0];if(t1)tl.from(q('line',t1),{yPercent:118,duration:1.4,stagger:.09},.3);
var fp=q('formPanel')[0];if(fp)tl.from(fp,{yPercent:6,autoAlpha:0,duration:1.2},.6);
q('split').forEach(function(h){gsap.from(q('line',h),{yPercent:118,duration:1.3,stagger:.09,ease:E,scrollTrigger:{trigger:h,start:'top 86%'}});});
function reveal(k,f){var els=q(k);if(!els.length)return;gsap.set(els,f);ST.batch(els,{start:'top 92%',once:true,onEnter:function(b){gsap.to(b,{y:0,autoAlpha:1,duration:1.1,stagger:.06,ease:E});}});}
reveal('rise',{y:36,autoAlpha:0});reveal('row',{y:24,autoAlpha:0});reveal('town',{y:24,autoAlpha:0});
document.querySelectorAll('[data-mag]').forEach(function(el){var xT=gsap.quickTo(el,'x',{duration:.6,ease:'power3'}),yT=gsap.quickTo(el,'y',{duration:.6,ease:'power3'});el.addEventListener('mousemove',function(e){var b=el.getBoundingClientRect();xT((e.clientX-b.left-b.width/2)*.3);yT((e.clientY-b.top-b.height/2)*.4);});el.addEventListener('mouseleave',function(){xT(0);yT(0);});});
if(matchMedia('(pointer: fine)').matches){var c=document.createElement('div');c.style.cssText='position:fixed;left:0;top:0;width:10px;height:10px;margin:-5px 0 0 -5px;background:#a0302e;border:1px solid #a0302e;box-sizing:border-box;pointer-events:none;z-index:9999;opacity:0';document.body.appendChild(c);var cx=gsap.quickTo(c,'x',{duration:.45,ease:'power3'}),cy=gsap.quickTo(c,'y',{duration:.45,ease:'power3'}),big=false;window.addEventListener('mousemove',function(e){cx(e.clientX);cy(e.clientY);c.style.opacity=1;var hit=!!(e.target.closest&&e.target.closest('a,button,[role=button],input,label'));if(hit!==big){big=hit;gsap.to(c,{width:hit?52:10,height:hit?52:10,margin:hit?'-26px 0 0 -26px':'-5px 0 0 -5px',backgroundColor:hit?'rgba(160,48,46,0)':'rgba(160,48,46,1)',rotate:hit?45:0,duration:.45,ease:E});}});document.addEventListener('mouseleave',function(){c.style.opacity=0;});}
window.addEventListener('load',function(){ST.refresh();});
})();