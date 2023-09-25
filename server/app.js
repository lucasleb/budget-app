// server/app.js
const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());

// Serve static files (e.g., CSS, frontend JavaScript)
app.use(express.static('public'));

// Import and use the transactions routes
const transactionsRoutes = require('./routes/transactions');
app.use('/api/transactions', transactionsRoutes);

// Import and use the categories routes
const categoriesRoutes = require('./routes/categories');
app.use('/api/categories', categoriesRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
