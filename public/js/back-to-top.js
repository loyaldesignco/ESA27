document.addEventListener('DOMContentLoaded',function(){
var b=document.createElement('a');b.href='#';b.className='hm-top';b.setAttribute('aria-label','Back to top');b.innerHTML='<span class="hm-top-arrow"></span><span class="hm-top-t">Top</span>';document.body.appendChild(b);
function upd(){b.classList.toggle('is-shown',scrollY>innerHeight*.8);}
addEventListener('scroll',upd,{passive:true});upd();
b.addEventListener('click',function(e){e.preventDefault();if(window.__lenis)window.__lenis.scrollTo(0,{duration:1.4});else scrollTo({top:0,behavior:'smooth'});var h=document.querySelector('h1');if(h){h.setAttribute('tabindex','-1');setTimeout(function(){h.focus({preventScroll:true});},900);}});
});