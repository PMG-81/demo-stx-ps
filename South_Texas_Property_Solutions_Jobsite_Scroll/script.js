const header=document.getElementById('header');
const toggle=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('.mobile-nav');
toggle.addEventListener('click',()=>{const open=mobileNav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');document.body.classList.toggle('menu-open',open)});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileNav.classList.remove('open');document.body.classList.remove('menu-open');toggle.setAttribute('aria-expanded','false')}));
const story=document.querySelector('.scroll-story');
const stage=document.querySelector('.story-sticky');
const fill=document.getElementById('scrollFill');
const num=document.getElementById('stageNumber');
const title=document.getElementById('stageTitle');
const desc=document.getElementById('stageDesc');
const headlines=[['FROM<br>OVERGROWN.','TO OPEN<br>POSSIBILITIES.'],['THE WORK<br>GETS DONE.','ONE PASS<br>AT A TIME.'],['LAND<br>CLEARED.','READY FOR<br>WHAT’S NEXT.']];
const chapters=[['01 / 03','THE STARTING POINT','Overgrown property'],['02 / 03','EQUIPMENT AT WORK','Clearing and site preparation'],['03 / 03','THE FINISHED STAGE','Open, usable space']];
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
let lastChapter=-1, queued=false;
function render(){queued=false;const length=Math.max(1,story.offsetHeight-window.innerHeight);const p=clamp(-story.getBoundingClientRect().top/length,0,1);
  // Crossfades represent stages using demonstration photos; not continuous footage.
  const b=smooth(.20,.43,p),c=smooth(.56,.79,p);
  stage.style.setProperty('--progress',p.toFixed(4));stage.style.setProperty('--stage1',(1-b).toFixed(4));stage.style.setProperty('--stage2',(b*(1-c)).toFixed(4));stage.style.setProperty('--stage3',c.toFixed(4));
  fill.style.width=(p*100).toFixed(1)+'%';
  const ch=p<.33?0:p<.68?1:2;
  if(ch!==lastChapter){lastChapter=ch;num.textContent=chapters[ch][0];title.textContent=chapters[ch][1];desc.textContent=chapters[ch][2];document.getElementById('headlineOne').innerHTML=headlines[ch][0];document.getElementById('headlineTwo').innerHTML=headlines[ch][1];}
  header.classList.toggle('scrolled',window.scrollY>50);
}
function request(){if(!queued){queued=true;requestAnimationFrame(render)}}
window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request);render();
const form=document.getElementById('inquiryForm');form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const name=document.getElementById('name').value.trim(),service=document.getElementById('service').value,message=document.getElementById('message').value.trim();const text=`Hi, my name is ${name}. I'm interested in ${service.toLowerCase()}.${message?' Project details: '+message:''}`;window.location.href='sms:+19562644884?body='+encodeURIComponent(text)});
document.getElementById('year').textContent=new Date().getFullYear();
