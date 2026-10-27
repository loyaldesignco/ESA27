(function(){
if(!window.gsap||!window.ScrollTrigger)return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var gsap=window.gsap,ST=window.ScrollTrigger;gsap.registerPlugin(ST);
var q=function(k,r){return Array.prototype.slice.call((r||document).querySelectorAll('[data-a="'+k+'"]'));};
var E='expo.out',IO='expo.inOut',desk=matchMedia('(min-width: 992px)').matches;
var wrap=q('heroFigWrap'),fig=q('heroFig');
var tl=gsap.timeline({defaults:{ease:E}});
tl.from(q('nav'),{yPercent:-100,duration:1.1},0);
if(q('heroTitle')[0])tl.from(q('line',q('heroTitle')[0]),{yPercent:118,duration:1.4,stagger:.09},.3);
if(wrap.length)tl.fromTo(wrap,{clipPath:'inset(100% 0% 0% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1.6,ease:IO},.4).from(fig,{yPercent:12,duration:2},.4);
tl.from(q('corner'),{scale:0,transformOrigin:'top left',duration:1.1},1.1);
var hero=q('hero')[0];
if(hero&&desk&&wrap.length)gsap.to(fig,{yPercent:6,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:.6}});
q('split').forEach(function(h){gsap.from(q('line',h),{yPercent:118,duration:1.3,stagger:.09,ease:E,scrollTrigger:{trigger:h,start:'top 86%'}});});
function reveal(k,from){var els=q(k);if(!els.length)return;gsap.set(els,from);ST.batch(els,{start:'top 92%',once:true,onEnter:function(b){gsap.to(b,{y:0,autoAlpha:1,duration:1.1,stagger:.08,ease:E});}});}
reveal('rise',{y:36,autoAlpha:0});reveal('card',{y:48,autoAlpha:0});reveal('tile',{y:24,autoAlpha:0});
var gs=q('galStage')[0],gt=q('galTrack')[0];
if(gs&&gt){var slides=q('galSlide'),idxEl=q('galIdx')[0],capEl=q('galCap')[0],gi=0;
 var caps=(window.__ESA&&window.__ESA.galleryCaps)||[];
 var sw=function(){return gs.clientWidth;};
 var fit=function(){slides.forEach(function(s){s.style.width=sw()+'px';});gsap.set(gt,{x:-gi*sw()});};
 fit();addEventListener('resize',fit);
 var go=function(d){gi=(gi+d+slides.length)%slides.length;gsap.to(gt,{x:-gi*sw(),duration:1.1,ease:E});gsap.fromTo(slides[gi].firstElementChild,{scale:1.08},{scale:1,duration:1.4,ease:E});
  if(idxEl){gsap.fromTo(idxEl,{yPercent:40,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.7,ease:E});idxEl.textContent=String(gi+1).padStart(2,'0');}
  if(capEl){gsap.fromTo(capEl,{y:10,autoAlpha:0},{y:0,autoAlpha:1,duration:.7,ease:E});capEl.textContent=caps[gi]||'';}};
 var pv=q('galPrev')[0],nx=q('galNext')[0];
 if(pv)pv.addEventListener('click',function(e){e.preventDefault();go(-1);});
 if(nx)nx.addEventListener('click',function(e){e.preventDefault();go(1);});
 gsap.fromTo(gs,{clipPath:'inset(0% 100% 0% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1.6,ease:IO,scrollTrigger:{trigger:gs,start:'top 80%'}});
 var lb=q('lb')[0],lbImg=q('lbImg')[0],lbIdx=q('lbIdx')[0],lbCap=q('lbCap')[0],li=0;
 if(lb&&lbImg){if(lb.parentElement!==document.body)document.body.appendChild(lb);
  var srcs=slides.map(function(s){var im=s.querySelector('img');return im.getAttribute('src');}),alts=slides.map(function(s){return s.querySelector('img').alt||'';});
  var show=function(i){li=(i+slides.length)%slides.length;lbImg.removeAttribute('srcset');lbImg.removeAttribute('sizes');lbImg.src=srcs[li];lbImg.alt=alts[li];if(lbIdx)lbIdx.textContent=String(li+1).padStart(2,'0');if(lbCap)lbCap.textContent=caps[li]||'';gsap.fromTo(lbImg,{autoAlpha:0,scale:.98},{autoAlpha:1,scale:1,duration:.6,ease:E});};
  var open=function(i){show(i);lb.classList.add('is-open');document.documentElement.style.overflow='hidden';gsap.fromTo(lb,{opacity:0},{opacity:1,duration:.4,ease:E});};
  var close=function(){gsap.to(lb,{opacity:0,duration:.3,onComplete:function(){lb.classList.remove('is-open');document.documentElement.style.overflow='';}});};
  gs.addEventListener('click',function(){open(gi);});
  var cl=q('lbClose')[0],lp=q('lbPrev')[0],ln=q('lbNext')[0];
  if(cl)cl.addEventListener('click',function(e){e.preventDefault();close();});
  if(lp)lp.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();show(li-1);});
  if(ln)ln.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();show(li+1);});
  lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('in-lb-stage'))close();});
  addEventListener('keydown',function(e){if(!lb.classList.contains('is-open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(li-1);if(e.key==='ArrowRight')show(li+1);});}}
var sec=q('beltSection')[0],pin=q('beltPin')[0],track=q('beltTrack')[0];
if(sec&&track&&desk){
 var dist=function(){return Math.max(0,track.scrollWidth-track.parentElement.clientWidth);};
 var progs=q('beltProg'),panels=q('beltPanel');
 var btl=gsap.timeline({scrollTrigger:{trigger:sec,pin:pin,start:'top top',end:function(){return '+='+(dist()+200);},scrub:.8,invalidateOnRefresh:true}});
 btl.to(track,{x:function(){return -dist();},ease:'none',duration:1},0);
 progs.forEach(function(p,i){btl.to(p,{scaleX:1,ease:'none',duration:1/progs.length},i/progs.length);});
 panels.forEach(function(p,i){var st=q('beltStripe',p),at=i===0?0:Math.max(0,(i-.6)/(panels.length-1));if(st.length)btl.from(st,{scaleX:0,ease:'none',stagger:.02,duration:.12},at);if(i===0)return;btl.from(p,{opacity:.35,ease:'none',duration:.25},Math.max(0,(i-1)/(panels.length-1)));});
}else if(sec){gsap.utils.toArray('[data-a="beltPanel"]').forEach(function(p){gsap.from(p,{y:40,autoAlpha:0,duration:1,ease:E,scrollTrigger:{trigger:p,start:'top 90%'}});gsap.from(q('beltStripe',p),{scaleX:0,duration:.6,stagger:.08,ease:E,scrollTrigger:{trigger:p,start:'top 80%'}});});}
q('countUp').forEach(function(el){var o={v:0};gsap.to(o,{v:+el.dataset.to,duration:1.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%'},onUpdate:function(){el.textContent=Math.round(o.v);}});});
q('portraitWrap').forEach(function(pw){gsap.fromTo(pw,{clipPath:'inset(0% 0% 100% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1.6,ease:IO,scrollTrigger:{trigger:pw,start:'top 78%'}});gsap.fromTo(q('portrait',pw),{scale:1.2,yPercent:-5},{scale:1.05,yPercent:5,ease:'none',scrollTrigger:{trigger:pw,start:'top bottom',end:'bottom top',scrub:true}});});
document.querySelectorAll('[data-mag]').forEach(function(el){var xT=gsap.quickTo(el,'x',{duration:.6,ease:'power3'}),yT=gsap.quickTo(el,'y',{duration:.6,ease:'power3'});el.addEventListener('mousemove',function(e){var b=el.getBoundingClientRect();xT((e.clientX-b.left-b.width/2)*.3);yT((e.clientY-b.top-b.height/2)*.4);});el.addEventListener('mouseleave',function(){xT(0);yT(0);});});
if(matchMedia('(pointer: fine)').matches){var c=document.createElement('div');c.style.cssText='position:fixed;left:0;top:0;width:10px;height:10px;margin:-5px 0 0 -5px;background:#a0302e;border:1px solid #a0302e;box-sizing:border-box;pointer-events:none;z-index:9999;opacity:0';document.body.appendChild(c);var cx=gsap.quickTo(c,'x',{duration:.45,ease:'power3'}),cy=gsap.quickTo(c,'y',{duration:.45,ease:'power3'}),big=false;window.addEventListener('mousemove',function(e){cx(e.clientX);cy(e.clientY);c.style.opacity=1;var hit=!!(e.target.closest&&e.target.closest('a,button'));if(hit!==big){big=hit;gsap.to(c,{width:hit?52:10,height:hit?52:10,margin:hit?'-26px 0 0 -26px':'-5px 0 0 -5px',backgroundColor:hit?'rgba(160,48,46,0)':'rgba(160,48,46,1)',rotate:hit?45:0,duration:.45,ease:E});}});document.addEventListener('mouseleave',function(){c.style.opacity=0;});}
window.addEventListener('load',function(){ST.refresh();});
})();