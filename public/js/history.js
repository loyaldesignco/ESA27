(function(){
var LOG=function(){try{console.log.apply(console,['[history]'].concat([].slice.call(arguments)));}catch(e){}};
if(!window.gsap||!window.ScrollTrigger){LOG('gsap missing');return;}
var gsap=window.gsap,ST=window.ScrollTrigger;gsap.registerPlugin(ST);
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches,E='expo.out',IO='expo.inOut';
var q=function(k,r){return Array.prototype.slice.call((r||document).querySelectorAll('[data-a="'+k+'"]'));};
var tl=q('timeline')[0],evs=q('event'),reel=q('yearReel')[0],idx=q('yearIdx')[0],bar=q('yearBar')[0],nm=q('holoName')[0],fill=q('timeFill')[0],holo=q('holo')[0],photo=q('holoPhoto')[0];
var n=evs.length,cur=-1,P=null;
var urls=evs.map(function(ev){var s=ev.querySelector('img');if(!s)return null;var u=s.getAttribute('src')||'';if(!u||/placeholder|\/x\.(png|jpg|svg)$/.test(u))return null;return u;});
LOG('events',n,'images',urls.filter(Boolean).length);
if(photo){photo.removeAttribute('srcset');photo.removeAttribute('sizes');photo.style.cssText='position:absolute;left:50%;top:50%;max-width:78%;max-height:88%;transform:translate(-50%,-50%);opacity:0;pointer-events:none;z-index:2;object-fit:contain';}
function fbShow(i){if(!photo)return;var u=urls[i];if(!u){gsap.to(photo,{opacity:0,duration:.3,overwrite:true});return;}photo.src=u;gsap.fromTo(photo,{opacity:0},{opacity:1,duration:.7,delay:.3,overwrite:true});}
function initP(){if(!window.THREE||!holo){LOG('photo-only mode');return;}try{
 var T=THREE,N=matchMedia('(min-width: 992px)').matches?14000:7000;
 var r=new T.WebGLRenderer({antialias:true,alpha:true});r.setPixelRatio(Math.min(2,devicePixelRatio||1));r.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1';holo.appendChild(r.domElement);
 var sc=new T.Scene(),cam=new T.PerspectiveCamera(35,1,.1,50);cam.position.z=5.4;var grp=new T.Group();sc.add(grp);
 var g=new T.BufferGeometry(),A=function(){return new Float32Array(N*3);};
 var rn=A();for(var i=0;i<N*3;i++)rn[i]=Math.random()*2-1;
 g.setAttribute('position',new T.BufferAttribute(A(),3));['aFrom','aTo','cFrom','cTo'].forEach(function(k){g.setAttribute(k,new T.BufferAttribute(A(),3));});g.setAttribute('aRnd',new T.BufferAttribute(rn,3));
 var U={uMix:{value:1},uTime:{value:0},uSize:{value:2.2*r.getPixelRatio()},uAlpha:{value:1},uDrift:{value:1}};
 var mat=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:U,
  vertexShader:'attribute vec3 aFrom,aTo,cFrom,cTo,aRnd;uniform float uMix,uTime,uSize,uDrift;varying vec3 vC;varying float vS;void main(){float m=smoothstep(0.,1.,uMix);float s=sin(3.14159*uMix);vec3 p=mix(aFrom,aTo,m)+aRnd*s*1.7+vec3(0.,s*.35,0.);p.x+=sin(uTime*.8+aRnd.y*6.)*.006*uDrift;p.y+=cos(uTime*.7+aRnd.x*6.)*.006*uDrift;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=uSize*(1.+s*.9)*(5.4/-mv.z);vC=mix(cFrom,cTo,m);vS=s;}',
  fragmentShader:'uniform float uAlpha;varying vec3 vC;varying float vS;void main(){vec2 d=gl_PointCoord-.5;float l=length(d);if(l>.5)discard;vec3 c=mix(vC,vec3(1.,.36,.32),.14);gl_FragColor=vec4(c,(1.-vS*.45)*(1.-l*1.6)*.9*uAlpha);}'});
 var pts=new T.Points(g,mat);grp.add(pts);
 var PU={map:{value:null},uOp:{value:0},uKey:{value:0}};
 var pmat=new T.ShaderMaterial({transparent:true,depthWrite:false,uniforms:PU,vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
  fragmentShader:'uniform sampler2D map;uniform float uOp,uKey;varying vec2 vUv;void main(){vec4 t=texture2D(map,vUv);float lum=dot(t.rgb,vec3(.299,.587,.114));float k=uKey>.5?1.-smoothstep(.82,.93,lum):1.;float a=t.a*k*uOp;if(a<.01)discard;gl_FragColor=vec4(t.rgb,a);}'});
 var plane=new T.Mesh(new T.PlaneGeometry(1,1),pmat);plane.position.z=.01;plane.visible=false;grp.add(plane);
 var sway={a:1};
 function cloud(){var p=A(),c=A();for(var i=0;i<N;i++){var th=Math.random()*6.283,ph=Math.acos(Math.random()*2-1),rr=.9+Math.random()*.25;p[i*3]=Math.sin(ph)*Math.cos(th)*rr;p[i*3+1]=Math.cos(ph)*rr*.9;p[i*3+2]=Math.sin(ph)*Math.sin(th)*rr*.4;c[i*3]=.85;c[i*3+1]=.3;c[i*3+2]=.28;}return {pos:p,col:c};}
 var eras=evs.map(function(){return cloud();});
 function fromImg(im,key){var w=200,h=Math.max(1,Math.round(w*im.naturalHeight/im.naturalWidth)),cv=document.createElement('canvas');cv.width=w;cv.height=h;var x=cv.getContext('2d');x.drawImage(im,0,0,w,h);var d=x.getImageData(0,0,w,h).data,ok=[];for(var y=0;y<h;y++)for(var xx=0;xx<w;xx++){var o=(y*w+xx)*4;if(d[o+3]<128)continue;if(key&&(d[o]+d[o+1]+d[o+2])/765>.9)continue;ok.push(o);}
  if(ok.length<50)throw new Error('empty');var p=A(),c=A(),s=2.5/Math.max(h,w*.75);for(var i=0;i<N;i++){var o2=ok[(Math.random()*ok.length)|0],pi=o2/4,px=pi%w,py=(pi/w)|0;p[i*3]=(px+.5-w/2)*s;p[i*3+1]=-(py+.5-h/2)*s;p[i*3+2]=0;c[i*3]=d[o2]/255;c[i*3+1]=d[o2+1]/255;c[i*3+2]=d[o2+2]/255;}
  var tex=new T.Texture(im);tex.needsUpdate=true;tex.minFilter=T.LinearFilter;tex.generateMipmaps=false;if(T.sRGBEncoding)tex.encoding=T.sRGBEncoding;return {pos:p,col:c,tex:tex,wh:[w*s,h*s],key:key};}
 function load(i){var u=urls[i];if(!u)return;var key=evs[i].getAttribute('data-key')==='1';
  var tryLoad=function(src){var im=new Image();im.crossOrigin='anonymous';im.onload=function(){try{eras[i]=fromImg(im,key);if(i===cur){var a=g.attributes;a.aTo.array.set(eras[i].pos);a.cTo.array.set(eras[i].col);a.aTo.needsUpdate=a.cTo.needsUpdate=true;if(U.uMix.value>=.999)P.settle();}}catch(e){LOG('sample failed',i,e.message);}};im.onerror=function(){LOG('img load failed',i);};im.src=src;};
  fetch(u,{mode:'cors'}).then(function(res){if(!res.ok)throw 0;return res.blob();}).then(function(b){tryLoad(URL.createObjectURL(b));}).catch(function(){tryLoad(u);});}
 urls.forEach(function(u,i){load(i);});
 var a0=g.attributes;['aTo','aFrom'].forEach(function(k){a0[k].array.set(eras[0].pos);});['cTo','cFrom'].forEach(function(k){a0[k].array.set(eras[0].col);});
 function size(){var w=holo.clientWidth,h=holo.clientHeight;if(!w||!h)return;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();grp.scale.setScalar(Math.min(1,w/h/.62));}
 size();addEventListener('resize',size);var vis=true;new IntersectionObserver(function(e){vis=e[0].isIntersecting;}).observe(holo);
 var t0=performance.now();(function loop(){requestAnimationFrame(loop);if(!vis)return;var t=(performance.now()-t0)/1000;U.uTime.value=t;grp.rotation.y=Math.sin(t*.25)*.18*sway.a;r.render(sc,cam);})();
 P={go:function(i){var a=g.attributes;a.aFrom.array.set(a.aTo.array);a.cFrom.array.set(a.cTo.array);a.aTo.array.set(eras[i].pos);a.cTo.array.set(eras[i].col);['aFrom','aTo','cFrom','cTo'].forEach(function(k){a[k].needsUpdate=true;});
   gsap.to(PU.uOp,{value:0,duration:.3,overwrite:true,onComplete:function(){if(PU.uOp.value<.01)plane.visible=false;}});
   gsap.to(U.uAlpha,{value:1,duration:.3,overwrite:true});gsap.to(sway,{a:1,duration:.4,overwrite:true});gsap.to(U.uDrift,{value:1,duration:.4,overwrite:true});
   gsap.fromTo(U.uMix,{value:0},{value:1,duration:RM?.01:1.4,ease:'power2.inOut',overwrite:true,onComplete:function(){if(cur===i)P.settle();}});},
  settle:function(){var e=eras[cur];gsap.to(sway,{a:0,duration:.6,ease:'power2.out',overwrite:true});gsap.to(grp.rotation,{y:0,duration:.6,ease:'power2.out',overwrite:true});gsap.to(U.uDrift,{value:0,duration:.6,overwrite:true});
   if(!e||!e.tex){gsap.to(U.uAlpha,{value:1,duration:.4,overwrite:true});return;}
   PU.map.value=e.tex;PU.uKey.value=e.key?1:0;plane.scale.set(e.wh[0],e.wh[1],1);plane.visible=true;
   gsap.fromTo(PU.uOp,{value:0},{value:1,duration:.8,ease:'power2.out',overwrite:true});gsap.to(U.uAlpha,{value:.1,duration:.8,ease:'power2.out',overwrite:true});}};
 LOG('particles ready');}catch(e){LOG('webgl failed',e.message);P=null;}}
