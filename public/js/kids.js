(function(){
if(!window.gsap||!window.ScrollTrigger)return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var gsap=window.gsap,ST=window.ScrollTrigger;gsap.registerPlugin(ST);
var q=function(k,r){return Array.prototype.slice.call((r||document).querySelectorAll('[data-a="'+k+'"]'));};
var E='expo.out',IO='expo.inOut',desk=matchMedia('(min-width: 992px)').matches;
var wrap=q('heroFigWrap'),fig=q('heroFig');
var tl=gsap.timeline({defaults:{ease:E}});
tl.from(q('nav'),{yPercent:-100,duration:1.1},0)
 .from(q('vline'),{scaleY:0,transformOrigin:'top',duration:1.8,stagger:.15,ease:IO},0)
 .from(q('hline'),{scaleX:0,transformOrigin:'left',duration:1.8,ease:IO},.25);
if(q('heroTitle')[0])tl.from(q('line',q('heroTitle')[0]),{yPercent:118,duration:1.4,stagger:.09},.35);
if(wrap.length){tl.fromTo(wrap,{clipPath:'inset(100% 0% 0% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1.6,ease:IO},.4);}
else if(fig.length){tl.fromTo(fig,{clipPath:'inset(100% 0% 0% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1.7,ease:IO},.5);}
tl.from(q('corner'),{scale:0,transformOrigin:'top left',duration:1.1},1.1)
 .from(q('heroCta'),{yPercent:60,autoAlpha:0,duration:1.1},1)
 .from(q('heroCard'),{yPercent:18,autoAlpha:0,duration:1.2,stagger:.1},1.1);
var hero=q('hero')[0];
if(hero&&desk){document.querySelectorAll('[data-par]').forEach(function(el){gsap.to(el,{y:+el.getAttribute('data-par'),ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:.6}});});
 if(wrap.length)gsap.fromTo(fig,{yPercent:0},{yPercent:-8,ease:'none',immediateRender:false,scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:.6}});}
if(q('marquee').length){var loop=gsap.to(q('marquee'),{xPercent:-50,repeat:-1,duration:34,ease:'none'});loop.totalTime(loop.duration()*200);
 ST.create({start:0,end:'max',onUpdate:function(s){var dir=s.direction,boost=1+Math.min(Math.abs(s.getVelocity())/220,6);gsap.to(loop,{timeScale:dir*boost,duration:.2,overwrite:true,onComplete:function(){gsap.to(loop,{timeScale:dir,duration:1.4,ease:'power2.out'});}});}});}
q('split').forEach(function(h){gsap.from(q('line',h),{yPercent:118,duration:1.3,stagger:.09,ease:E,scrollTrigger:{trigger:h,start:'top 86%'}});});
function reveal(k,from){var els=q(k);if(!els.length)return;gsap.set(els,from);ST.batch(els,{start:'top 92%',once:true,onEnter:function(b){gsap.to(b,{y:0,yPercent:0,autoAlpha:1,duration:1.1,stagger:.08,ease:E});}});}
reveal('rise',{y:36,autoAlpha:0});reveal('row',{y:24,autoAlpha:0});reveal('card',{y:48,autoAlpha:0});reveal('tile',{y:30,autoAlpha:0});reveal('town',{y:24,autoAlpha:0});
q('cardImg').forEach(function(img){gsap.fromTo(img,{yPercent:-6,scale:1.12},{yPercent:6,scale:1.12,ease:'none',scrollTrigger:{trigger:img,start:'top bottom',end:'bottom top',scrub:true}});});
q('portraitWrap').forEach(function(pw){gsap.fromTo(pw,{clipPath:'inset(0% 0% 100% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1.6,ease:IO,scrollTrigger:{trigger:pw,start:'top 78%'}});
 gsap.fromTo(q('portrait',pw),{scale:1.2,yPercent:-5},{scale:1.05,yPercent:5,ease:'none',scrollTrigger:{trigger:pw,start:'top bottom',end:'bottom top',scrub:true}});});
q('row').forEach(function(r){var f=q('fill',r)[0],a=q('arrow',r)[0],t=q('rowTitle',r)[0];if(!f)return;
 r.addEventListener('mouseenter',function(){gsap.to(f,{scaleX:1,transformOrigin:'left',duration:.7,ease:E,overwrite:true});if(t)gsap.to(t,{x:18,duration:.7,ease:E,overwrite:true});if(a)gsap.fromTo(a,{x:-24,autoAlpha:0},{x:0,autoAlpha:1,duration:.6,ease:E,overwrite:true});});
 r.addEventListener('mouseleave',function(){gsap.to(f,{scaleX:0,transformOrigin:'right',duration:.7,ease:E,overwrite:true});if(t)gsap.to(t,{x:0,duration:.7,ease:E,overwrite:true});});});
document.querySelectorAll('[data-mag]').forEach(function(el){var xT=gsap.quickTo(el,'x',{duration:.6,ease:'power3'}),yT=gsap.quickTo(el,'y',{duration:.6,ease:'power3'});
 el.addEventListener('mousemove',function(e){var b=el.getBoundingClientRect();xT((e.clientX-b.left-b.width/2)*.3);yT((e.clientY-b.top-b.height/2)*.4);});
 el.addEventListener('mouseleave',function(){xT(0);yT(0);});});
if(matchMedia('(pointer: fine)').matches){var c=document.createElement('div');
 c.style.cssText='position:fixed;left:0;top:0;width:10px;height:10px;margin:-5px 0 0 -5px;background:#a0302e;border:1px solid #a0302e;box-sizing:border-box;pointer-events:none;z-index:9999;opacity:0';
 document.body.appendChild(c);var cx=gsap.quickTo(c,'x',{duration:.45,ease:'power3'}),cy=gsap.quickTo(c,'y',{duration:.45,ease:'power3'}),big=false;
 window.addEventListener('mousemove',function(e){cx(e.clientX);cy(e.clientY);c.style.opacity=1;var hit=!!(e.target.closest&&e.target.closest('a,button'));
  if(hit!==big){big=hit;gsap.to(c,{width:hit?52:10,height:hit?52:10,margin:hit?'-26px 0 0 -26px':'-5px 0 0 -5px',backgroundColor:hit?'rgba(160,48,46,0)':'rgba(160,48,46,1)',rotate:hit?45:0,duration:.45,ease:E});}});
 document.addEventListener('mouseleave',function(){c.style.opacity=0;});}
window.addEventListener('load',function(){ST.refresh();});
})();