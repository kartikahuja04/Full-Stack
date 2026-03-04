require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cardsdb';

async function connectToMongo() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  await mongoose.connect(MONGO_URI, { dbName: process.env.MONGO_DB_NAME || undefined });
  console.log(`Connected to MongoDB (${MONGO_URI.startsWith('mongodb+srv') ? 'atlas' : 'local'})`);
  return mongoose.connection;
}

module.exports = { connectToMongo, mongoose };
