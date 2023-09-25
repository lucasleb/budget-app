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
  });

  