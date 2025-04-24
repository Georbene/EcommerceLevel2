const ordersContainer = document.getElementById("ordersContainer");
const orders = JSON.parse(localStorage.getItem("orders")) || [];

if (orders.length === 0) {
  ordersContainer.innerHTML = "<p>You haven't placed any orders yet.</p>";
} else {
  orders.forEach((order, index) => {
    let itemsHtml = order.items.map(item => `
      <li>${item.name} - ₦${item.price} x ${item.quantity}</li>
    `).join("");

    ordersContainer.innerHTML += `
      <div style="border:1px solid #ccc; padding:10px; margin-bottom:15px;">
        <h3>Order #${index + 1}</h3>
        <ul>${itemsHtml}</ul>
        <p><strong>Status:</strong> ${order.status}</p>
      </div>
    `;
  });
}
