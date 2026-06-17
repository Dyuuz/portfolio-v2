// Cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;

document.addEventListener('mousemove', e => {
    mx=e.clientX; my=e.clientY;
    cursor.style.left=mx+'px'; cursor.style.top=my+'px';
});

(function animRing(){
rx+=(mx-rx)*0.14; ry+=(my-ry)*0.14;
ring.style.left=rx+'px'; ring.style.top=ry+'px';
requestAnimationFrame(animRing);
})();

document.querySelectorAll('a,.project-card,.skill-card,.service-card,.testi-card,.founder-stat,.contact-item').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ cursor.style.width='22px'; cursor.style.height='22px'; ring.style.width='60px'; ring.style.height='60px'; });
    el.addEventListener('mouseleave',()=>{ cursor.style.width='12px'; cursor.style.height='12px'; ring.style.width='36px'; ring.style.height='36px'; });
});

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
