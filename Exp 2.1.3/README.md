# E-commerce Catalog API

This repository contains a simple Node.js/Express API implementing an e-commerce catalog with a nested document structure. The project follows a **layered modular architecture** with clear separation of concerns:

- Config - environment and database setup
- Models - Mongoose schemas representing documents
- Repositories - data access layer encapsulating database operations
- Services - business logic and orchestration
- Controllers - HTTP request handling
- Routes - API endpoint definitions
- Entry point - application startup (`index.js`)

The catalog supports hierarchical categories that may contain subcategories and reference products. This nested structure allows efficient tree traversal and is modelled with recursive references in MongoDB.

## Setup

```bash
# install dependencies
npm install

# copy example environment variables
cp .env.example .env

# run development server
npm run dev
```

Ensure MongoDB is running locally or set `MONGODB_URI` appropriately.

## Sample Usage

### Create a category

```bash
curl -X POST http://localhost:5000/api/categories \
  -H 'Content-Type: application/json' \
  -d '{"name":"Electronics"}'
```

### Create a subcategory

```bash
curl -X POST http://localhost:5000/api/categories \
  -H 'Content-Type: application/json' \
  -d '{"name":"Computers","parentId":"<ElectronicsId>"}'
```

### Fetch category with nested items

```bash
curl http://localhost:5000/api/categories/<ElectronicsId>
```

The response includes populated `subcategories` and `products` arrays.

## Architecture Notes

- **Nested documents:** Categories reference other category documents in `subcategories`. This allows arbitrary depth while keeping each document small and normalized.
- **Layered design:** Each layer depends only on the layer below. Controllers are thin; all business logic resides in services.
- **Modularity:** Adding new features (orders, users, etc.) is straightforward by replicating the folder pattern.
- **Comments:** Code includes comments explaining responsibilities and design choices.

Feel free to extend the schema, add validation, or plug in authentication as needed.

## Deploying to Vercel (serverless functions)

This project can be deployed to Vercel by exposing the API endpoints as serverless functions. A basic `vercel.json` and minimal serverless handlers were added in the `api/` folder. These functions reuse the Mongoose connection to avoid repeated cold-start overhead.

Steps:

1. Push your repository to GitHub (or connect your repo to Vercel).
2. In the Vercel dashboard, import the project and set the following Environment Variable:
  - `MONGODB_URI` — your production MongoDB (Atlas) connection string.
3. Deploy the project. Vercel will build `api/*.js` as serverless functions. The API endpoints will be available at:
  - `https://<your-deployment>/api/products`
  - `https://<your-deployment>/api/categories`

Notes & best practices:
- Use Atlas (or any hosted MongoDB) — Vercel serverless functions cannot reliably reach a localhost MongoDB.
- Do not run seeding on each function startup. Instead run `node scripts/seed.js` once against your production DB (from your machine or CI) to populate sample data.
- Monitor connection/latency — serverless cold starts may add latency; connection reuse mitigates this.

