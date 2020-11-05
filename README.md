# Descrição
O projeto lista, cria, altera e deleta categorias que podem ser inseridas através de arquivo CSV.
O projeto é composto por BackEnd e FrontEnd.

# Requisitos
Node.js versão 12.18.3

Yarn versão 1.24.4

# Configuração

### Instalar dependências BackEnd e para FrontEnd
Rodar comando: `yarn install`

### Comando para rodar servidor BackEnd
`yarn start`

### Comando para rodar servidor FrontEnd
`yarn dev`

### Acesso da aplicação
http://localhost:8080

# Para resetar o banco
- Excluir arquivo database.sqlite dentro da pasta database (src/database/database.sqlite)
- Logo em seguida rodar comando: `yarn knex:migrate`

# Considerações
- Leitor do arquivo CSV funcionará apenas quando não tiver id's de categoria repetidos.
- O código não possuí qualquer tipo de verificação dos dados que estão entrando.

# Ambiente
- Sistema operacional: Windows 10
- IDE: VS Code
- Bibliotecas: 
    - BackEnd: Knex, Sqlite, csv-parser, express, cors
    - FrontEnd: Axios, vuetify, vue
- Linguagem:
    - BackEnd: TypeScript e JavaScript
    - FrontEnd: JavaScript (Vue.js)
