// Typing
const phrases=['Backend & Data Engineer_','API Systems Engineer_','Solutions Architect_','Pipeline Builder_','Automation Engineer_',];
let pi=0,ci=0,deleting=false;
const typedEl=document.getElementById('typed-text');
function type(){
const cur=phrases[pi];

if(!deleting){ typedEl.textContent=cur.slice(0,++ci); if(ci===cur.length){deleting=true;setTimeout(type,1600);return;} }
else { typedEl.textContent=cur.slice(0,--ci); if(ci===0){deleting=false;pi=(pi+1)%phrases.length;} }
setTimeout(type,deleting?45:80);
}
type();

// Scroll reveal
const obs=new IntersectionObserver(entries=>{
entries.forEach((e,i)=>{ if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),i*70);obs.unobserve(e.target);} });
},{threshold:0.08});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
