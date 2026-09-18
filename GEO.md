# GEO / AEO — Murilo Gabriel

Atualizado em 18/09/2026.

## O que foi implementado
- Identidade consistente: Murilo Gabriel Souza da Silva / Murilo Gabriel / DevMurilo0.
- `Person`, `ProfilePage`, `WebSite`, `ImageObject` e lista estruturada de projetos em JSON-LD.
- Relações `sameAs` para GitHub e Instagram.
- Nome completo e função também aparecem no conteúdo visível da página.
- Projetos públicos aparecem no conteúdo e nos dados estruturados.
- `/profile.json` disponibiliza um perfil estruturado simples.
- `/llms.txt` e `/llms-full.txt` oferecem resumo legível para sistemas que optem por usar esse formato.
- `robots.txt` continua liberando o conteúdo público.

## Importante
`llms.txt` não melhora ranking ou visibilidade no Google Search; o Google declarou que o arquivo não é necessário para seus recursos de busca/IA. Ele foi incluído apenas para outros sistemas que possam optar por consumi-lo.

## Depois do deploy
1. Abrir Search Console > Inspeção de URL.
2. Testar `https://www.murilogabriel.com.br/` ao vivo.
3. Solicitar indexação.
4. Confirmar `sitemap.xml` processado.
5. Testar os dados estruturados no Rich Results Test / Schema Markup Validator.
6. Manter GitHub e Instagram com o mesmo nome/URL do site sempre que possível.
