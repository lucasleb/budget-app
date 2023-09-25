const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

const transactions = [
    { category: 'Housing', description: 'Rent Payment', amount: 1000.0, date: '2023-08-01' },
    { category: 'Transportation', description: 'Gasoline', amount: 50.0, date: '2023-08-02' },
    { category: 'Groceries', description: 'Grocery Shopping', amount: 150.0, date: '2023-08-03' },
    { category: 'Healthcare', description: 'Doctor Visit', amount: 75.0, date: '2023-08-05' },
    { category: 'Debt Payments', description: 'Credit Card Payment', amount: 200.0, date: '2023-08-06' },
    { category: 'Entertainment', description: 'Movie Night', amount: 30.0, date: '2023-08-08' },
    { category: 'Savings', description: 'Savings Deposit', amount: 500.0, date: '2023-08-10' },
    { category: 'Education', description: 'Online Course Fee', amount: 75.0, date: '2023-08-12' },
    { category: 'Personal Care', description: 'Haircut', amount: 25.0, date: '2023-08-15' },
    { category: 'Gifts and Celebrations', description: 'Birthday Gift', amount: 50.0, date: '2023-08-20' },
    { category: 'Insurance', description: 'Health Insurance Premium', amount: 150.0, date: '2023-08-25' },
    { category: 'Charitable Donations', description: 'Donation to Charity', amount: 20.0, date: '2023-08-28' },
    { category: 'Childcare', description: 'Childcare Expenses', amount: 100.0, date: '2023-08-30' },
    { category: 'Fitness and Recreation', description: 'Gym Membership', amount: 40.0, date: '2023-08-31' },
    { category: 'Taxes', description: 'Income Tax Payment', amount: 300.0, date: '2023-09-01' },
    { category: 'Miscellaneous', description: 'Online Shopping', amount: 75.0, date: '2023-09-03' },
    { category: 'Salary', description: 'Monthly Salary', amount: 2500.0, date: '2023-08-15' },
    { category: 'Freelance Income', description: 'Freelance Project Payment', amount: 800.0, date: '2023-09-05' },
    { category: 'Investment Income', description: 'Stock Dividends', amount: 50.0, date: '2023-09-10' },
    { category: 'Groceries', description: 'Grocery Shopping', amount: 100.0, date: '2023-09-12' },
    { category: 'Entertainment', description: 'Concert Tickets', amount: 60.0, date: '2023-09-15' },
    { category: 'Transportation', description: 'Gasoline', amount: 45.0, date: '2023-09-18' },
    { category: 'Healthcare', description: 'Dental Checkup', amount: 80.0, date: '2023-09-20' },
    { category: 'Debt Payments', description: 'Loan Repayment', amount: 150.0, date: '2023-09-22' },
    { category: 'Gifts and Celebrations', description: 'Anniversary Gift', amount: 70.0, date: '2023-09-25' },
    { category: 'Housing', description: 'Rent Payment', amount: 1000.0, date: '2023-10-01' },
    { category: 'Groceries', description: 'Grocery Shopping', amount: 120.0, date: '2023-10-03' },
    { category: 'Transportation', description: 'Public Transit Pass', amount: 60.0, date: '2023-10-05' },
    { category: 'Entertainment', description: 'Movie Night', amount: 35.0, date: '2023-10-08' },
    { category: 'Savings', description: 'Savings Deposit', amount: 500.0, date: '2023-10-10' },
    { category: 'Education', description: 'Book Purchase', amount: 25.0, date: '2023-10-12' },
    { category: 'Healthcare', description: 'Prescription Medication', amount: 45.0, date: '2023-10-15' },
    { category: 'Gifts and Celebrations', description: 'Gift for Friend', amount: 30.0, date: '2023-10-20' },
    { category: 'Insurance', description: 'Auto Insurance Premium', amount: 100.0, date: '2023-10-25' },
    { category: 'Charitable Donations', description: 'Charity Event Donation', amount: 40.0, date: '2023-10-28' },
    { category: 'Childcare', description: 'Babysitter Fees', amount: 70.0, date: '2023-10-30' },
    { category: 'Fitness and Recreation', description: 'Yoga Class', amount: 15.0, date: '2023-10-31' },
    { category: 'Taxes', description: 'Property Tax Payment', amount: 200.0, date: '2023-11-01' },
    { category: 'Miscellaneous', description: 'Tech Gadgets Purchase', amount: 120.0, date: '2023-11-03' },
    { category: 'Salary', description: 'Monthly Salary', amount: 2500.0, date: '2023-10-15' },
    { category: 'Freelance Income', description: 'Freelance Project Payment', amount: 750.0, date: '2023-11-05' },
    { category: 'Investment Income', description: 'Dividend Stocks', amount: 55.0, date: '2023-11-10' },
    { category: 'Groceries', description: 'Grocery Shopping', amount: 110.0, date: '2023-11-12' },
    { category: 'Entertainment', description: 'Concert Tickets', amount: 70.0, date: '2023-11-15' },
    { category: 'Transportation', description: 'Gasoline', amount: 55.0, date: '2023-11-18' },
    { category: 'Healthcare', description: 'Dental Checkup', amount: 85.0, date: '2023-11-20' }
  ]
  ;

db.serialize(() => {
  const insertTransaction = db.prepare('INSERT INTO transactions (categoryId, amount, date, description) VALUES (?, ?, ?, ?)');
  
  for (const transaction of transactions) {
    const categoryId = getCategoryIdByName(transaction.category);
    insertTransaction.run(categoryId, transaction.amount, transaction.date, transaction.description);
  }

  insertTransaction.finalize();

  db.close();
});

// Helper function to get category ID by name
function getCategoryIdByName(categoryName) {
  // Replace with a database query to get the category ID by name
  // For now, we'll assume that category names are unique
  return 1; // Replace with the actual category ID
}

