
<H1 align="center">Estrutura Next Auth </H1>
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



# app - Diretório
 ## (components) - Diretório
  ### AuthProvider.js 
   Um componente renderizado em client que importa SessionProvider para utilização de sessões na aplicação.
  ### Nav.jsx
   Um componente para renderização dos links das rotas de navegação, utiliza session para identificar se existe uma sessão ativa ou não.
  ### UserForm 
   Um componente para renderização de um formulário para criação de um usuário.
 ## (models)
  ### User.js
  Arquivo responsável por retornar um modelo de User ao se conectar com banco de dados MongoDB ou utilizar um Schema próprio de criação. 
 ## api - Diretório 
  ### auth - Diretório
   #### options.js

   ![image](https://github.com/lucasmargui/React_Estrutura_Auth/assets/157809964/978c28b0-9c81-4fc0-9b6d-69422268aa87)

- Estão sendo importados os provedores de autenticação do NextAuth.js para GitHub, Google e Credenciais.
- Há uma definição de um modelo de usuário (User) pelo caminho @/app/(models)/User.
- O bcrypt está sendo importado para verificar senhas.
-  A variável options é exportada, que contém a configuração para autenticação.
- Dentro das opções, há uma lista de provedores de autenticação que serão usados. Cada provedor tem suas próprias configurações.
-  Também há definições de como os perfis de usuário recebidos de diferentes provedores serão tratados. Por exemplo, para o GitHub, está sendo verificado se o e-mail do usuário é "lucasmargui@outlook.com", e se for, seu papel é definido como "admin".
-  Há uma definição para o provedor de Credenciais, onde é feita uma busca no banco de dados para encontrar um usuário com o e-mail fornecido e, se a senha corresponder, o usuário é autenticado.
- Há também callbacks definidos para manipular os tokens JWT e as sessões do usuário.
- jwt({ token, user }): Este método é usado para configurar o token JWT. Ele recebe dois parâmetros, o token e o user. O token é o token JWT que está sendo gerado ou atualizado, e o user é o usuário que está sendo autenticado. O método verifica se o usuário existe (if (user)) e, se existir, atribui o papel (role) do usuário ao token (token.role = user.role). Em seguida, retorna o token.
- session({ session, token }): Este método é usado para configurar a sessão do usuário. Ele recebe dois parâmetros, o session e o token. O session é o objeto de sessão do usuário e o token é o token JWT associado ao usuário. O método verifica se existe um usuário na sessão (if (session?.user)) e, se existir, atribui o papel (role) do usuário ao objeto de sessão (session.user.role = token.role). Em seguida, retorna a sessão.

  #### route.js

  Arquivo de configuração de NextAuth que importa options.js e cria a rota app/api/auth/signin com cada provider criado em options.js

  ![image](https://github.com/lucasmargui/React_Estrutura_Auth/assets/157809964/e4b47b81-20b3-4ade-a655-55d8e99e758f)

  
  ### Users - Diretório

  #### route.js
  
  Arquivo responsável por receber requsição post do componente UserForm e realizar o cadastro das credenciais do usuário no banco de dados MongoDB

  
 ## CreateUser - Diretório
   Rota responsável por renderizar o fomulário de criação de usuário
    ![image](https://github.com/lucasmargui/React_Estrutura_Auth/assets/157809964/18c690bf-f538-4912-b89b-d3555647178e)
    
 ## Denied - Diretório
 
   Rota responsável por exibir uma mensagem de Acesso Negado caso usuário não tenha a permissão necessária para acessar tal rota.
   
 ## Member - Diretório
 
   Rota responsável por exibir as informações de sessão de um usuário autenticado.
   Caso ele não esteja autenticado é redirecionado para tela de login.
   
   ![image](https://github.com/lucasmargui/React_Estrutura_Auth/assets/157809964/c239ae66-82d3-4102-9a2c-e4a3c17c6fba)

 ## Public - Diretório
   Rota responsável por representar um espaço público onde usuários não autenticados podem acessar.

 ## layout.js
   Define um layout básico para a aplicação, que inclui a importação de um AuthProvider para tornar os dados da sessão disponíveis globalmente englobando o app e a importação de um componente Nav para exibição de todas as rotas de navegação da aplicação.
   ![image](https://github.com/lucasmargui/React_Estrutura_Auth/assets/157809964/67286b52-4dbf-4752-a677-130437b26018)

   
 ## page.jsx
  Renderização da página inicial aplicando layout.js em todas as rotas e subrotas de http://localhost:3000/

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
