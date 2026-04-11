# Full-Stack Authentication System (React + Express + JWT + RBAC)

This project contains a complete authentication flow with role-based access control.

## Tech Stack

- Frontend: React 18, React Router v6, React Hook Form, Material UI, Axios
- Backend: Express, JWT, bcryptjs, CORS
- Storage: In-memory seeded users with hashed passwords (MongoDB-ready structure can be added)

## Folder Structure

- frontend/
  - src/components/Login.jsx
  - src/components/PrivateRoute.jsx
  - src/pages/Dashboard.jsx
  - src/pages/Admin.jsx
  - src/pages/Unauthorized.jsx
  - src/services/api.js
  - src/utils/auth.js
  - src/App.jsx
- backend/
  - routes/
  - middleware/
  - models/
  - server.js

## Run Backend

1. Go to backend:
   cd backend
2. Install packages:
   npm install
3. Create `.env` from `.env.example`.
4. Start server:
   npm run dev

Backend runs on `http://localhost:5000` by default.

## Run Frontend

1. Go to frontend:
   cd frontend
2. Install packages:
   npm install
3. Create `.env` from `.env.example`.
4. Start app:
   npm run dev

Frontend runs on `http://localhost:5173` by default.

## Test Users

- Admin:
  - email: admin@example.com
  - password: Admin@123
- User:
  - email: user@example.com
  - password: User@123

## API Endpoints

- POST /api/login
- GET /api/dashboard (JWT required)
- GET /api/admin (JWT + admin role required)
