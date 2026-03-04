## Redis Locking Mechanism

This project demonstrates a simple Node.js API that uses a Redis-based locking pattern to prevent double-booking of seats under concurrent load.

Prerequisites

- Node.js and npm
- Docker (for Redis)

Setup

1. Install dependencies:

```bash
npm install
```

2. Run Redis in Docker:

```bash
docker run -d --name redis-server -p 6379:6379 redis
```

Start the app

```bash
npm run dev
```

Run the load test (if Artillery installed):

```bash
artillery run load-test.yml
```
