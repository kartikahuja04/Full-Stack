# Banking API with JWT Authentication

This project implements a secure banking API using Node.js, Express.js, MongoDB, JWT, and bcrypt.

## Features
- User registration and login
- JWT generation and verification
- Protected banking routes
- Token refresh mechanism
- Account-level security

## Requirements
- Node.js 18+
- Express.js
- MongoDB
- jsonwebtoken
- bcrypt
- Postman (for testing)

## Setup
1. Install dependencies: `npm install`
2. Configure MongoDB connection in `.env`
3. Start the server: `npm start`

## Endpoints
- `/api/register` - Register a new user
- `/api/login` - Login and receive JWT
- `/api/account` - Protected account route
- `/api/token` - Refresh JWT

## Security Practices
- Passwords hashed with bcrypt
- JWTs signed and verified
- Routes protected by JWT middleware
- Token expiration and refresh
- Sensitive data secured

## Testing
Use Postman to test registration, login, protected routes, and token refresh.
