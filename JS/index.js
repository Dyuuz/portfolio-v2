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
const phrases=['Backend & Data Engineer_','API Systems Engineer_','Solutions Architect__','Pipeline Builder_','Automation Engineer_',];
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

// Animate founder stats on scroll
function animateCount(el, target, decimals=0, suffix=''){
let start=0; const dur=1800; const step=16;
const inc=target/(dur/step);
const timer=setInterval(()=>{
    start=Math.min(start+inc,target);
    el.textContent=(decimals?start.toFixed(1):Math.floor(start))+suffix;
    if(start>=target) clearInterval(timer);
},step);
}
const founderObs=new IntersectionObserver(entries=>{
entries.forEach(e=>{
    if(e.isIntersecting){
    document.querySelectorAll('.founder-stat-num').forEach(el=>{
        const txt=el.textContent;
        if(txt.includes('2')&&txt.includes('+')){
        el.innerHTML='<span id="c1">0</span><span class="founder-stat-unit">+</span>';
        animateCount(document.getElementById('c1'),2);
        } else if(txt.includes('4.5')){
        el.innerHTML='<span id="c2">0.0</span><span class="founder-stat-unit">★</span>';
        animateCount(document.getElementById('c2'),4.5,1);
        } else if(txt.includes('8')){
        el.innerHTML='<span id="c3">0</span><span class="founder-stat-unit">+</span>';
        animateCount(document.getElementById('c3'),8);
        }
    });
    founderObs.disconnect();
    }
});
},{threshold:0.3});
const banner=document.querySelector('.founder-banner');
if(banner) founderObs.observe(banner);