const dataTableBody = document.getElementById("dataTableBody");
const addMeatButton = document.getElementById("addMeatButton");
const updateMeatButton = document.getElementById("updateMeatButton");

// Load existing products from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    storedProducts.forEach((product, index) => addRowToTable(product, index));
});

// Add new meat button click handler
addMeatButton.addEventListener("click", () => {
    const productName = document.getElementById("productName").value;
    const category = document.getElementById("category").value;
    const supplier = document.getElementById("supplier").value;
    const expDate = document.getElementById("expDate").value;
    const quantity = document.getElementById("quantity").value;
    const unitPrice = document.getElementById("unitPrice").value;
    const imageInput = document.getElementById("imageUpload").files[0];

    if (!productName || !category || !expDate || !quantity || !unitPrice || !imageInput) {
        alert("Please fill out all fields!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const product = {
            image: e.target.result,
            name: productName,
            category: category,
            supplier: supplier,
            quantity: quantity,
            price: parseFloat(unitPrice).toFixed(2),
            expDate: expDate,
        };

        // Save to local storage
        const products = JSON.parse(localStorage.getItem("products")) || [];
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));

        // Add row to table
        addRowToTable(product, products.length - 1);

        // Reset the form and close modal
        document.getElementById("addMeatForm").reset();
        $("#addMeatModal").modal("hide");
    };

    reader.readAsDataURL(imageInput);
});

// Function to add a row to the table
function addRowToTable(product, index) {
    const newRow = document.createElement("tr");
    newRow.setAttribute("data-index", index); // Store index for deletion
    newRow.innerHTML = `
        <td><img src="${product.image}" alt="Product" style="width: 50px; height: auto;"></td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.supplier}</td>
        <td>${product.quantity} kg</td>
        <td>₱${product.price}</td>
        <td>${product.expDate}</td>
        <td>
            <button class="btn btn-warning btn-sm update-btn">Update</button>
            <button class="btn btn-danger btn-sm delete-btn">Delete</button>
        </td>
    `;
    dataTableBody.appendChild(newRow);

    // Add delete functionality to the button
    newRow.querySelector(".delete-btn").addEventListener("click", () => deleteProduct(index));

    // Add update functionality to the button
    newRow.querySelector(".update-btn").addEventListener("click", () => loadProductForUpdate(index));
}

// Function to delete a product
function deleteProduct(index) {
    // Confirm deletion
    if (!confirm("Are you sure you want to delete this product?")) return;

    // Remove product from local storage
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));

    // Reload the table
    reloadTable();
}

// Function to reload the table
function reloadTable() {
    dataTableBody.innerHTML = ""; // Clear current rows
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    storedProducts.forEach((product, index) => addRowToTable(product, index)); // Rebuild rows
}

function loadProductForUpdate(index) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products[index];

    // Populate the update form
    document.getElementById("updateProductName").value = product.name;
    document.getElementById("updateCategory").value = product.category;
    document.getElementById("updateSupplier").value = product.supplier;
    document.getElementById("updateExpDate").value = product.expDate;
    document.getElementById("updateQuantity").value = product.quantity;
    document.getElementById("updateUnitPrice").value = product.price;
    document.getElementById("updateIndex").value = index;

    // Show the update modal
    $("#updateMeatModal").modal("show");
}

// Function to update a product
updateMeatButton.addEventListener("click", () => {
    const index = document.getElementById("updateIndex").value;
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Update the product details
    products[index] = {
        image: products[index].image, // Keep the old image
        name: document.getElementById("updateProductName").value,
        category: document.getElementById("updateCategory").value,
        supplier: document.getElementById("updateSupplier").value,
        quantity: document.getElementById("updateQuantity").value,
        price: parseFloat(document.getElementById("updateUnitPrice").value).toFixed(2),
        expDate: document.getElementById("updateExpDate").value,
    };

    // Save updated products to local storage
    localStorage.setItem("products", JSON.stringify(products));

    // Reload the table
    reloadTable();

    // Close the update modal
    $("#updateMeatModal").modal("hide");
});


    const userTableBody = document.getElementById('userTableBody');
    const saveUserButton = document.getElementById('saveUserButton');
    const addUserForm = document.getElementById('addUserForm');

    // Load users from localStorage on page load
    document.addEventListener('DOMContentLoaded', loadUsers);

    // Add User functionality
    saveUserButton.addEventListener('click', () => {
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      if (!name || !email || !password) {
        alert('Please fill in all fields!');
        return;
      }

      const user = { name, email, password };

      addUserToTable(user);
      saveUserToLocalStorage(user);

      // Clear form inputs and close the modal
      addUserForm.reset();
      $('#addUserModal').modal('hide');
    });

    // Load users from localStorage
    function loadUsers() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.forEach(addUserToTable);
    }

    // Save user to localStorage
    function saveUserToLocalStorage(user) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    }

    // Delete user from localStorage
    function deleteUserFromLocalStorage(email) {
      let users = JSON.parse(localStorage.getItem('users')) || [];
      users = users.filter(user => user.email !== email);
      localStorage.setItem('users', JSON.stringify(users));
    }

    // Add user to the table
    function addUserToTable(user) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.name}</td>
        <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
      `;

      // Add delete button functionality
      row.querySelector('.delete-btn').addEventListener('click', () => {
        row.remove();
        deleteUserFromLocalStorage(user.email);
      });

      userTableBody.appendChild(row);
    }

