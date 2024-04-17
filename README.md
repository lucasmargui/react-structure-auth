<H1 align="center">Next Authentication </H1>
<p align="center">🚀Creating a search structure in Next for future references</p>


## Requirements
- next
- bcrypt
- mongodb
- mongoose
- next-auth

# Create project Next

```
npx create-next-app@latest nextjs-auth
```

# Installing dependencies
```
npm i bcrypt
npm i mongodb
npm i mongoose
npm i next-auth
```



# app - Directory
 ## (components) - Directory
 ### AuthProvider.js
 A client-rendered component that imports SessionProvider for use by sessions in the application.
 ###Nav.jsx
 A component for rendering navigation route links uses session to identify whether there is an active session or not.
 ### Userform
 A component for rendering a form for creating a user.
 ## (models)
 ### User.js
 File responsible for returning a user model when connecting to the MongoDB database or using its own creation scheme.
 ## api - Directory
 ### auth - Directory
 ####options.js

 ![image](https://github.com/lucasmargui/React_Estrutura_Auth/assets/157809964/978c28b0-9c81-4fc0-9b6d-69422268aa87)

- NextAuth.js authentication providers for GitHub, Google and Credentials are imported.
- There is a definition of a user model (User) using the path @/app/(models)/User.
- bcrypt is being imported to verify passwords.
- The options variable is exported, which contains the configuration for authentication.
- Within the options, there is a list of authentication providers that will be used. Each provider has its own settings.
- There are also definitions of how user profiles received from different providers will be treated. For example, for GitHub, it is checking whether the user's email is "lucasmargui@outlook.com", and if so, their role is set to "admin".
- There is a definition for the Credentials provider, where the database is searched to find a user with the provided email and, if the password matches, the user is authenticated.
- There are also callbacks defined to manipulate JWT tokens and user sessions.
- jwt({ token, user }): This method is used to configure the JWT token. It receives two parameters, the token and the user. The token is the JWT token being generated or updated, and the user is the user being authenticated. The method checks whether the user exists (if (user)) and, if so, assigns the user's role to the token (token.role = user.role). It then returns the token.
- session({ session, token }): This method is used to configure the user session. It receives two parameters, the session and the token. The session is the user's session object and the token is the JWT token associated with the user. The method checks whether a user exists in the session (if (session?.user)) and, if so, assigns the user's role to the session object (session.user.role = token.role). Then the session returns.

  #### route.js

 NextAuth configuration file that imports options.js and creates the app/api/auth/signin route with each provider created in options.js

 ![image](https://github.com/lucasmargui/React_Estrutura_Auth/assets/157809964/e4b47b81-20b3-4ade-a655-55d8e99e758f)


 ### Users - Directory

 #### route.js

 File responsible for receiving post requests from the UserForm component and registering user credentials in the MongoDB database


 ## CreateUser - Directory
 Route responsible for rendering the user creation form
 ![image](https://github.com/lucasmargui/React_Estrutura_Auth/assets/157809964/18c690bf-f538-4912-b89b-d3555647178e)

 ## Denied - Directory

 Route responsible for displaying an Access Denied message if the user does not have the necessary permission to access that route.

 ## Member - Directory

 Route responsible for displaying the session information of an authenticated user.
 If he is not authenticated, he will be redirected to the login screen.

 ![image](https://github.com/lucasmargui/React_Estrutura_Auth/assets/157809964/c239ae66-82d3-4102-9a2c-e4a3c17c6fba)

 ## Public - Directory
 Route responsible for representing a public space where unauthenticated users can access.

 ## layout.js
 Defines a basic layout for the application, which includes importing an AuthProvider to make session data available globally across the app and importing a Nav component to display all of the application's navigation routes.
 ![image](https://github.com/lucasmargui/React_Estrutura_Auth/assets/157809964/67286b52-4dbf-4752-a677-130437b26018)


 ## page.jsx
 Homepage rendering applying layout.js to all routes and subroutes of http://localhost:3000/

# .env.local

Location to store environment variables specific to the local development environment. It is used to configure values ​​that may vary between different installations of the same application, such as API keys, service URLs, or any other sensitive information that should not be shared publicly or versioned in source control.

Using a local variable in app/(models)/User.js to connect a MONGODB database through a provider provided by the dependency
```
import mongoose, { Schema } from "mongoose";
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
```


# middleware.js

This code basically protects the "/CreateUser" route to allow access only to users authenticated with the "admin" role. If an unauthenticated user tries to access this route, or if an authenticated user with a role other than "admin" tries to access it, they will be redirected to "/Denied".

![image](https://github.com/lucasmargui/React_Estrutura_Auth/assets/157809964/c8b5eaa6-a0ed-41d3-8f1a-ab4484fd736f)
  
 
