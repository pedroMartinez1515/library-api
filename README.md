# library-api

API Sistema de biblioteca

Tecnologias utilizadas: NodeJS, HapiJs, JWT, PostgreSQL, Lodash, Moment, Dotenv

HapiJS - Controle da API

JWT - Autenticação

PostgreSQL - Banco de dados

Lodash - Biblioteca de utilitários.

Moment - Biblioteca para tratamento de dados.

Dotenv - Biblioteca para tratamendo de variaveis de ambiente.

Para execução das chamadas, recomendo o download do Insomnia e a utilização da collection.

Você pode consultar todas chamadas e seus respectivos parametros na collection: not available

Backup do Banco de dados para importação e testes: not available

Vale ressaltar que é necessário configurar a "DATABASE_URL" no arquivo ".env" com sua respectiva url de hospedagem do banco.

Para executar a aplicação, será necessário o download do projeto, instalação das dependencias ( npm i package.json ) e por fim a configuração da variável de ambiente "DATABASE_URL".

Observações gerais:
- A funcionalidade de "Listar o titulo dos 3 livros mais alugados por cidade durante o ano (mostrar todos os meses do ano)" não foi finalizada. Portanto, está com bugs.
- Na autenticação JWT não foi feito um login verdadeiro no banco, mas sim um login virtual a nível de código ( já que imaginei que não havia necessidade ).
- Não criei models.
