// frontend/src/components/TransactionList.js

import React from 'react';

const TransactionList = ({ transactions, handleDelete, handleEdit }) => {
  return (
    <div className="list-container">
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <li key={transaction._id} className={transaction.amount < 0 ? 'minus' : 'plus'}>
            <div className="transaction-details">
              <span>{transaction.description}</span>
              <small>{transaction.category} - {new Date(transaction.date).toLocaleDateString()}</small>
            </div>
            <div className="transaction-amount">
                {transaction.amount < 0 ? '-' : '+'}₹{Math.abs(transaction.amount)}
            </div>
            <div className="transaction-actions">
              <button onClick={() => handleEdit(transaction)} className="edit-btn">✎</button>
              <button onClick={() => handleDelete(transaction._id)} className="delete-btn">×</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;