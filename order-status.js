const statusContainer = document.getElementById("statusContainer");
const orders = JSON.parse(localStorage.getItem("orders")) || [];

if (orders.length === 0) {
  statusContainer.innerHTML = "<p>No orders placed yet.</p>";
} else {
  orders.forEach((order, index) => {
    statusContainer.innerHTML += `
      <div style="margin-bottom: 10px; border: 1px solid #ddd; padding: 10px;">
        <p><strong>Order #${index + 1}</strong>: ${order.status}</p>
      </div>
    `;
  });
}
