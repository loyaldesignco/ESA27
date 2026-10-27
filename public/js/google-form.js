/* Contact form -> Google Form. Field ids come from Sanity (Site settings → Booking form). */
(function(){
var CFG=(window.__ESA&&window.__ESA.form)||{};var GF=CFG.actionUrl||'';
var CLASS_MAP=CFG.classMap||{};
document.addEventListener('DOMContentLoaded',function(){
var wrap=document.querySelector('.vu-form');if(!wrap)return;var form=wrap.querySelector('form');if(!form)return;
form.setAttribute('action','');form.setAttribute('method','post');
form.addEventListener('submit',function(e){
e.preventDefault();e.stopImmediatePropagation();
if(!form.checkValidity()){form.reportValidity();return;}
var name=(form.querySelector('#vu-name')||{}).value||'',email=(form.querySelector('#vu-email')||{}).value||'',phone=(form.querySelector('#vu-phone')||{}).value||'';
var cls='',chk=form.querySelector('input[type=radio]:checked');if(chk){var lab=chk.closest('label'),t=lab&&lab.querySelector('.vu-opt-t');cls=t?t.textContent.trim():chk.value;cls=CLASS_MAP[cls]||cls;}
var fd=new FormData();if(CFG.emailField)fd.append(CFG.emailField,email);if(CFG.nameField)fd.append(CFG.nameField,name);if(CFG.phoneField)fd.append(CFG.phoneField,phone);if(cls&&CFG.classField)fd.append(CFG.classField,cls);
var btn=form.querySelector('input[type=submit],button[type=submit]');if(btn){btn.disabled=true;}
fetch(GF,{method:'POST',mode:'no-cors',body:fd}).then(function(){form.style.display='none';var ok=wrap.querySelector('.w-form-done');if(ok){ok.style.display='block';}}).catch(function(){var er=wrap.querySelector('.w-form-fail');if(er)er.style.display='block';if(btn)btn.disabled=false;});
},true);
});
})();