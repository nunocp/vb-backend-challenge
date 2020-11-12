# VB Backend Challenge

Projeto implementado para um desafio backend cujo objetivo é integrar a API do [Arcsecond](https://api.arcsecond.io/exoplanets/) com uma database própria e prover uma API GraphQL que permita:

- Consultar planetas com alta gravidade para a instalação de postos de recarga para veículos espaciais, além de indicar quais já possuem alguma estação instalada.
- "Instalar" estações de recarga em planetas, armazenando os dados na database própria.

## Desenvolvimento

As tecnologias utilizadas foram:

- **Node.js**
- **Apollo Server** (GraphQL)
- **Prisma** (ORM)
- **MySQL**
- **Jest** (Testes)
- **Docker** & **Docker Compose**

## Executando

1. Primeiro, instale as últimas versões do [Docker](https://www.docker.com/) e [Docker-Compose](https://docs.docker.com/compose/install/).

2. Na raiz do projeto, execute: `docker-compose up -d`

3. A API GraphQL ficará disponível em http://localhost:4000, podendo ser testada através do browser.\
\
**Importante:** Certifique-se de que o MySQL (contêiner `"vb-db"`) está pronto na porta `3306` antes de testar a API. O seu status pode ser acompanhado através do `docker-compose logs`.

## Testando

1. Para testar, é necessário ter o [Node.js](https://nodejs.org) e [npm](https://www.npmjs.com/) instalados.

2. Na raiz do projeto, instale as dependências necessárias executando: `npm install`

3. Rode os contêineres seguindo as instruções anteriores e execute: `npm test`\
\
**Nota:** O teste está configurado com timeout de 20 segundos, o que tem sido suficiente, porém o retorno da API do Arcsecond às vezes pode demorar mais, ocasionando fails. Caso seja esse o caso, ajuste o *testTimeout* no arquivo *jest.config.js* na raiz do projeto.
