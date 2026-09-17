# Portfólio - Murilo Gabriel

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


## Rei 3D — Sobre → Stack

Modelagem original em `scripts/chess-king.js`, feita para este portfólio: superfície
de revolução contínua (perfil Bézier detalhado, 128 segmentos radiais), base fechada,
gola e encaixe integrados; cruz extrudada com chanfros. Não utiliza a geometria anterior.

A busca por GLB reutilizável incluiu Poly Pizza e
[Cross finial chess king, de 3D Assets](https://3dassets.dev/assets/classic-chess-essentials-king-6018f49e)
(CC0). O preview deste último apresentou facetas e uma cruz sem chanfros, incompatíveis
com o acabamento solicitado. Por isso foi adotada a alternativa autoral; nenhum modelo
externo foi incorporado e não há atribuição ou licença de terceiros para a geometria.

Three.js 0.180.0 é importado sob demanda via esm.sh (licença MIT). Material físico
cinza `#444950`, sem emissão, três luzes direcionais e preenchimento hemisférico discreto.
A sombra vem de shadow map PCFSoft de 1024px sobre ShadowMaterial, sem sprite simulado.
O canvas transparente mede 180px; a peça ocupa aproximadamente 80–92px de altura.

O percurso usa posições reais da foto e do título, com interpolação do scroll e
rotação limitada (75% X / 25% Y). Foto e STACK ficam acima do canvas no mesmo
contexto de empilhamento. O render para ao estabilizar o scroll e quando a aba fica
oculta. DPR limitado a 1.5. Até 900px e com movimento reduzido, não carrega Three.js;
ao entrar nesses modos, libera os recursos WebGL existentes.

Para conferir: servir o projeto, rolar de Sobre a Stack e retornar; observar entrada
pela direita, ocultação atrás da foto, reaparição à esquerda, passagem atrás de STACK
e saída pela direita. Repetir após redimensionar a janela e com movimento reduzido.
