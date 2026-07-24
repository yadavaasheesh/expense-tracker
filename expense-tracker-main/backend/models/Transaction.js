// backend/models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: { /* ... */ },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  description: { type: String },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Transaction', transactionSchema);