const data=window.PORTFOLIO;
const root=document.querySelector('#projects');
function el(tag,text,cls){const node=document.createElement(tag);if(text)node.textContent=text;if(cls)node.className=cls;return node;}
function render(filter='All'){root.replaceChildren();data.projects.filter(p=>filter==='All'||p.category===filter).forEach(p=>{const card=el('article',null,'project'+(p.actual?' featured':''));const fig=el('figure');const img=el('img');img.src=p.image;img.alt=p.actual?'Egyptian Cars AI application screenshot':'Concept illustration for '+p.title;img.loading='lazy';fig.append(img);if(p.actual)fig.append(el('figcaption','ACTUAL PROJECT SCREENSHOT'));const copy=el('div',null,'project-copy');copy.append(el('span',p.label,'project-label'),el('h3',p.title),el('p',p.description));const tags=el('div',null,'tags');p.tags.forEach(t=>tags.append(el('span',t)));copy.append(tags);card.append(fig,copy);root.append(card);});}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});render(b.dataset.filter);}));
document.querySelector('#year').textContent=new Date().getFullYear();document.querySelector('#email').textContent=data.email+' ↗';document.querySelector('#email').href='mailto:'+data.email;render();

