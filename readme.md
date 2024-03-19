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


2. Navigate to the project directory:
    ```bash
    cd pollingAPIRevamp

3. Install dependencies:
    ```bash
    npm install

4. Set up environment variables. Create a .env file in the root directory and add the following:
    ```bash 
    - PORT=5000
    - MONGODB_URI=your_mongodb_connection_string
    - JWT_SECRET=your_jwt_secret_key
    - JWT_EXPIRESIN = 5h

<br>
    Replace your_mongodb_connection_string with your MongoDB connection string and your_jwt_secret_key with a secret key for JWT token generation.
<br>
<br>

5. Start the server:
    ```bash 
    npm start
    



