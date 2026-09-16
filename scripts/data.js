export const projects = [
  {
    number: '01',
    slug: 'entre-tempos',
    title: 'Entre Tempos',
    type: 'Revista eletrônica interativa',
    year: '2025 / 2026',
    featured: true,
    description: 'Uma revista eletrônica que transforma cultura, arte e conteúdo autoral em uma experiência de navegação com identidade própria.',
    objective: 'Organizar diferentes universos, como desenhos, filmes, livros, música, poemas e curiosidades, sem perder a sensação de descoberta.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    repository: 'https://github.com/DevMurilo0/EntreTempos',
    live: 'https://www.entretempos.blog.br/',
    preview: {
      kind: 'live',
      poster: 'https://raw.githubusercontent.com/DevMurilo0/EntreTempos/main/entretempos.webp',
      alt: 'Prévia do projeto Entre Tempos',
      posterPosition: 'center 18%',
      frameOffsetY: '-34%'
    }
  },
  {
    number: '02',
    slug: 'devarity-web',
    title: 'Devarity Web',
    type: 'Estúdio web / co-criação',
    year: '2026',
    featured: true,
    description: 'Site institucional da Devarity, criado para apresentar projetos, serviços e a identidade de um estúdio focado em sites e sistemas sob medida.',
    objective: 'Construir uma presença digital própria para a Devarity, unindo direção visual, movimento, cases reais e interações em WebGL.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'WebGL'],
    repository: 'https://github.com/mendeszk25/devarity-web',
    live: 'https://devarity-web.devarity-web.workers.dev/',
    preview: {
      kind: 'live',
      poster: 'https://devarity-web.devarity-web.workers.dev/assets/devarity-og.png',
      alt: 'Identidade visual do site Devarity Web',
      posterPosition: 'center top'
    }
  },
  {
    number: '03',
    slug: 'taiane-almeida',
    title: 'Taiane Almeida',
    type: 'Site editorial / livro',
    year: '2026',
    featured: true,
    description: 'Experiência editorial criada para apresentar o livro “Necropolítica e Reflexões acerca da População Negra no Território Baiano” e sua autora.',
    objective: 'Dar presença digital à obra com leitura visual forte, navegação responsiva e caminhos claros para conhecer o livro e a autora.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    repository: 'https://github.com/DevMurilo0/taianealmeida',
    live: 'https://taianealmeida.com.br/',
    preview: {
      kind: 'live',
      poster: 'https://taianealmeida.com.br/assets/share-preview.jpg',
      alt: 'Site do livro de Taiane Almeida Santos',
      posterPosition: 'center 12%'
    }
  },
  {
    number: '04',
    slug: 'portal-erempaf',
    title: 'Portal EREMPAF',
    type: 'Portal escolar',
    year: '2026',
    featured: false,
    description: 'Um portal digital pensado para concentrar áreas importantes da comunidade escolar em uma navegação mais direta e acessível.',
    objective: 'Criar um ponto de acesso organizado para informações da escola, séries, cardápio e contato.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    repository: 'https://github.com/DevMurilo0/portal_erempaf',
    live: 'https://portalerempaf.vercel.app/',
    preview: {
      kind: 'image',
      poster: '/assets/portalerempaf-preview.webp',
      alt: 'Elemento visual do Portal EREMPAF',
      posterPosition: 'center top'
    }
  },
  {
    number: '05',
    slug: 'enem-planner',
    title: 'ENEM Planner',
    type: 'Planejamento de estudos',
    year: '2026',
    featured: false,
    description: 'Uma ferramenta web voltada à organização da rotina de estudos e ao acesso rápido a recursos úteis para preparação do ENEM.',
    objective: 'Tornar o planejamento de estudos mais claro e prático para quem precisa organizar conteúdo, rotina e recursos.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    repository: 'https://github.com/DevMurilo0/enemplanner',
    live: 'https://enemplanner.vercel.app/',
    preview: {
      kind: 'image',
      poster: 'https://raw.githubusercontent.com/DevMurilo0/enemplanner/main/icon.png',
      alt: 'Elemento visual do ENEM Planner',
      fit: 'contain'
    }
  }
];

export const stack = [
  { category: 'Front-end', items: ['HTML', 'CSS', 'JavaScript'] },
  { category: 'Interface', items: ['Responsividade', 'Animação', 'WebGL'] },
  { category: 'Banco / back-end', items: ['Supabase', 'Firebase'] },
  { category: 'Ferramentas', items: ['Git', 'GitHub'] }
];

export const contacts = [
  {
    label: 'WhatsApp',
    value: 'Iniciar conversa',
    href: 'https://wa.me/5581989031588?text=Ol%C3%A1%20Murilo!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.',
    external: true,
    icon: 'whatsapp',
    primary: true
  },
  {
    label: 'E-mail',
    value: 'murilogabriel.souza0@gmail.com',
    href: 'mailto:murilogabriel.souza0@gmail.com',
    copy: true,
    icon: 'mail'
  },
  {
    label: 'GitHub',
    value: '@DevMurilo0',
    href: 'https://github.com/DevMurilo0/',
    external: true,
    icon: 'github'
  },
  {
    label: 'Instagram',
    value: '@murilo_gabriell0',
    href: 'https://www.instagram.com/murilo_gabriell0/',
    external: true,
    icon: 'instagram'
  }
];
