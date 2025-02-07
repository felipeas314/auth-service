🔐 Auth Service - Microserviço de Autenticação com Node.js e TypeScript

Este é um microserviço de autenticação que fornece registro de usuários e login via JWT, seguindo as melhores práticas de DDD, SOLID e testes automatizados.

🚀 Tecnologias Utilizadas

Node.js - Plataforma JavaScript no lado do servidor

TypeScript - Tipagem estática para JavaScript

Express - Framework web rápido e flexível

Bcrypt - Hashing de senhas

JWT (jsonwebtoken) - Autenticação segura com tokens

Jest - Testes automatizados

Supertest - Testes de integração para endpoints

📦 Como Configurar o Projeto

1️⃣ Clonar o Repositório

git clone https://github.com/seuusuario/auth-service.git
cd auth-service

2️⃣ Instalar Dependências

npm install

3️⃣ Configurar Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto e adicione:

JWT_SECRET=minha_senha_super_secreta
JWT_EXPIRES_IN=1h

Caso use outro tempo de expiração para o token, ajuste JWT_EXPIRES_IN conforme necessário.

🛠️ Como Rodar o Projeto

1️⃣ Modo Desenvolvimento (Hot Reload)

npm run dev

2️⃣ Compilar o Código

npm run build

3️⃣ Executar a Versão Compilada

npm run start

4️⃣ Rodar Testes Automatizados

npm run test

🌐 Endpoints da API

1️⃣ Criar Usuário (Register)

URL: /auth/register

Método: POST

Body (JSON):

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Pass123"
}

Respostas:

201 Created (Sucesso):

{
  "id": "1",
  "email": "john@example.com"
}

400 Bad Request (Erro: e-mail já cadastrado ou senha fraca)

{ "message": "E-mail já está em uso." }

{ "message": "A senha deve conter pelo menos 6 caracteres, incluindo letras e números." }

2️⃣ Login (Obter Token JWT)

URL: /auth/login

Método: POST

Body (JSON):

{
  "email": "john@example.com",
  "password": "Pass123"
}

Respostas:

200 OK (Sucesso):

{
  "token": "jwt.token.aqui"
}

401 Unauthorized (Erro: Credenciais inválidas)

{ "message": "Credenciais inválidas (usuário não encontrado)." }

🧪 Como Testar a API com cURL

1️⃣ Criar um Usuário

curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{
           "name": "John Doe",
           "email": "john@example.com",
           "password": "Pass123"
         }'

2️⃣ Fazer Login e Obter Token JWT

curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{
           "email": "john@example.com",
           "password": "Pass123"
         }'

🛠️ Possíveis Melhorias Futuras

✅ Implementar banco de dados real (PostgreSQL, MongoDB, etc.)✅ Adicionar refresh token para reautenticação✅ Criar middleware para proteger rotas com JWT

🤝 Contribuições

Sinta-se à vontade para contribuir! Faça um fork do repositório, crie uma branch e envie um pull request.

📜 Licença

Este projeto é distribuído sob a MIT License.

