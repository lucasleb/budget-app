// server/routes/incomes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new income
router.post('/', (req, res) => {
  const { category, amount, date, description } = req.body;

  if (!category || !amount || !date) {
    return res.status(400).json({ error: 'Category, amount, and date are required' });
  }

  const sql = 'INSERT INTO incomes (category, amount, date, description) VALUES (?, ?, ?, ?)';
  db.run(sql, [category, amount, date, description], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Fetch all incomes
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM incomes';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(rows);
  });
});

// Delete an income by ID
router.delete('/:incomeId', (req, res) => {
  const incomeId = req.params.incomeId;

  const deleteSql = 'DELETE FROM incomes WHERE id = ?';
  db.run(deleteSql, [incomeId], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.sendStatus(200);
  });
});

// Fetch all income categories
router.get('/categories', (req, res) => {
    const sql = 'SELECT DISTINCT category FROM incomes';
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      const categories = rows.map(row => row.category);
      res.status(200).json(categories);
    });
  });

module.exports = router;
