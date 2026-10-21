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
      kind: 'image',
      poster: '/assets/entretempos-preview.png',
      alt: 'Prévia do projeto Entre Tempos',
      posterPosition: 'center top',
      color: true
    }
  },
  {
    number: '02',
    slug: 'devarity-web',
    title: 'Devarity Web',
    type: 'Estúdio web / co-criação',
    year: '2026',
    featured: true,
    description: 'Site e identidade digital da Devarity, estúdio que reúne desenvolvimento sob medida, projetos publicados e ferramentas próprias.',
    objective: 'Apresentar serviços, cases e produtos com direção visual autoral, movimento e interações em WebGL.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'WebGL'],
    repository: 'https://github.com/mendeszk25/devarity-web',
    live: 'https://devarity.com.br/',
    preview: {
      kind: 'live',
      poster: 'https://devarity.com.br/assets/devarity-og.png',
      alt: 'Identidade visual atual da Devarity Web',
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
    slug: 'escola-peralta',
    title: 'Escola Peralta',
    type: 'Sistema escolar / full-stack',
    year: '2026',
    featured: true,
    description: 'Site institucional e portal acadêmico com autenticação, gestão de turmas e alunos, notas, frequência e administração escolar.',
    objective: 'Conectar a apresentação pública da escola a ferramentas seguras que apoiam o trabalho de professores e administradores.',
    technologies: ['React', 'TypeScript', 'Supabase', 'Cloudflare'],
    repository: 'https://github.com/DevMurilo0/escola-peralta',
    live: 'https://escola-peralta.escolaperalta.workers.dev/',
    preview: {
      kind: 'image',
      poster: '/assets/escola-peralta-hero.jpg',
      fallbackPoster: 'https://escola-peralta.escolaperalta.workers.dev/images/school/hero-escola.webp',
      alt: 'Captura do hero da Escola Peralta, com título, navegação e fotografia institucional',
      posterPosition: 'center top',
      color: true
    }
  },
  {
    number: '05',
    slug: 'portal-erempaf',
    title: 'Portal EREMPAF',
    type: 'Portal escolar / gestão de turmas',
    year: '2026',
    featured: false,
    description: 'Portal da comunidade escolar com calendário por turma, matérias, avisos, fotos, notificações push, histórico de alterações e edição protegida.',
    objective: 'Reunir informações antes dispersas em conversas e facilitar o acesso ao cardápio, SIEPE e à rotina de cada turma.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'Vercel'],
    repository: 'https://github.com/DevMurilo0/portal_erempaf',
    live: 'https://portalerempaf.vercel.app/',
    preview: {
      kind: 'image',
      poster: '/assets/portalerempaf-hero-atualizado.jpg',
      fallbackPoster: '/assets/portalerempaf-preview.webp',
      alt: 'Página inicial atual do Portal EREMPAF com foto da Feira das Profissões, navegação e acessos rápidos',
      posterPosition: 'center top',
      color: true
    }
  },
  {
    number: '06',
    slug: 'enem-planner',
    title: 'ENEM Planner',
    type: 'Aplicação web / planejamento de estudos',
    year: '2026',
    featured: false,
    description: 'Planner que importa cronogramas completos, adapta os conteúdos ao tempo disponível e acompanha o progresso em visões de dia, semana, mês e ano.',
    objective: 'Transformar um cronograma em uma rotina flexível, com blocos editáveis, acompanhamento visual e dados salvos no navegador.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    repository: 'https://github.com/DevMurilo0/enemplanner',
    live: 'https://enemplanner.vercel.app/',
    preview: {
      kind: 'image',
      poster: 'https://devarity.com.br/assets/projects/enem-planner.webp',
      fallbackPoster: '/assets/enemplanner-preview.webp',
      alt: 'Captura atual do Planner ENEM com calendário semanal e acompanhamento dos estudos',
      posterPosition: 'center top',
      color: true
    }
  }
];

export const stack = [
  { category: 'Front-end', items: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript'] },
  { category: 'Interface', items: ['Responsividade', 'Animação', 'WebGL'] },
  { category: 'Banco / back-end', items: ['Supabase', 'Firebase', 'Cloudflare Workers'] },
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
