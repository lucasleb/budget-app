// server/db.js
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  // Create a "categories" table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      type TEXT
    )
  `);

  // Create a "transactions" table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      categoryId INTEGER,
      amount REAL,
      date DATE,
      description TEXT,
      FOREIGN KEY (categoryId) REFERENCES categories (id)
    )
  `);
});

module.exports = db;
