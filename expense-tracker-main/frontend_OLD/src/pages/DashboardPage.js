// frontend/src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Balance from '../components/Balance';
import TransactionList from '../components/TransactionList';
import AddTransactionForm from '../components/AddTransactionForm';
import EditModal from '../components/EditModal';

const API_URL = 'http://localhost:5000/api/transactions';

// Function to add the auth token to requests
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const getTransactions = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
    try {
      const res = await axios.get(API_URL);
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const handleAdd = async (transaction) => {
    try {
      await axios.post(API_URL, transaction);
      getTransactions();
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      getTransactions();
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };
  
  const handleUpdate = async (updatedData) => {
    try {
      await axios.put(`${API_URL}/${editingTransaction._id}`, updatedData);
      setEditingTransaction(null);
      getTransactions();
    } catch (err) {
      console.error("Error updating transaction:", err);
    }
  };

  return (
    <>
      <Balance transactions={transactions} />
      <div className="main-content">
        <AddTransactionForm onAdd={handleAdd} />
        <TransactionList 
          transactions={transactions} 
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
      {editingTransaction && (
        <EditModal 
          transaction={editingTransaction}
          onUpdate={handleUpdate}
          onCancel={() => setEditingTransaction(null)}
        />
      )}
    </>
  );
};

export default DashboardPage;