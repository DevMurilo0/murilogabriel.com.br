import { projects, stack } from './data.js';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const projectVisual = (project) => `
  <div class="project-art project-art--${project.visual.variant}" aria-hidden="true">
    <div class="art-top"><span>${project.visual.label}</span><span>0${project.number.replace('0', '')} / 03</span></div>
    <div class="art-${project.visual.variant}">
      ${project.visual.variant === 'editorial' ? '<span class="sun"></span><span class="trail"></span><em>ENTRE</em><strong>TEMPOS</strong>' : ''}
      ${project.visual.variant === 'portal' ? '<span class="portal-mark">E</span><div class="portal-lines"><i></i><i></i><i></i></div><strong>EREMPAF</strong>' : ''}
      ${project.visual.variant === 'planner' ? '<div class="planner-date"><span>ENEM</span><b>PLANNER</b></div><div class="planner-grid">' + '<i></i>'.repeat(12) + '</div>' : ''}
    </div>
    <p>${project.visual.caption}</p>
  </div>`;

const projectTemplate = (project) => `
  <article class="project reveal" id="${project.slug}">
    <a class="project-visual" href="${project.live || project.repository}" target="_blank" rel="noopener" data-cursor="ver" aria-label="${project.live ? `Visitar ${project.title}` : `Ver código de ${project.title}`}">
      ${projectVisual(project)}
    </a>
    <div class="project-info">
      <div class="project-meta"><span>${project.number}</span><span>${project.type}</span></div>
      <h3>${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <div class="project-detail"><span>OBJETIVO</span><p>${project.objective}</p></div>
      <ul class="feature-list">${project.features.map(item => `<li>${item}</li>`).join('')}</ul>
      <ul class="tech-list" aria-label="Tecnologias">${project.technologies.map(item => `<li>${item}</li>`).join('')}</ul>
      <div class="project-links">
        ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener">Visitar projeto <span>↗</span></a>` : ''}
        <a href="${project.repository}" target="_blank" rel="noopener">Ver código <span>↗</span></a>
      </div>
    </div>
  </article>`;

$('[data-projects]').innerHTML = projects.map(projectTemplate).join('');
$('[data-stack]').innerHTML = stack.map((group, index) => `
  <div class="stack-group reveal"><span>0${index + 1}</span><h3>${group.category}</h3><ul>${group.items.map(item => `<li>${item}</li>`).join('')}</ul></div>
`).join('');
$('[data-year]').textContent = new Date().getFullYear();

const header = $('[data-header]');
const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 24);
onScroll(); addEventListener('scroll', onScroll, { passive: true });

const toggle = $('.menu-toggle');
const menu = $('.mobile-menu');
const closeMenu = () => {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menu');
  menu.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
};
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  if (open) closeMenu(); else {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
    menu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
  }
});
$$('.mobile-menu a').forEach(link => link.addEventListener('click', closeMenu));
addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.13, rootMargin: '0px 0px -7% 0px' });
  $$('.reveal').forEach(el => observer.observe(el));
} else $$('.reveal').forEach(el => el.classList.add('is-visible'));

if (matchMedia('(pointer:fine)').matches) {
  const cursor = $('.cursor');
  let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
  addEventListener('pointermove', event => { tx = event.clientX; ty = event.clientY; cursor.classList.add('is-active'); });
  const tick = () => { cx += (tx - cx) * .18; cy += (ty - cy) * .18; cursor.style.transform = `translate3d(${cx}px,${cy}px,0)`; requestAnimationFrame(tick); }; tick();
  $$('a,button,[data-cursor]').forEach(el => {
    el.addEventListener('pointerenter', () => { cursor.classList.add('is-hover'); cursor.dataset.label = el.dataset.cursor === 'ver' ? 'VER' : ''; });
    el.addEventListener('pointerleave', () => { cursor.classList.remove('is-hover'); cursor.dataset.label = ''; });
  });
  if (!reducedMotion) $$('[data-magnetic]').forEach(el => {
    el.addEventListener('pointermove', event => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(event.clientX-r.left-r.width/2)*.08}px,${(event.clientY-r.top-r.height/2)*.1}px)`; });
    el.addEventListener('pointerleave', () => el.style.transform = '');
  });
}

const canvas = $('[data-field]');
if (canvas && !reducedMotion) {
  const ctx = canvas.getContext('2d', { alpha: true });
  let width, height, dpr, points = [], columns = 0, mx = .68, my = .35, frame;
  const resize = () => {
    dpr = Math.min(devicePixelRatio, 1.5); width = canvas.clientWidth; height = canvas.clientHeight;
    canvas.width = width * dpr; canvas.height = height * dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    const gap = width < 600 ? 84 : 92; points = []; columns = Math.floor(width / gap);
    for (let y = gap/2; y < height; y += gap) for (let column = 0; column < columns; column++) { const x = gap/2 + column*gap; points.push({ x, y, ox: x, oy: y }); }
  };
  const draw = time => {
    ctx.clearRect(0,0,width,height); const px=mx*width, py=my*height;
    points.forEach((p,i) => { const dx=px-p.ox, dy=py-p.oy, dist=Math.hypot(dx,dy), influence=Math.max(0,1-dist/300); p.x=p.ox-dx*influence*.018+Math.sin(time*.00025+i)*1.6; p.y=p.oy-dy*influence*.018+Math.cos(time*.00022+i)*1.6; });
    ctx.lineWidth=.55;
    points.forEach((p,i) => { const right=points[i+1], below=points[i+columns]; ctx.strokeStyle='rgba(133,142,180,.095)'; if(right && Math.abs(right.oy-p.oy)<2){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(right.x,right.y);ctx.stroke();} if(below){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(below.x,below.y);ctx.stroke();} ctx.fillStyle='rgba(188,193,220,.20)';ctx.fillRect(p.x-1,p.y-1,2,2); });
    frame=requestAnimationFrame(draw);
  };
  addEventListener('pointermove', e => { mx=e.clientX/innerWidth; my=e.clientY/innerHeight; }, { passive:true });
  addEventListener('resize', resize, { passive:true }); resize(); frame=requestAnimationFrame(draw);
  document.addEventListener('visibilitychange', () => { if(document.hidden) cancelAnimationFrame(frame); else frame=requestAnimationFrame(draw); });
}
