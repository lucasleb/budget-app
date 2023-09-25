// server/routes/categories.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new category (expense or income)
router.post('/', (req, res) => {
  const { name, type } = req.body;
  if (!name || !type) {
    return res.status(400).json({ error: 'Category name and type are required' });
  }

  const sql = 'INSERT INTO categories (name, type) VALUES (?, ?)';
  db.run(sql, [name, type], function (err) {
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

// Delete a category and associated transactions (expenses or incomes)
router.delete('/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
  
    // Check if there are any associated transactions
    const checkTransactionsSql = 'SELECT COUNT(*) as count FROM transactions WHERE categoryId = ?';
    db.get(checkTransactionsSql, [categoryId], (err, row) => {
      if (err) {
        console.error('Error checking transactions:', err); // Log the error
        return res.status(500).json({ error: err.message });
      }
  
      const transactionCount = row.count;
  
      if (transactionCount === 0) {
        // If there are no transactions, directly delete the category
        const deleteCategorySql = 'DELETE FROM categories WHERE id = ?';
        db.run(deleteCategorySql, [categoryId], (err) => {
          if (err) {
            console.error('Error deleting category:', err); // Log the error
            return res.status(500).json({ error: err.message });
          }
          res.sendStatus(200);
        });
      } else {
        // If there are transactions, first delete them
        const deleteTransactionsSql = 'DELETE FROM transactions WHERE categoryId = ?';
        db.run(deleteTransactionsSql, [categoryId], (err) => {
          if (err) {
            console.error('Error deleting transactions:', err); // Log the error
            return res.status(500).json({ error: err.message });
          }
  
          // Then, delete the category
          const deleteCategorySql = 'DELETE FROM categories WHERE id = ?';
          db.run(deleteCategorySql, [categoryId], (err) => {
            if (err) {
              console.error('Error deleting category:', err); // Log the error
              return res.status(500).json({ error: err.message });
            }
            res.sendStatus(200);
          });
        });
      }
    });
  });
  

module.exports = router;
