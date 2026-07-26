// server.js
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv'); // <-- 1. IMPORT DOTENV

const transactionRoutes = require('./routes/transactions');

dotenv.config(); // <-- 2. LOAD THE .ENV FILE

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Expense Tracker API is running');
});

// 3. USE THE VARIABLE FROM THE .ENV FILE
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));
app.use('/api/users', require('./routes/users')); 
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


