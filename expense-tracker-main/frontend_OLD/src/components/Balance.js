// frontend/src/components/Balance.js

import React from 'react';

const Balance = ({ transactions }) => {
  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <div className="balance-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">+₹{income}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">-₹{expense}</p>
      </div>
       <div>
        <h4>Balance</h4>
        <p className="money total">₹{total}</p>
      </div>
    </div>
  );
};

export default Balance;