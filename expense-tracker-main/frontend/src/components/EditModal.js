// frontend/src/components/EditModal.js

import React, { useState, useEffect } from 'react';

const EditModal = ({ transaction, onUpdate, onCancel }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (transaction) {
      setDescription(transaction.description);
      setAmount(transaction.amount);
    }
  }, [transaction]);

  const onSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      description,
      amount: +amount,
    });
  };

  if (!transaction) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Transaction</h3>
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label htmlFor="description">Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount (negative for expense)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn">Update</button>
            <button type="button" className="btn btn-cancel" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;