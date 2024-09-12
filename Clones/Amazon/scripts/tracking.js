import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { calculatePaymentSummary, cart } from "../data/cart.js";
import { products } from "../data/products.js";
function cartQuantity() {
  document.querySelector(".cart-quantity").innerHTML =
    calculatePaymentSummary(cart).quantity;
}
cartQuantity();

document.addEventListener("DOMContentLoaded", () => {
  let tracking = JSON.parse(localStorage.getItem("trackingId"));
  const item = products.find((item) => item.id === tracking.id);
  const name = item.name;
  const image = item.image;
  const trackingGrid = document.querySelector(".order-tracking");

  const orderDate = new Date(tracking.orderDate);
  const shippingDate = new Date(orderDate);
  shippingDate.setDate(orderDate.getDate() + 1);
  const arrivalDate = new Date(tracking.date);
  const today = new Date();
  let status = "Preparing";
  if (today >= shippingDate && today < arrivalDate) {
    status = "Shipped";
  } else if (today >= arrivalDate) {
    status = "Delivered";
  }
  const progressWidth =
    status === "Shipped" ? "50%" : status === "Delivered" ? "100%" : "10%";
  const progressLabels = ["Preparing", "Shipped", "Delivered"];
  const progressClass = ["", "", ""];

  if (status === "Shipped") {
    progressClass[1] = "current-status";
  } else if (status === "Delivered") {
    progressClass[2] = "current-status";
  } else {
    progressClass[0] = "current-status";
  }

  trackingGrid.innerHTML = `<a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">Arriving on ${dayjs(arrivalDate).format(
          "dddd,MMMM DD"
        )}</div>

        <div class="product-info">
          ${name}
        </div>

        <div class="product-info">Quantity: ${tracking.quantity}</div>

        <img
          class="product-image"
          src="${image}"
        />

        <div class="progress-labels-container">
          <div class="progress-label ${progressClass[0]}">Preparing</div>
      <div class="progress-label ${progressClass[1]}">Shipped</div>
      <div class="progress-label ${progressClass[2]}">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${progressWidth}"></div>
        </div>`;
});
