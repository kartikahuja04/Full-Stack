const express = require('express');
const Collection = require('../src/models/collection.model');
const Card = require('../src/models/card.model');

const router = express.Router();

// Create a collection
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });
    const created = await Collection.create({ name, description });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all collections
router.get('/', async (req, res) => {
  try {
    const list = await Collection.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single collection with its cards
router.get('/:id', async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) return res.status(404).json({ error: 'collection not found' });
    const cards = await Card.find({ collectionId: collection._id });
    res.json({ ...collection.toObject(), cards });
  } catch (err) {
    res.status(400).json({ error: 'invalid id' });
  }
});

// Update collection
router.put('/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    const updated = await Collection.findByIdAndUpdate(req.params.id, { name, description }, { new: true, runValidators: true });
    res.json(updated || { ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete collection and its cards
router.delete('/:id', async (req, res) => {
  try {
    await Collection.findByIdAndDelete(req.params.id);
    await Card.deleteMany({ collectionId: req.params.id });
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a card to a collection
router.post('/:id/cards', async (req, res) => {
  try {
    const { rank, suit, meta } = req.body;
    if (!rank || !suit) return res.status(400).json({ error: 'rank and suit are required' });
    const card = await Card.create({ collectionId: req.params.id, rank, suit, meta });
    res.status(201).json(card);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List cards in a collection
router.get('/:id/cards', async (req, res) => {
  try {
    const cards = await Card.find({ collectionId: req.params.id });
    res.json(cards);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a specific card
router.get('/:cid/cards/:cardId', async (req, res) => {
  try {
    const card = await Card.findOne({ _id: req.params.cardId, collectionId: req.params.cid });
    if (!card) return res.status(404).json({ error: 'card not found' });
    res.json(card);
  } catch (err) {
    res.status(400).json({ error: 'invalid id(s)' });
  }
});

// Update a card
router.put('/:cid/cards/:cardId', async (req, res) => {
  try {
    const { rank, suit, meta } = req.body;
    const updated = await Card.findOneAndUpdate({ _id: req.params.cardId, collectionId: req.params.cid }, { rank, suit, meta }, { new: true, runValidators: true });
    res.json(updated || { ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a card
router.delete('/:cid/cards/:cardId', async (req, res) => {
  try {
    await Card.deleteOne({ _id: req.params.cardId, collectionId: req.params.cid });
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
