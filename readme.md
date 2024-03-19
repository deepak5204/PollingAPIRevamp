# Polling API Backend with User Authentication and Role-Based Access Control

The Polling API Backend is a Node.js application that serves as the backend for a polling system. It provides endpoints for creating questions, managing options, user authentication using JSON Web Tokens (JWT), and role-based access control (RBAC) for certain actions.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Authentication](#authentication)
7. [Authorization](#authorization)
8. [Contributing](#contributing)
9. [License](#license)

## Features

- **Question Management**: Create, view, and retrieve questions.
- **Option Management**: Add options to questions and delete options.
- **User Authentication**: Register, login, and receive JWT tokens for authentication.
- **Role-Based Access Control (RBAC)**: Differentiate between administrators and regular users for specific actions.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- MongoDB
- JSON Web Tokens (JWT) for authentication

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/deepak5204/PollingAPIRevamp.git

   ```

2. Navigate to the project directory:

   ```bash
   cd pollingAPIRevamp

   ```

3. Install dependencies:

   ```bash
   npm install

   ```

4. Set up environment variables. Create a .env file in the root directory and add the following:
   ```bash
   - PORT=5000
   - MONGODB_URI=your_mongodb_connection_string
   - JWT_SECRET=your_jwt_secret_key
   - JWT_EXPIRESIN = 5h
   ```

<br>
    Replace your_mongodb_connection_string with your MongoDB connection string and your_jwt_secret_key with a secret key for JWT token generation.
<br>
<br>

5. Start the server:
   ```bash
   npm start

   ```

<br>

# Usage

To use the API, you can interact with it using tools like Postman, cURL, or any other HTTP client.

# API Endpoints

### Authentication

- POST /v2/user/signup: Register a new user.

```bash
    curl -X POST http://localhost:5000/v2/user/signup \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "exampleuser",
    "email": "example@example.com",
    "phoneNo": "123456789",
    "password": "examplepassword"
}'
```
<br>
This command sends a POST request to the '/v2/user/signup' endpoint with a JSON payload containing the user's name, email, phone number, and password. It registers a new user with the provided information.


<br>

- POST /v2/user/login: Login and get a JWT token.
```bash 
    curl -X POST http://localhost:5000/v2/user/login \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "example@example.com",
    "password": "examplepassword"
}'

```
<br>
This command sends a POST request to the '/v2/user/login' endpoint with a JSON payload containing the user's email and password. It authenticates the user and returns a JWT token if the credentials are valid.

**Make sure to replace *http://localhost:5000* with the actual base URL of your API server.**

### Questions

-   POST /v2/question : Create a new question.
-   GET /v2/question/:questionId : Get a specific question by ID.
-   GET /v2/question : Get all questions.
-   DELETE /v2/question/:questionId : Delete a specific question by ID.

### Options

-   POST /v2/option/:questionId : Add an option to a question.
-   PUT /v2/option/addvote/:optionId : Add vote an option for a question.
-   DELETE /v2/option/:optionId : Delete an option from a question.


