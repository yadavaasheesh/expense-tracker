// frontend/src/components/TransactionList.js

import React from 'react';

const TransactionList = ({ transactions, handleDelete, handleEdit }) => {
  return (
    <div className="list-container">
      <h3>History</h3>
      
      {/* Container with scroll bar */}
      <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' }}>
        <ul className="list">
          {transactions.map(transaction => (
            <li key={transaction._id} className={transaction.amount < 0 ? 'minus' : 'plus'}>
              <div className="transaction-details" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <span style={{ fontWeight: '600' }}>{transaction.description}</span>
                <small style={{ color: '#666', fontSize: '0.75rem' }}>
                  {new Date(transaction.date).toLocaleDateString('en-GB')}
                </small>
              </div>
              <div className="transaction-amount">
                {transaction.amount < 0 ? '-' : '+'}{Math.abs(transaction.amount)}
              </div>
              <div className="transaction-actions">
                <button onClick={() => handleEdit(transaction)} className="edit-btn">✏️</button>
                <button onClick={() => handleDelete(transaction._id)} className="delete-btn">❌</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;