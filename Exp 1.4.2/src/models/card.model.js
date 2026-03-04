const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  collectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },
  rank: { type: String, required: true },
  suit: { type: String, required: true },
  meta: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Card', cardSchema);
