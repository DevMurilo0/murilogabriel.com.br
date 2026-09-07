import { projects, stack, contacts } from './data.js';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer:fine)').matches;

const previewTemplate = project => {
  const destination = project.live || project.repository;
  const poster = `<img class="project-poster" src="${project.preview.poster}" alt="${project.preview.alt}" loading="lazy">`;
  const livePreview = project.preview.kind === 'live' && project.live
    ? `<iframe class="project-frame" src="${project.live}" title="Prévia de ${project.title}" loading="lazy" tabindex="-1" aria-hidden="true"></iframe>`
    : '';

  return `
    <a class="project-media" href="${destination}" target="_blank" rel="noopener" data-cursor="ABRIR" aria-label="${project.live ? `Visitar ${project.title}` : `Ver repositório de ${project.title}`}" data-project-media>
      ${poster}
      ${livePreview}
      <span class="project-media__veil"></span>
      <span class="project-media__label">${project.live ? 'LIVE PREVIEW' : 'PROJECT IMAGE'}</span>
      <span class="project-media__action">ABRIR <b>↗</b></span>
    </a>`;
};

const projectTemplate = (project, index) => `
  <article class="project project--${index % 2 ? 'reverse' : 'forward'} reveal" id="${project.slug}">
    <div class="project-heading">
      <div class="project-meta"><span>${project.number}</span><span>${project.type}</span><span>${project.year}</span></div>
      <h3>${project.title}</h3>
    </div>
    ${previewTemplate(project)}
    <div class="project-copy">
      <p class="project-description">${project.description}</p>
      <div class="project-objective"><span>OBJETIVO</span><p>${project.objective}</p></div>
      <ul class="tech-list" aria-label="Tecnologias utilizadas">${project.technologies.map(item => `<li>${item}</li>`).join('')}</ul>
      <div class="project-links">
        ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener">Visitar projeto <span>↗</span></a>` : ''}
        <a href="${project.repository}" target="_blank" rel="noopener">Ver código <span>↗</span></a>
      </div>
    </div>
  </article>`;

$('[data-projects]').innerHTML = projects.map(projectTemplate).join('');
$('[data-stack]').innerHTML = stack.map((group, index) => `
  <div class="stack-group reveal">
    <span>0${index + 1}</span>
    <h3>${group.category}</h3>
    <ul>${group.items.map(item => `<li>${item}</li>`).join('')}</ul>
  </div>`).join('');

$('[data-contacts]').innerHTML = contacts.map(contact => `
  <div class="contact-link-wrap reveal">
    <a class="contact-link" href="${contact.href}" ${contact.external ? 'target="_blank" rel="noopener"' : ''} data-cursor="${contact.label.toUpperCase()}">
      <span>${contact.label}</span><strong>${contact.value}</strong><b>↗</b>
    </a>
    ${contact.copy ? `<button class="copy-button" type="button" data-copy="${contact.value}" aria-label="Copiar e-mail">COPIAR</button>` : ''}
  </div>`).join('');

$('[data-year]').textContent = new Date().getFullYear();

const header = $('[data-header]');
const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 24);
onScroll();
addEventListener('scroll', onScroll, { passive: true });

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
  if (open) closeMenu();
  else {
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
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
  $$('.reveal').forEach(el => observer.observe(el));
} else {
  $$('.reveal').forEach(el => el.classList.add('is-visible'));
}

const hero = $('[data-hero]');
if (hero && finePointer && !reducedMotion) {
  hero.addEventListener('pointermove', event => {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    hero.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }, { passive: true });
}

if (finePointer) {
  const cursor = $('.cursor');
  let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
  addEventListener('pointermove', event => {
    tx = event.clientX;
    ty = event.clientY;
    cursor.classList.add('is-active');
  }, { passive: true });

  const animateCursor = () => {
    x += (tx - x) * .22;
    y += (ty - y) * .22;
    cursor.style.transform = `translate3d(${x}px,${y}px,0)`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  $$('a,button,[data-cursor]').forEach(el => {
    el.addEventListener('pointerenter', () => {
      cursor.classList.add('is-hover');
      cursor.dataset.label = el.dataset.cursor || '';
    });
    el.addEventListener('pointerleave', () => {
      cursor.classList.remove('is-hover');
      cursor.dataset.label = '';
    });
  });

  if (!reducedMotion) {
    $$('[data-magnetic]').forEach(el => {
      el.addEventListener('pointermove', event => {
        const rect = el.getBoundingClientRect();
        const dx = event.clientX - rect.left - rect.width / 2;
        const dy = event.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate3d(${dx * .07}px,${dy * .09}px,0)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }
}

$$('.copy-button').forEach(button => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      const original = button.textContent;
      button.textContent = 'COPIADO';
      setTimeout(() => { button.textContent = original; }, 1400);
    } catch {
      window.location.href = `mailto:${button.dataset.copy}`;
    }
  });
});
