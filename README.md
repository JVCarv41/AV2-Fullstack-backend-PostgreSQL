# AV2 Fullstack - Backend com PostgreSQL

Este é o repositório do backend do projeto **AV2 Fullstack**, desenvolvido como parte das atividades da disciplina de Desenvolvimento Full Stack. Nesta versão, a aplicação utiliza **PostgreSQL** como banco de dados, substituindo o MongoDB utilizado anteriormente.

## Demonstração em Vídeo

- Vídeo demonstrativo do projeto: https://youtu.be/_1ZH3Gvxtew

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Vercel](https://vercel.com/) (para deploy)

## Estrutura do Projeto

```
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .env.example
├── package.json
├── package-lock.json
├── vercel.json
└── README.md
```

## Instalação e Execução Local

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/JVCarv41/AV2-Fullstack-backend-PostgreSQL.git
   cd AV2-Fullstack-backend-PostgreSQL
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   - Renomeie o arquivo `.env.example` para `.env` e ajuste as variáveis conforme necessário, incluindo as credenciais do banco de dados PostgreSQL.

4. **Inicie o servidor:**

   ```bash
   npm start
   ```

   O backend estará disponível em `http://localhost:3000` (ou na porta definida no seu arquivo `.env`).

## Deploy

A aplicação está implantada na Vercel e pode ser acessada através do seguinte link:
[https://av-2-fullstack-backend-postgre-sql.vercel.app](https://av-2-fullstack-backend-postgre-sql.vercel.app)

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
