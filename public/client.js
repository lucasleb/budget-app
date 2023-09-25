// public/client.js
document.addEventListener('DOMContentLoaded', () => {
    const categoryForm = document.getElementById('category-form');
    const categoryNameInput = document.getElementById('category-name');
    const categoryList = document.getElementById('category-list');
  
    // Fetch existing categories and display them
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => {
        data.forEach(category => {
          const li = document.createElement('li');
          li.textContent = category.name;
          categoryList.appendChild(li);
        });
      });
  
    // Handle form submission to create a new category
    categoryForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = categoryNameInput.value;
  
      fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      })
      .then(response => response.json())
      .then(data => {
        const li = document.createElement('li');
        li.textContent = data.id + ': ' + name;
        categoryList.appendChild(li);
        categoryNameInput.value = '';
      });
    });

    // Fetch existing categories and populate the dropdown
  fetch('/api/categories')
    .then(response => response.json())
    .then(data => {
      const categoryDropdown = document.getElementById('expense-category');
      data.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categoryDropdown.appendChild(option);
      });
    });

  // Handle form submission to add a new expense
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  expenseForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const price = document.getElementById('expense-price').value;
    const date = document.getElementById('expense-date').value;
    const categoryId = document.getElementById('expense-category').value;
    const description = document.getElementById('expense-description').value;

    fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ price, date, categoryId, description })
    })
    .then(response => response.json())
    .then(data => {
      const li = document.createElement('li');
      li.textContent = `${data.id}: $${price}, Date: ${date}, Category: ${categoryId}, Description: ${description}`;
      expenseList.appendChild(li);
      
      // Clear form fields
      document.getElementById('expense-price').value = '';
      document.getElementById('expense-date').value = '';
      document.getElementById('expense-category').value = '';
      document.getElementById('expense-description').value = '';
    });
  });
});

