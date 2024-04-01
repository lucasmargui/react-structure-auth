
<H1 align="center">Estrutura Next Search </H1>
<p align="center">🚀Criação de uma estrutura de search em Next para referências futuras</p>


# Criação de projeto Next

```
npx create-next-app@latest nextjs-auth
```

# Instalando depêndencias
```
npm i bcrypt
npm i mongodb
npm i mongoose
npm i next-auth
```



# app
 ## (components)
 ## (models)
 ## api
 ## CreateUser
 ## Denied
 ## Member
 ## Public

# .env.local

Local para armazenar variáveis de ambiente específicas do ambiente de desenvolvimento local. Ele é usado para configurar valores que podem variar entre diferentes instalações da mesma aplicação, como chaves de API, URLs de serviço ou qualquer outra informação sensível que não deva ser compartilhada publicamente ou versionada no controle de código-fonte.

Utilização de variável local em app/(models)/User.js para conexão de um banco de dados MONGODB através de um provider fornecido pela depêndencia
```
import mongoose, { Schema } from "mongoose";
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
```


# middleware.js

Este código basicamente protege a rota "/CreateUser" para permitir o acesso apenas a usuários autenticados com o papel de "admin". Se um usuário não autenticado tentar acessar essa rota, ou se um usuário autenticado com um papel diferente de "admin" tentar acessá-la, será redirecionado para "/Denied".

![image](https://github.com/lucasmargui/React_Estrutura_Auth/assets/157809964/c8b5eaa6-a0ed-41d3-8f1a-ab4484fd736f)
