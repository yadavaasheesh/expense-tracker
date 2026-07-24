// frontend/src/components/AddTransactionForm.js

import React, { useState } from 'react';

const AddTransactionForm = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!description || !amount) { // Removed 'category' from this check
      alert('Please fill out all fields');
      return;
    }

    const newTransaction = {
      description,
      amount: type === 'expense' ? -Math.abs(amount) : +Math.abs(amount),
      type,
      date: new Date(),
    };

    onAdd(newTransaction);

    setDescription('');
    setAmount('');
    setType('expense');
  };

  return (
    <div className="form-container">
      <h3>Add New Transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g., Coffee" />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount (always positive)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 150" />
        </div>
        
        {/* The Category input is now completely removed */}

        <div className="form-control radio-group">
          <label>
            <input type="radio" value="expense" checked={type === 'expense'} onChange={(e) => setType(e.target.value)} />
            Expense
          </label>
          <label>
            <input type="radio" value="income" checked={type === 'income'} onChange={(e) => setType(e.target.value)} />
            Income
          </label>
        </div>
        <button className="btn">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransactionForm;