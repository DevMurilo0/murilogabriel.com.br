# Portfólio — Murilo Gabriel

Portfólio pessoal estático, responsivo e sem dependências de runtime.

## Estrutura

- `index.html`: estrutura principal e SEO.
- `styles/main.css`: direção visual, responsividade e animações.
- `scripts/data.js`: projetos, stack e contatos em um único lugar.
- `scripts/main.js`: renderização dos dados e interações.
- `assets/murilo-hero.webp`: fotografia atual usada no hero e no sobre.

## Editar contatos

Os contatos ficam em `scripts/data.js`, no array `contacts`. Para adicionar LinkedIn, Instagram ou outra rede no futuro, basta inserir um novo objeto seguindo o formato existente.

## Trocar a fotografia

Substitua `assets/murilo-hero.webp` mantendo o mesmo nome. O layout foi preparado para receber uma futura versão recortada/transparente sem precisar reestruturar o site.

## Desenvolvimento local

```bash
python3 -m http.server 4173
```

Acesse `http://localhost:4173`.

## Publicação

Pode ser publicado diretamente na Vercel como site estático, sem comando de build.
