# Portfólio — Murilo Gabriel

Portfólio pessoal responsivo e estático em **HTML, CSS e JavaScript nativos**, sem build ou dependências de runtime.

**Site:** https://www.murilogabriel.com.br/

## Arquitetura

- `index.html`: estrutura do site, metadados e dados estruturados de SEO.
- `scripts/data.js`: cadastro central de projetos, tecnologias e contatos.
- `scripts/main.js`: renderização de projetos, prévias, navegação, animações e interações.
- `scripts/chess-king.js`: experiência 3D autoral na seção Stack.
- `styles/main.css`: identidade, tipografia, grids e responsividade.
- `assets/`: retratos, ícones e prévias locais.

O retrato principal atualmente usado no hero é `assets/murilo-hero-portrait.webp`; a seção Sobre usa `assets/murilo-hero-transparent.png`.

## Projetos

Os **7 projetos** da seção Trabalhos ficam cadastrados exclusivamente no array `projects` de `scripts/data.js`.

| Projeto | Prévia | Destino |
| --- | --- | --- |
| Entre Tempos | Arquivo local | https://www.entretempos.blog.br/ |
| Devarity Web | Imagem da Devarity e prévia incorporada | https://devarity.com.br/ |
| Taiane Almeida | Imagem do site e prévia incorporada | https://taianealmeida.com.br/ |
| Escola Peralta | Fotografia institucional publicada | https://escola-peralta.escolaperalta.workers.dev/ |
| Portal EREMPAF | Captura publicada pela Devarity | https://portalerempaf.vercel.app/ |
| ENEM Planner | Captura publicada pela Devarity | https://enemplanner.vercel.app/ |
| Fly Telecom | Captura publicada pela Devarity | https://fly-telecom-fibra.vercel.app/ |

As prévias atuais do **Portal EREMPAF** e do **ENEM Planner** são imagens hospedadas em `https://devarity.com.br/assets/projects/` que representam as interfaces publicadas. Por segurança visual, ambas possuem `fallbackPoster` com as imagens locais anteriores; se a imagem remota não carregar, o navegador tenta a alternativa local.

Para atualizar uma prévia no futuro, altere `poster`, `alt` e, se necessário, `posterPosition` do projeto correspondente. Prefira hospedar uma captura otimizada localmente em `assets/` para eliminar a dependência externa. Se adicionar ou remover projetos, atualize também a lista estruturada `ItemList` no `index.html`.

## Desenvolvimento local

No VS Code, abra `index.html` com a extensão **Live Server**, ou execute:

```bash
python3 -m http.server 4173
```

Acesse http://localhost:4173. Módulos JavaScript precisam ser servidos por HTTP, não por `file://`.

## Publicação

Pode ser publicado na Vercel ou em outro host estático, sem comando de build.

## SEO e identidade

O repositório inclui `profile.json`, `llms.txt`, `llms-full.txt`, `robots.txt`, `sitemap.xml` e dados estruturados JSON-LD. Para procedimentos de verificação e indexação, veja `SEO-NOME-GOOGLE.md`, `SEARCH-CONSOLE.md` e `GEO.md`.
