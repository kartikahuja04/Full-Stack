# Backend (Express + JWT + RBAC)

## Setup

1. Install dependencies:
   npm install
2. Create `.env` from `.env.example`.
3. Seed default users (first time):
   npm run seed
4. Start server:
   npm run dev

## Test Credentials

- Admin: admin@example.com / Admin@123
- User: user@example.com / User@123

## MongoDB

- Ensure MongoDB is running locally or provide a cloud connection string in `MONGO_URI`.
- Default local URI in `.env.example`: `mongodb://127.0.0.1:27017/auth_rbac_db`

## APIs

- POST /api/register
- POST /api/login
- GET /api/dashboard (requires token)
- GET /api/admin (requires admin role)
