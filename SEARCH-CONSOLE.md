# Google Search Console - murilogabriel.com.br

Depois de publicar esta versão:

1. No Google Search Console, adicione uma propriedade do tipo **Domínio** para `murilogabriel.com.br`.
2. O Google vai fornecer um registro TXT no formato `google-site-verification=...`. Adicione esse TXT na zona DNS do Registro.br e conclua a verificação.
3. Em **Sitemaps**, envie `https://www.murilogabriel.com.br/sitemap.xml`.
4. Em **Inspeção de URL**, inspecione `https://www.murilogabriel.com.br/` e solicite a indexação depois que a implantação estiver no ar.
5. Use o teste de resultados avançados / validador de Schema para conferir os dados estruturados.

## SEO desta versão

- Canonical definido para `https://www.murilogabriel.com.br/`.
- Título e descrição revisados para apresentar Murilo Gabriel de forma natural.
- Open Graph e Twitter Card usando imagem 1200×630 em PNG.
- Dados estruturados `WebSite`, `ProfilePage` e `Person`.
- Nome do site sugerido ao Google como `Murilo Gabriel`.
- Favicon PNG 192×192, além do SVG existente.
- `robots.txt` liberando rastreamento e apontando para o sitemap.
- `sitemap.xml` com `lastmod` real e sem `priority` / `changefreq`, que o Google ignora.

Observação: o Google pode reescrever título e descrição nos resultados dependendo da busca. Depois de publicar mudanças, o recrawl e a atualização no índice podem levar alguns dias ou semanas.
