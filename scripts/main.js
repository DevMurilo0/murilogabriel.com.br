import { projects, stack, contacts } from './data.js';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer:fine)').matches;

const icons = {
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .4 5.2.4 11.7c0 2.1.5 4.1 1.6 5.9L.3 24l6.6-1.7a11.7 11.7 0 0 0 5.2 1.2h.1c6.5 0 11.8-5.2 11.8-11.7 0-3.1-1.2-6-3.5-8.3Zm-8.4 18a9.7 9.7 0 0 1-4.9-1.3l-.4-.2-3.9 1 1-3.8-.3-.4A9.7 9.7 0 1 1 12.1 21.5Zm5.3-7.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-1.7-.8-2.9-1.5-4-3.4-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.6l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.2.9 3 .9 4 .7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.1-.2-.4-.3-.7-.4Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5h18v13H3z"/><path d="m4 7 8 6 8-6"/></svg>',
  github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.3-2.3-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.6 4.9.4.3.7.9.7 1.8V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" class="fill"/></svg>'
};

const stackIcons = {
  html: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h16l-1.5 17L12 22l-6.5-2L4 3Z"/><path d="M8 7h8M8.5 11H15M9 15h5"/></svg>',
  css: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h16l-1.5 17L12 22l-6.5-2L4 3Z"/><path d="M8 7h8M9 11h6M9.5 15H14"/></svg>',
  javascript: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M10 8v7.2c0 1.4-.8 2.3-2.2 2.3-.9 0-1.7-.3-2.3-.8M14.3 14.8c.5 1.1 1.4 1.8 2.8 1.8 1.2 0 2.1-.6 2.1-1.6 0-1.1-.8-1.5-2.3-2.1-1.4-.6-2.4-1.2-2.4-2.8 0-1.4 1.1-2.5 2.8-2.5 1.2 0 2.1.4 2.8 1.5"/></svg>',
  responsividade: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="13" height="10" rx="1.7"/><path d="M8 19h2M4 19h2M18 8h3.5v9H18a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/></svg>',
  animação: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v4M12 17v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M3 12h4M17 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/><circle cx="12" cy="12" r="3.5"/></svg>',
  webgl: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></svg>',
  supabase: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.8 3.5c.4-.5 1.2-.2 1.2.5v10.6c0 .2 0 .4-.1.6l-4.4 5.6c-.4.5-1.2.2-1.2-.5V9.7c0-.2 0-.4.1-.6l4.4-5.6Z"/><path d="M9.2 7.8c-.4-.5-1.2-.2-1.2.5v10.6c0 .7.9 1 1.3.4l1.9-2.6V8.7c0-.3-.1-.6-.3-.9L9.2 7.8Z"/></svg>',
  firebase: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.2 2.5 6.8 12.4l1.8 8.9 8.6-4.8 1.7-10.4-2.4-4.1c-.3-.5-1-.5-1.3 0l-2.1 3.8-1-1.9c-.2-.4-.7-.5-1-.1Z"/><path d="M8.6 21.3 12 9.4l5.2 7.1"/></svg>',
  git: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 9 9-9 9-9-9 9-9Z"/><path d="M9 9.5a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4Zm6 2.6a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM10.4 11l3.2 3.2M10.4 11V7.5"/></svg>',
  default: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8"/></svg>'
};

const stackIconFor = item => stackIcons[item.toLowerCase()] || stackIcons.default;

const previewVars = preview => {
  const vars = [];
  if (preview.posterPosition) vars.push(`--poster-position:${preview.posterPosition}`);
  if (preview.frameOffsetX) vars.push(`--frame-offset-x:${preview.frameOffsetX}`);
  if (preview.frameOffsetY) vars.push(`--frame-offset-y:${preview.frameOffsetY}`);
  return vars.join(';');
};

