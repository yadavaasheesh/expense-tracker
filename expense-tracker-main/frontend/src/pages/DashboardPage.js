// frontend/src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Balance from '../components/Balance';
import TransactionList from '../components/TransactionList';
import AddTransactionForm from '../components/AddTransactionForm';
import EditModal from '../components/EditModal';

const API_URL = 'http://localhost:5000/api/transactions';

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // This function will create the authorization header for us
  const createAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        'x-auth-token': token,
      },
    };
  };

  const getTransactions = async () => {
    try {
      const config = createAuthHeaders();
      const res = await axios.get(API_URL, config);
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const handleAdd = async (transaction) => {
    try {
      const config = createAuthHeaders();
      await axios.post(API_URL, transaction, config);
      getTransactions();
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const config = createAuthHeaders();
      await axios.delete(`${API_URL}/${id}`, config);
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
      const config = createAuthHeaders();
      await axios.put(`${API_URL}/${editingTransaction._id}`, updatedData, config);
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