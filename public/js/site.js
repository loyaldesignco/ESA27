(function(){
function dd(){document.querySelectorAll('[data-dd]').forEach(function(w){var t=w.querySelector('[data-dd-toggle]'),m=w.querySelector('[data-dd-menu]');if(!t||!m||w._dd)return;w._dd=1;var hide;
function open(){clearTimeout(hide);m.classList.add('is-open');t.setAttribute('aria-expanded','true');}
function close(){hide=setTimeout(function(){m.classList.remove('is-open');t.setAttribute('aria-expanded','false');},140);}
w.addEventListener('mouseenter',open);w.addEventListener('mouseleave',close);
t.addEventListener('click',function(e){e.preventDefault();m.classList.contains('is-open')?(m.classList.remove('is-open'),t.setAttribute('aria-expanded','false')):open();});
t.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open();var f=m.querySelector('a');if(f)f.focus();}if(e.key==='Escape'){m.classList.remove('is-open');t.focus();}});
w.addEventListener('focusout',function(){setTimeout(function(){if(!w.contains(document.activeElement))m.classList.remove('is-open');},0);});
document.addEventListener('click',function(e){if(!w.contains(e.target))m.classList.remove('is-open');});});}
function mnav(){var bar=document.querySelector('.is-nav');if(!bar||document.querySelector('.hm-burger'))return;
var logo=bar.querySelector('img'),logoSrc=logo?logo.getAttribute('src'):'',white='/images/logotype-white.svg',SITE=(window.__ESA&&window.__ESA.site)||{};
var items=[['Adults','/adult-classes','Train'],['Kids','/kids-classes','Train'],['Schedule','/schedule','Train'],['History','/history','About'],['Instructors','/instructors','About'],['Black belts','/black-belts','About'],['Contact','/visit-us','Visit']];
var path=location.pathname.replace(/\/$/,'');
var b=document.createElement('div');b.className='hm-burger';b.setAttribute('role','button');b.setAttribute('tabindex','0');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Open menu');
b.innerHTML='<span class="hm-burger-word">Menu</span><span class="hm-burger-box"><span class="hm-burger-line" style="transform:translateY(-5px)"></span><span class="hm-burger-line" style="transform:translateY(3px)"></span></span>';
bar.appendChild(b);
var p=document.createElement('div');p.className='hm-mnav';p.setAttribute('data-lenis-prevent','1');p.setAttribute('aria-hidden','true');p.style.clipPath='inset(0 0 100% 0)';p.style.pointerEvents='none';
p.innerHTML='<div class="hm-mnav-head"><span>Menu</span><span>Baldwin, NY \u00b7 Since 2003</span></div><nav>'+items.map(function(it,i){var on=path===it[1];return '<a class="hm-mnav-item" href="'+it[1]+'"'+(on?' style="color:#d9413e"':'')+'><span class="hm-mnav-n">'+String(i+1).padStart(2,'0')+'</span><span class="hm-mnav-mask"><span class="hm-mnav-label" style="transform:translateY(110%);transition:transform .8s cubic-bezier(.16,1,.3,1)">'+it[0]+'</span></span><span class="hm-mnav-g">'+it[2]+'</span></a>';}).join('')+'</nav><div class="hm-mnav-foot" style="opacity:0;transform:translateY(24px);transition:opacity .6s .45s,transform .8s cubic-bezier(.16,1,.3,1) .45s"><a class="hm-mnav-cta" href="/visit-us"><span>Book a free class</span><span>\u2192</span></a><a class="hm-mnav-call" href="tel:'+(SITE.phoneDial||'')+'"><span>Call '+(SITE.phone||'')+'</span><span>\u2192</span></a><div class="hm-mnav-addr"><span>'+(SITE.street||'')+'<br>'+(SITE.cityLine||'')+'</span><span style="text-align:right">Entrance and<br>parking in rear</span></div></div>';
document.body.appendChild(p);
var nav=bar.closest('.hm-nav')||bar.parentElement,open=false,lines=b.querySelectorAll('.hm-burger-line'),labels=p.querySelectorAll('.hm-mnav-label'),foot=p.querySelector('.hm-mnav-foot'),word=b.querySelector('.hm-burger-word');
function pin(v){var h=nav.offsetHeight;nav.style.position=v?'fixed':'';nav.style.top=v?'0':'';nav.style.left=v?'0':'';nav.style.right=v?'0':'';nav.style.width=v?'100%':'';document.body.style.paddingTop=v?h+'px':'';}
function set(v){open=v;if(v)pin(true);p.style.clipPath=v?'inset(0 0 0% 0)':'inset(0 0 100% 0)';p.style.pointerEvents=v?'auto':'none';p.setAttribute('aria-hidden',v?'false':'true');b.setAttribute('aria-expanded',v?'true':'false');b.setAttribute('aria-label',v?'Close menu':'Open menu');word.textContent=v?'Close':'Menu';b.style.color=v?'#fff':'';
lines[0].style.transform=v?'translateY(-50%) rotate(45deg)':'translateY(-5px)';lines[1].style.transform=v?'translateY(-50%) rotate(-45deg)':'translateY(3px)';
nav.style.transition='background-color .45s,border-color .45s';nav.style.backgroundColor=v?'#000':'';nav.style.borderBottomColor=v?'rgba(252,251,250,.14)':'';if(logo)logo.setAttribute('src',v?white:logoSrc);
labels.forEach(function(l,i){l.style.transitionDelay=v?(0.18+i*0.05)+'s':'0s';l.style.transform=v?'translateY(0)':'translateY(110%)';});foot.style.opacity=v?1:0;foot.style.transform=v?'translateY(0)':'translateY(24px)';
var ln=window.__lenis;if(ln&&typeof ln==='object'){v?ln.stop():ln.start();}document.documentElement.style.overflow=v?'hidden':'';
if(!v){clearTimeout(nav._t);nav._t=setTimeout(function(){if(!open)pin(false);},800);}}
b.addEventListener('click',function(){set(!open);});b.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();set(!open);}});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&open){set(false);b.focus();}});
p.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){set(false);});});
window.addEventListener('resize',function(){if(open&&window.innerWidth>=992)set(false);});}
function smooth(){if(!window.Lenis||window.__lenis||matchMedia('(prefers-reduced-motion: reduce)').matches)return;var l=new Lenis({duration:1.15,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t));},smoothWheel:true});window.__lenis=l;
if(window.gsap&&window.ScrollTrigger){l.on('scroll',ScrollTrigger.update);gsap.ticker.add(function(t){l.raf(t*1000);});gsap.ticker.lagSmoothing(0);}else{(function r(t){l.raf(t);requestAnimationFrame(r);})(performance.now());}}
function init(){dd();mnav();}
if(document.readyState!=='loading'){init();}else document.addEventListener('DOMContentLoaded',init);
window.addEventListener('load',smooth);
})();