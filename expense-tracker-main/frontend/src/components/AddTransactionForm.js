import React, { useState } from 'react';

const AddTransactionForm = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [loading, setLoading] = useState(false);

  // AI Receipt Upload Handler
  const handleReceiptUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('receipt', file);

    setLoading(true);

    try {
      const response = await fetch('/api/ai/scan-receipt', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success && result.data) {
        if (result.data.title) setDescription(result.data.title);
        if (result.data.amount) setAmount(result.data.amount);
      } else {
        alert('Could not parse receipt. Please enter details manually.');
      }
    } catch (error) {
      console.error('Receipt scan failed:', error);
      alert('Error uploading receipt.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!description || !amount) {
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

      {/* AI Receipt Scanner Input */}
      <div className="form-control">
        <label>Scan Receipt with AI</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleReceiptUpload} 
          disabled={loading}
        />
        {loading && <p style={{ color: '#007bff', fontSize: '14px' }}>Analyzing receipt with Gemini AI...</p>}
      </div>

      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Coffee"
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount (always positive)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 150"
          />
        </div>

        <div className="form-control radio-group">
          <label>
            <input
              type="radio"
              value="expense"
              checked={type === 'expense'}
              onChange={(e) => setType(e.target.value)}
            />
            Expense
          </label>
          <label>
            <input
              type="radio"
              value="income"
              checked={type === 'income'}
              onChange={(e) => setType(e.target.value)}
            />
            Income
          </label>
        </div>
        <button className="btn" disabled={loading}>Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransactionForm;