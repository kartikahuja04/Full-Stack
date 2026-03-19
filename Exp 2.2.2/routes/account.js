const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Protected account route
router.get('/account', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Account not found' });
    res.json({ accountNumber: user.accountNumber, balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching account', error: err.message });
  }
});

module.exports = router;
