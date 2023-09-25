// server/routes/expenses.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new expense
router.post('/', (req, res) => {
    const { price, date, categoryId, description } = req.body;
  
    if (!price || !date || !categoryId) {
      return res.status(400).json({ error: 'Price, date, and category are required' });
    }
  
    const sql = 'INSERT INTO expenses (price, date, categoryId, description) VALUES (?, ?, ?, ?)';
    db.run(sql, [price, date, categoryId, description], function (err) {
      if (err) {
        console.error(err.message); // Log the error message
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(201).json({ id: this.lastID });
    });
  });

// Get all expenses
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM expenses';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
