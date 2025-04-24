let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("productList");
const cartList = document.getElementById("cartList");
const cartTotal = document.getElementById("cartTotal");

function displayProducts() {
  productList.innerHTML = "";
  products.forEach((product, index) => {
    productList.innerHTML += `
      <div style="border:1px solid #ddd; margin-bottom:10px; padding:10px;">
        <h3>${product.name}</h3>
        <p>₦${product.price}</p>
        <img src="${product.image}" width="100" />
        <br>
        <button onclick="addToCart(${index})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(index) {
  const product = products[index];
  const cartItem = cart.find(item => item.name === product.name);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function displayCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartList.innerHTML += `
      <div>
        ${item.name} - ₦${item.price} x ${item.quantity}
        <button onclick="increase(${index})">+</button>
        <button onclick="decrease(${index})">-</button>
      </div>
    `;
  });

  cartTotal.textContent = total.toFixed(2);
}

function increase(index) {
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function decrease(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push({
    items: cart,
    status: "Pending"
  });

  localStorage.setItem("orders", JSON.stringify(orders));
  cart = [];
  localStorage.removeItem("cart");
  displayCart();
  alert("Order placed successfully!");
}

displayProducts();
displayCart();
