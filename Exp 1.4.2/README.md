# Playing Card Collection REST API

Simple Express.js REST API to manage playing card collections. Uses the official `mongodb` driver.

Requirements

- Node.js 18+
- MongoDB (local or remote)

Setup

1. Install dependencies:

```bash
npm install
```

2. (Optional) Set environment variables:

- `MONGO_URI` - MongoDB connection string (default: `mongodb://localhost:27017`)
- `MONGO_DB_NAME` - database name (default: `cardsdb`)

3. Run in development mode:

```bash
npm run dev
```

API Endpoints (base `/api/collections`)

- `POST /` - create a collection: `{ name, description? }`
- `GET /` - list collections
- `GET /:id` - get collection with its cards
- `PUT /:id` - update collection `{ name?, description? }`
- `DELETE /:id` - delete collection and its cards

Cards endpoints

- `POST /:id/cards` - add card `{ rank, suit, meta? }`
- `GET /:id/cards` - list cards in collection
- `GET /:id/cards/:cardId` - get specific card
- `PUT /:id/cards/:cardId` - update card
- `DELETE /:id/cards/:cardId` - delete card

Notes

- This implementation uses a separate `cards` collection with `collectionId` referencing the parent collection.
- For production use, secure your MongoDB credentials and enable proper validation and authentication.
