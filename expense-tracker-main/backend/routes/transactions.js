// backend/routes/transactions.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // <-- IMPORT AUTH MIDDLEWARE
const Transaction = require('../models/Transaction');

// @route   GET api/transactions
// @desc    Get all user's transactions
// ADD THE 'auth' MIDDLEWARE TO THE ROUTE
router.get('/', auth, async (req, res) => {
  try {
    // Find transactions only for the logged-in user
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/transactions
// @desc    Add new transaction
// ADD THE 'auth' MIDDLEWARE TO THE ROUTE
router.post('/', auth, async (req, res) => {
  const { description, amount, type, date } = req.body; // <-- 1. 'category' is gone
  try {
    const newTransaction = new Transaction({
      description,
      amount,
      type,
      // <-- 2. 'category' is gone
      date,
      user: req.user.id,
    });
    // ...
    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/transactions/:id
// @desc    Delete a transaction
// ADD THE 'auth' MIDDLEWARE TO THE ROUTE
router.delete('/:id', auth, async (req, res) => {
    try {
        let transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });

        // Make sure user owns the transaction
        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Transaction removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   PUT api/transactions/:id
// @desc    Update a transaction
// ADD THE 'auth' MIDDLEWARE TO THE ROUTE
router.put('/:id', auth, async (req, res) => {
    try {
        let transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });

        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        
        transaction = await Transaction.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;