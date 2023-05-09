## Questify

This is the backend side for a website that provides API for user registration, account verification, login and CRUD operations on user cards. The API ensures secure and reliable data management, authentication, and authorization for the website.

## Features

— User registration and account verification via email  
— User login and authentication using JWT  
— CRUD operations for cards are only available to authorized users
— RESTful API architecture following the principles of CRUD operations
simple and clear endpoints
stateless
uses GET, POST, PUT, PATCH, DELETE methods
returns structured JSON format data in responses and appropriate status codes

## Installation

The backend is already deployed on render.com. You can test it sending requests to [Questify](https://questify-backend-c3t6.onrender.com/)

Alternatively, you can install it to your local machine:

1. Clone the repository to your local machine

```zsh
git clone <repo_url>
```

2. Set Environment Variables  
   Rename the `.env.example` file to `.env` and update the values as required.

3. Install dependencies by running the following command in your terminal

```zsh
npm install
```

4. Start the server by running the next command

```zsh
npm run entry
```

5. Test the server  
   You can use tools such as Postman to test the server's endpoints.  
   Send requests to the appropriate URLs (e.g., `http://localhost:3000/api/auth/signup`)

### Endpoints

You can find the detailed information about the endpoints in the API [specification](https://questify-backend-c3t6.onrender.com/api-docs/) created with Swagger.

🚨 After signing up, you will need to verify your email account. If you don't want to use your own email, you can create a temporary one on [temp-mail](https://temp-mail.org/uk/).

### Technologies Used

`Node.js`

`Express`

`MongoDB`

`Mongoose`

`bcrypt`

`JSON Web Tokens (JWT)`

`SendGrid`

`Joi`
