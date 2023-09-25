const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

const categories = [
  { name: 'Housing', type: 'expense' },
  { name: 'Transportation', type: 'expense' },
  { name: 'Groceries', type: 'expense' },
  { name: 'Healthcare', type: 'expense' },
  { name: 'Debt Payments', type: 'expense' },
  { name: 'Entertainment', type: 'expense' },
  { name: 'Savings', type: 'income' },
  { name: 'Education', type: 'expense' },
  { name: 'Personal Care', type: 'expense' },
  { name: 'Gifts and Celebrations', type: 'expense' },
  { name: 'Insurance', type: 'expense' },
  { name: 'Charitable Donations', type: 'expense' },
  { name: 'Childcare', type: 'expense' },
  { name: 'Fitness and Recreation', type: 'expense' },
  { name: 'Taxes', type: 'expense' },
  { name: 'Miscellaneous', type: 'expense' },
  { name: 'Salary', type: 'income' }, // Added income category
  { name: 'Freelance Income', type: 'income' }, // Added income category
  { name: 'Investment Income', type: 'income' } // Added income category
];

db.serialize(() => {
  const insertCategory = db.prepare('INSERT INTO categories (name, type) VALUES (?, ?)');

  for (const category of categories) {
    insertCategory.run(category.name, category.type);
  }

  insertCategory.finalize();

  db.close();
});
