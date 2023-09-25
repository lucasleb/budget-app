// server/routes/transactions.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new transaction (expense or income)
router.post('/', (req, res) => {
  const { categoryId, amount, date, description } = req.body; // Change "category" to "categoryId"
  if (!categoryId || !amount || !date) { // Change "category" to "categoryId"
    return res.status(400).json({ error: 'Category, amount, and date are required' });
  }

  const sql = 'INSERT INTO transactions (categoryId, amount, date, description) VALUES (?, ?, ?, ?)'; // Change "category" to "categoryId"
  db.run(sql, [categoryId, amount, date, description], function (err) {
    if (err) {
      console.error('Error creating transaction:', err); // Log the error for debugging
      return res.status(500).json({ error: 'An error occurred while creating the transaction' });
    }
    res.status(201).json({ id: this.lastID });
  });
});

module.exports = router;

// Get all transactions (expenses and incomes)
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM transactions';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Delete a transaction (expense or income) by ID
router.delete('/:transactionId', (req, res) => {
  const transactionId = req.params.transactionId;

  const deleteSql = 'DELETE FROM transactions WHERE id = ?';
  db.run(deleteSql, [transactionId], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.sendStatus(200);
  });
});

module.exports = router;
