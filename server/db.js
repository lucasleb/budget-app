// server/db.js
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  // Create a "categories" table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )
  `);

  // Create an "expenses" table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      price REAL,
      date DATE,
      categoryId INTEGER,
      description TEXT,
      FOREIGN KEY (categoryId) REFERENCES categories (id)
    )
  `);

  // Create an "incomes" table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS incomes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT,
      amount REAL,
      date DATE,
      description TEXT
    )
  `);
});

module.exports = db;
