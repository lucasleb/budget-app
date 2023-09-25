// public/client.js
document.addEventListener('DOMContentLoaded', () => {
  const categoryForm = document.getElementById('category-form');
  const categoryNameInput = document.getElementById('category-name');
  const categoryList = document.getElementById('category-list');
  const incomeForm = document.getElementById('income-form');
  const incomeList = document.getElementById('income-list');



  // Function to create a category list item with a delete button
  function createCategoryListItem(category) {
    const li = document.createElement('li');
    li.id = `category-${category.id}`;
    li.textContent = category.name;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-category');
    deleteButton.dataset.categoryId = category.id;

    li.appendChild(deleteButton);
    return li;
  }

  // Function to fetch and display categories
  function fetchAndDisplayCategories() {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => {
        categoryList.innerHTML = ''; // Clear the list before adding categories
        data.forEach(category => {
          const categoryListItem = createCategoryListItem(category);
          categoryList.appendChild(categoryListItem);
        });
      });
  }

  // Fetch and display categories when the page loads
  fetchAndDisplayCategories();

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
        // Update the category list after creating a new category
        fetchAndDisplayCategories();
        categoryNameInput.value = '';
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

  // Function to delete a category
  function deleteCategory(categoryId) {
    fetch(`/api/categories/${categoryId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.status === 200) {
        // If deletion is successful, remove the category from the UI
        const categoryToRemove = document.getElementById(`category-${categoryId}`);
        if (categoryToRemove) {
          categoryToRemove.remove();
        }
      }
    })
    .catch(error => console.error('Error deleting category:', error));
  }

  // ...

  // Event listener for deleting a category
  categoryList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-category')) {
      const categoryId = event.target.dataset.categoryId;
      if (categoryId) {
        if (confirm('Are you sure you want to delete this category and its associated expenses?')) {
          deleteCategory(categoryId);
        }
      }
    }
  });

  // Fetch existing income categories and display them
  function fetchAndDisplayIncomeCategories() {
    fetch('/api/incomes/categories')
      .then(response => response.json())
      .then(data => {
        // Populate a dropdown or list with income categories
        // Similar to how you populated expense categories
      });
  }

  // Function to create a list item for income
  function createIncomeListItem(income) {
    const li = document.createElement('li');
    li.id = `income-${income.id}`;
    li.textContent = `Category: ${income.category}, Amount: $${income.amount}, Date: ${income.date}, Description: ${income.description}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-income');
    deleteButton.dataset.incomeId = income.id;

    li.appendChild(deleteButton);
    return li;
  }

  // Fetch and display incomes when the page loads
  function fetchAndDisplayIncomes() {
    fetch('/api/incomes')
      .then(response => response.json())
      .then(data => {
        const incomeList = document.getElementById('income-list');
        incomeList.innerHTML = ''; // Clear the list before adding incomes
        data.forEach(income => {
          const incomeListItem = createIncomeListItem(income);
          incomeList.appendChild(incomeListItem);
        });
      });
  }

  // ... (similar code for expenses)

  // Event listener for submitting an income
  incomeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const category = document.getElementById('income-category').value;
    const amount = document.getElementById('income-amount').value;
    const date = document.getElementById('income-date').value;
    const description = document.getElementById('income-description').value;

    fetch('/api/incomes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ category, amount, date, description })
    })
    .then(response => response.json())
    .then(data => {
      const li = createIncomeListItem({
        id: data.id,
        category,
        amount,
        date,
        description
      });
      const incomeList = document.getElementById('income-list');
      incomeList.appendChild(li);

      // Clear form fields
      document.getElementById('income-category').value = '';
      document.getElementById('income-amount').value = '';
      document.getElementById('income-date').value = '';
      document.getElementById('income-description').value = '';
    });
  });

  // Function to delete an income
  function deleteIncome(incomeId) {
    fetch(`/api/incomes/${incomeId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.status === 200) {
        // If deletion is successful, remove the income from the UI
        const incomeToRemove = document.getElementById(`income-${incomeId}`);
        if (incomeToRemove) {
          incomeToRemove.remove();
        }
      }
    })
    .catch(error => console.error('Error deleting income:', error));
  }

  // Event listener for deleting an income
  incomeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-income')) {
      const incomeId = event.target.dataset.incomeId;
      if (incomeId) {
        if (confirm('Are you sure you want to delete this income?')) {
          deleteIncome(incomeId);
        }
      }
    }
  });

  // Fetch and display income categories and incomes when the page loads
  fetchAndDisplayIncomeCategories();
  fetchAndDisplayIncomes();

});