const previewTemplate = project => {
  const destination = project.live || project.repository;
  const mediaStyle = previewVars(project.preview);
  const poster = `<img class="project-poster ${project.preview.color ? 'project-poster--color' : ''}" src="${project.preview.poster}" alt="${project.preview.alt}" loading="lazy">`;
  const livePreview = project.preview.kind === 'live' && project.live
    ? `<iframe class="project-frame" src="${project.live}" title="Prévia de ${project.title}" loading="lazy" tabindex="-1" aria-hidden="true"></iframe>`
    : '';

  return `
    <a class="project-media" ${mediaStyle ? `style="${mediaStyle}"` : ''} href="${destination}" target="_blank" rel="noopener" data-cursor="ABRIR" aria-label="${project.live ? `Visitar ${project.title}` : `Ver repositório de ${project.title}`}">
      ${poster}
      ${livePreview}
      <span class="project-media__veil"></span>
      <span class="project-media__label">${project.preview.kind === 'live' ? 'LIVE PREVIEW' : 'PROJECT IMAGE'}</span>
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

const compactProjectTemplate = project => {
  const mediaStyle = previewVars(project.preview);
  return `
    <article class="project-card reveal">
      <a class="project-card__media ${project.preview.fit === 'contain' ? 'project-card__media--contain' : ''} ${project.preview.color ? 'project-card__media--color' : ''}" ${mediaStyle ? `style="${mediaStyle}"` : ''} href="${project.live || project.repository}" target="_blank" rel="noopener" data-cursor="ABRIR" aria-label="${project.live ? `Visitar ${project.title}` : `Ver repositório de ${project.title}`}">
        <img src="${project.preview.poster}" alt="${project.preview.alt}" loading="lazy">
        <span>${project.number}</span>
        <b>↗</b>
      </a>
      <div class="project-card__body">
        <div class="project-card__meta"><span>${project.type}</span><span>${project.year}</span></div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <ul class="tech-list" aria-label="Tecnologias utilizadas">${project.technologies.map(item => `<li>${item}</li>`).join('')}</ul>
        <div class="project-links">
          ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener">Visitar <span>↗</span></a>` : ''}
          <a href="${project.repository}" target="_blank" rel="noopener">GitHub <span>↗</span></a>
        </div>
      </div>
    </article>`;
};

const featuredProjects = projects.filter(project => project.featured);
const moreProjects = projects.filter(project => !project.featured);

$('[data-projects-featured]').innerHTML = featuredProjects.map(projectTemplate).join('');
$('[data-projects-more]').innerHTML = moreProjects.map(compactProjectTemplate).join('');
$('[data-project-count]').textContent = String(projects.length).padStart(2, '0');

$('[data-stack]').innerHTML = stack.map((group, index) => `
  <div class="stack-group reveal">
    <span>0${index + 1}</span>
    <h3>${group.category}</h3>
    <ul>${group.items.map(item => `<li><span class="stack-item__icon">${stackIconFor(item)}</span><span>${item}</span></li>`).join('')}</ul>
  </div>`).join('');

$('[data-contacts]').innerHTML = contacts.map(contact => `
  <div class="contact-link-wrap reveal ${contact.primary ? 'is-primary' : ''}">
    <a class="contact-link" href="${contact.href}" ${contact.external ? 'target="_blank" rel="noopener"' : ''} data-cursor="${contact.label.toUpperCase()}" aria-label="${contact.label === 'WhatsApp' ? 'Falar com Murilo pelo WhatsApp' : contact.label}">
      <span class="contact-icon">${icons[contact.icon] || ''}</span>
      <span class="contact-label">${contact.label}</span>
      <strong>${contact.value}</strong>
      <b>↗</b>
    </a>
    ${contact.copy ? `<button class="copy-button" type="button" data-copy="${contact.value}" aria-label="Copiar e-mail">COPIAR</button>` : ''}
  </div>`).join('');

$('[data-year]').textContent = new Date().getFullYear();

const whatsapp = contacts.find(contact => contact.label === 'WhatsApp');
$$('[data-whatsapp-link]').forEach(link => {
  if (whatsapp) link.href = whatsapp.href;
});

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

  const bindCursorTargets = () => $$('a,button,[data-cursor]').forEach(el => {
    if (el.dataset.cursorBound) return;
    el.dataset.cursorBound = 'true';
    el.addEventListener('pointerenter', () => {
      cursor.classList.add('is-hover');
      cursor.dataset.label = el.dataset.cursor || '';
    });
    el.addEventListener('pointerleave', () => {
      cursor.classList.remove('is-hover');
      cursor.dataset.label = '';
    });
  });
  bindCursorTargets();

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



import { initChessKing } from './chess-king.js';
initChessKing();

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

const contactSection = $('#contato');
const contactFab = $('[data-contact-fab]');
if (contactFab && contactSection && 'IntersectionObserver' in window) {
  const fabObserver = new IntersectionObserver(([entry]) => {
    contactFab.classList.toggle('is-hidden', entry.isIntersecting);
  }, { threshold: 0.05 });
  fabObserver.observe(contactSection);
}
