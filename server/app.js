// server/app.js
const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());

// Serve static files (e.g., CSS, frontend JavaScript)
app.use(express.static('public'));

// Routes for categories
const categoriesRoutes = require('./routes/categories');
app.use('/api/categories', categoriesRoutes);
const expensesRoutes = require('./routes/expenses');
app.use('/api/expenses', expensesRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
