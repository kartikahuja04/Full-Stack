## Redis Locking Mechanism

This project includes a Node.js service and a load test configuration.

## Prerequisites
- Node.js and npm installed
- Docker installed and running (for Redis)

## Setup
1. Install dependencies:
   npm install
2. Install Artillery globally:
   npm i -g artillery

## Run Redis (Docker)
Make sure Docker is running. Then start Redis with the following command:
   docker run -d --name redis-server -p 6379:6379 redis
If you need to stop and remove the container later:
   docker stop redis-server
   docker rm redis-server

## Start the App
   npm run dev

## Run the Load Test
   artillery run load-test.yml
