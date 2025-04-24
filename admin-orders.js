const adminOrdersContainer = document.getElementById("adminOrdersContainer");
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function displayAdminOrders() {
  adminOrdersContainer.innerHTML = "";

  if (orders.length === 0) {
    adminOrdersContainer.innerHTML = "<p>No orders available.</p>";
    return;
  }

  orders.forEach((order, index) => {
    let itemsHtml = order.items.map(item => `
      <li>${item.name} - ₦${item.price} x ${item.quantity}</li>
    `).join("");

    adminOrdersContainer.innerHTML += `
      <div style="border:1px solid #aaa; padding:10px; margin-bottom:15px;">
        <h3>Order #${index + 1}</h3>
        <ul>${itemsHtml}</ul>
        <p>Status: <strong>${order.status}</strong></p>
        <button onclick="updateStatus(${index}, 'Accepted')">Accept</button>
        <button onclick="updateStatus(${index}, 'Rejected')">Reject</button>
      </div>
    `;
  });
}

function updateStatus(index, status) {
  orders[index].status = status;
  localStorage.setItem("orders", JSON.stringify(orders));
  displayAdminOrders();
}

displayAdminOrders();
