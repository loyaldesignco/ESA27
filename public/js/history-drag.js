window.addEventListener('load',function(){
var gsap=window.gsap,col=document.querySelector('[data-a="events"]');
if(!gsap||!col||!matchMedia('(pointer: fine)').matches)return;
var tag=document.createElement('div');
tag.innerHTML='<span style="display:block;font-size:14px;line-height:1">\u2191</span><span style="display:block;margin:3px 0">Drag</span><span style="display:block;font-size:14px;line-height:1">\u2193</span>';
tag.style.cssText='position:fixed;left:0;top:0;width:72px;height:72px;margin:-36px 0 0 22px;border-radius:50%;background:#a0302e;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font:600 10px/1 "IBM Plex Sans",sans-serif;letter-spacing:.18em;text-transform:uppercase;pointer-events:none;z-index:9999;opacity:0;transform:scale(.4)';
document.body.appendChild(tag);
var tx=gsap.quickTo(tag,'x',{duration:.35,ease:'power3'}),ty=gsap.quickTo(tag,'y',{duration:.35,ease:'power3'});
col.addEventListener('pointerenter',function(e){if(e.pointerType!=='mouse')return;gsap.set(tag,{x:e.clientX,y:e.clientY});gsap.to(tag,{opacity:1,scale:1,duration:.35,ease:'back.out(2)'});});
col.addEventListener('pointerleave',function(){gsap.to(tag,{opacity:0,scale:.4,duration:.25,ease:'power2.in'});});
col.addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;tx(e.clientX);ty(e.clientY);});
col.addEventListener('pointerdown',function(){gsap.to(tag,{scale:.82,backgroundColor:'#000',duration:.2});});
window.addEventListener('pointerup',function(){gsap.to(tag,{scale:1,backgroundColor:'#a0302e',duration:.3});});
});