function setEra(i){if(i===cur||i<0||i>=n)return;cur=i;var yh=reel&&reel.firstElementChild?reel.firstElementChild.offsetHeight:128;
 if(reel)gsap.to(reel,{y:-yh*i,duration:RM?0:.9,ease:IO,overwrite:true});
 if(idx)idx.textContent=String(i+1).padStart(2,'0');if(bar)gsap.to(bar,{scaleX:(i+1)/n,duration:.6,ease:E,overwrite:true});
 if(nm)nm.textContent=evs[i].getAttribute('data-name')||'';
 evs.forEach(function(e,j){gsap.to(e,{opacity:j===i?1:.28,duration:.5,overwrite:true});});
 if(P)P.go(i);else fbShow(i);}
function boot(){if(boot.d)return;boot.d=1;initP();setEra(0);ST.refresh();}
if(document.readyState==='complete')boot();else window.addEventListener('load',boot);setTimeout(boot,4000);
evs.forEach(function(e,i){ST.create({trigger:e,start:'top 55%',end:'bottom 55%',onToggle:function(s){if(s.isActive)setEra(i);}});});
if(tl&&fill)gsap.to(fill,{scaleY:1,ease:'none',scrollTrigger:{trigger:tl,start:'top top',end:'bottom bottom',scrub:true}});
function stageH(){if(!matchMedia('(max-width: 991px)').matches||!holo)return 0;var c=holo.closest('.hs-stage-col');return c?c.offsetHeight:0;}
function targetY(i){var r=evs[i].getBoundingClientRect(),st=stageH(),avail=innerHeight-st;return scrollY+r.top-st-Math.max(0,(avail-r.height)/2);}
function goTo(i){i=Math.max(0,Math.min(n-1,i));var y=targetY(i);if(window.__lenis)window.__lenis.scrollTo(y,{duration:1.05,lock:true});else scrollTo({top:y,behavior:'smooth'});}
var lock=0,acc=0,accT=0;
function inTL(){if(!tl)return false;var r=tl.getBoundingClientRect();return r.top<=2&&r.bottom>=innerHeight-2;}
window.addEventListener('wheel',function(e){if(!inTL())return;var dir=e.deltaY>0?1:-1,nx=cur+dir;if(nx<0||nx>=n)return;e.preventDefault();e.stopImmediatePropagation();var now=performance.now();if(now<lock)return;if(now-accT>200)acc=0;accT=now;acc+=Math.abs(e.deltaY);if(acc<24)return;acc=0;lock=now+1050;goTo(nx);},{passive:false,capture:true});
var col=q('events')[0];if(col&&matchMedia('(pointer: fine)').matches){var sy=null;col.addEventListener('pointerdown',function(e){if(e.button!==0||e.target.closest('a'))return;sy=e.clientY;col.style.cursor='grabbing';});window.addEventListener('pointerup',function(e){if(sy===null)return;var d=sy-e.clientY;sy=null;col.style.cursor='';if(Math.abs(d)>40)goTo(cur+(d>0?1:-1));});}
window.addEventListener('keydown',function(e){if(!inTL())return;if(e.key==='ArrowDown'||e.key==='PageDown'){e.preventDefault();goTo(cur+1);}if(e.key==='ArrowUp'||e.key==='PageUp'){e.preventDefault();goTo(cur-1);}});
if(RM)return;
var ht=gsap.timeline({defaults:{ease:E}});ht.from(q('nav'),{yPercent:-100,duration:1.1},0);var t1=q('heroTitle')[0];if(t1)ht.from(q('line',t1),{yPercent:118,duration:1.4,stagger:.09},.3);ht.from(q('corner'),{scale:0,transformOrigin:'top left',duration:1.1},1);
q('split').forEach(function(h){gsap.from(q('line',h),{yPercent:118,duration:1.3,stagger:.09,ease:E,scrollTrigger:{trigger:h,start:'top 86%'}});});
function reveal(k,f){var els=q(k);if(!els.length)return;gsap.set(els,f);ST.batch(els,{start:'top 92%',once:true,onEnter:function(b){gsap.to(b,{y:0,autoAlpha:1,duration:1.1,stagger:.08,ease:E});}});}
reveal('rise',{y:36,autoAlpha:0});reveal('row',{y:24,autoAlpha:0});
document.querySelectorAll('[data-mag]').forEach(function(el){var xT=gsap.quickTo(el,'x',{duration:.6,ease:'power3'}),yT=gsap.quickTo(el,'y',{duration:.6,ease:'power3'});el.addEventListener('mousemove',function(e){var b=el.getBoundingClientRect();xT((e.clientX-b.left-b.width/2)*.3);yT((e.clientY-b.top-b.height/2)*.4);});el.addEventListener('mouseleave',function(){xT(0);yT(0);});});
if(matchMedia('(pointer: fine)').matches){var c=document.createElement('div');c.style.cssText='position:fixed;left:0;top:0;width:10px;height:10px;margin:-5px 0 0 -5px;background:#a0302e;border:1px solid #a0302e;border-radius:50%;box-sizing:border-box;pointer-events:none;z-index:9999;opacity:0';document.body.appendChild(c);var cx=gsap.quickTo(c,'x',{duration:.45,ease:'power3'}),cy=gsap.quickTo(c,'y',{duration:.45,ease:'power3'}),big=false;window.addEventListener('mousemove',function(e){cx(e.clientX);cy(e.clientY);c.style.opacity=1;var hit=!!(e.target.closest&&e.target.closest('a,button,[role=button]'));if(hit!==big){big=hit;gsap.to(c,{width:hit?52:10,height:hit?52:10,margin:hit?'-26px 0 0 -26px':'-5px 0 0 -5px',backgroundColor:hit?'rgba(160,48,46,0)':'rgba(160,48,46,1)',duration:.45,ease:E});}});document.addEventListener('mouseleave',function(){c.style.opacity=0;});}
})();