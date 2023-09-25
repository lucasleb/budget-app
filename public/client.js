document.addEventListener('DOMContentLoaded', () => {
  const categoryForm = document.getElementById('category-form');
  const categoryNameInput = document.getElementById('category-name');
  const categoryList = document.getElementById('category-list');
  const transactionForm = document.getElementById('transaction-form');
  const transactionList = document.getElementById('transaction-list');

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

      // Reference the transaction category dropdown
      const transactionCategoryDropdown = document.getElementById('transaction-category');

      // Clear existing options in the dropdown
      transactionCategoryDropdown.innerHTML = '';

      data.forEach(category => {
        const categoryListItem = createCategoryListItem(category);
        categoryList.appendChild(categoryListItem);

        // Create an option element for the dropdown
        const option = document.createElement('option');
        option.value = category.id; // Set the value to the category id
        option.textContent = category.name; // Set the text content to the category name
        transactionCategoryDropdown.appendChild(option);
      });
    });
}


  // Fetch and display categories when the page loads
  fetchAndDisplayCategories();

  // Handle form submission to create a new category
categoryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = categoryNameInput.value;
  const type = document.querySelector('input[name="category-type"]:checked').value;

  fetch('/api/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, type }) // Include the "type" property in the request
  })
    .then(response => response.json())
    .then(data => {
      // Update the category list after creating a new category
      fetchAndDisplayCategories();
      categoryNameInput.value = '';
    });
});

  // Handle form submission to add a new transaction
transactionForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const amount = document.getElementById('transaction-amount').value;
  const date = document.getElementById('transaction-date').value;
  const category = document.getElementById('transaction-category').value; // Get selected category ID
  const description = document.getElementById('transaction-description').value;

  // Check if a valid category ID was selected
  if (!category) {
    console.error('Invalid category selected.');
    return;
  }

  fetch('/api/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ categoryId: category, amount, date, description }) // Use categoryId instead of category
  })
    .then(response => response.json())
    .then(data => {
      const li = document.createElement('li');
      li.textContent = `${data.id}:  Amount: $${amount}, Date: ${date}, Category ID: ${category}, Description: ${description}`;
      transactionList.appendChild(li);

      // Clear form fields
      document.getElementById('transaction-amount').value = '';
      document.getElementById('transaction-date').value = '';
      document.getElementById('transaction-category').value = '';
      document.getElementById('transaction-description').value = '';
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
        if (confirm('Are you sure you want to delete this category and its associated transactions?')) {
          deleteCategory(categoryId);
        }
      }
    }
  });

  // Fetch and display transactions when the page loads
  function fetchAndDisplayTransactions() {
    fetch('/api/transactions')
      .then(response => response.json())
      .then(data => {
        transactionList.innerHTML = ''; // Clear the list before adding transactions
        data.forEach(transaction => {
          const transactionItem = createTransactionItem(transaction);
          transactionList.appendChild(transactionItem);
        });
      });
  }

  // Function to create a list item for a transaction
  function createTransactionItem(transaction) {
    const li = document.createElement('li');
    li.id = `transaction-${transaction.id}`;
    li.textContent = `Type: ${transaction.id}, Amount: $${transaction.amount}, Date: ${transaction.date}, Category: ${transaction.category}, Description: ${transaction.description}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-transaction');
    deleteButton.dataset.transactionId = transaction.id;

    li.appendChild(deleteButton);
    return li;
  }

  // ... (similar code for transactions)

  // Event listener for deleting a transaction
  transactionList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-transaction')) {
      const transactionId = event.target.dataset.transactionId;
      if (transactionId) {
        if (confirm('Are you sure you want to delete this transaction?')) {
          deleteTransaction(transactionId);
        }
      }
    }
  });



  // Fetch and display transactions when the page loads
  fetchAndDisplayTransactions();


});
