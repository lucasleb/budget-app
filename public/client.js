// public/client.js
document.addEventListener('DOMContentLoaded', () => {
  const categoryForm = document.getElementById('category-form');
  const categoryNameInput = document.getElementById('category-name');
  const categoryList = document.getElementById('category-list');

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

});

