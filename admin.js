let products = JSON.parse(localStorage.getItem("products")) || [];
const form = document.getElementById("productForm");
const productList = document.getElementById("productList");

let editingIndex = null; // Track if we're editing

function displayProducts() {
  productList.innerHTML = "";
  products.forEach((product, index) => {
    productList.innerHTML += `
      <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
        <h3>${product.name}</h3>
        <p>Price: ₦${product.price}</p>
        <p>${product.description}</p>
        <img src="${product.image}" width="100" />
        <br>
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </div>
    `;
  });
}

function saveProduct(name, price, description, image) {
  if (editingIndex !== null) {
    // Update existing product
    products[editingIndex] = { name, price, description, image };
    editingIndex = null;
  } else {
    // Add new product
    products.push({ name, price, description, image });
  }

  localStorage.setItem("products", JSON.stringify(products));
  displayProducts();
  form.reset();
  form.querySelector("button[type='submit']").textContent = "Add Product";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.name.value;
  const price = form.price.value;
  const description = form.description.value;
  const imageURL = form.imageURL.value;
  const imageFile = form.imageFile.files[0];

  if (imageFile) {
    const reader = new FileReader();
    reader.onloadend = () => {
      saveProduct(name, price, description, reader.result);
    };
    reader.readAsDataURL(imageFile);
  } else {
    const image = imageURL || (editingIndex !== null ? products[editingIndex].image : "https://via.placeholder.com/100");
    saveProduct(name, price, description, image);
  }
});

function editProduct(index) {
  const product = products[index];
  form.name.value = product.name;
  form.price.value = product.price;
  form.description.value = product.description;
  form.imageURL.value = "";
  form.imageFile.value = "";
  editingIndex = index;
  form.querySelector("button[type='submit']").textContent = "Update Product";
}

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts();
}

// Start
displayProducts();
