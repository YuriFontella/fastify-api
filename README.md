## Fastify API Rest

Projeto demo utilizando os seguintes plugins:

* "fastify-auth": "^1.0.1"
* "fastify-autoload": "^3.3.1"
* "fastify-compress": "^3.4.0"
* "fastify-cors": "^5.0.0"
* "fastify-guard": "^1.2.0"
* "fastify-helmet": "^5.0.3"
* "fastify-jwt": "^2.1.3"
* "fastify-knexjs": "^1.0.14"
* "fastify-multipart": "^3.3.0"
* "fastify-nodemailer": "^5.0.0"
* "fastify-rate-limit": "^4.0.3"
* "fastify-socket.io": "^1.0.0"
* "fastify-static": "^3.3.0"

```bash
npm install
```

**knex (postgresql)**

Crie um banco de dados, modifique o arquivo knexfile.js e execute o comando:
```bash
npm run migrate
```

**API**
```bash
npm run dev
```

**Rotas**

https://httpie.io/docs#installation

```bash
http post http://localhost:3000/users name=Nome password=Senha role=Função
```
```bash
http get http://localhost:3000/users
```

**Auth/JWT**

```bash
http post http://localhost:3000/auth name=Nome password=Senha
```

**Guard**

```bash
http delete http://localhost:3000/users/1/delete x-access-token:token
```

**Multipart/Upload**

```bash
http -f http://localhost:3000/upload @~/avatar.jpg
```

**Email**

Configure o nodemailer em src/plugins/nodemailer.js
```bash
http post http://localhost:3000/email to=email@email.com subject=Assunto text=Mensagem
```

**Socket.io**

```bash
npm install http-server
```
```bash
http-server .
```
```bash
http post http://localhost:3000/socket message="Eu sou um socket"
```