// server/routes/categories.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new category
router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Category name is required' });
  }

  const sql = 'INSERT INTO categories (name) VALUES (?)';
  db.run(sql, [name], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Get all categories
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM categories';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
