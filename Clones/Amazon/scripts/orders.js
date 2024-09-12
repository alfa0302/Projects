import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { products } from "../data/products.js";
import {
  cart,
  calculatePaymentSummary,
  saveToStorage,
  orders,
  saveOrdersToStorage,
} from "../data/cart.js";

const today = dayjs();

let track;

document.addEventListener("DOMContentLoaded", () => {
  const orderGrid = document.querySelector(".orders-grid");

  orderHistoryHtml(orderGrid);
  cartQuantity();

  const buyAgainButtons = document.querySelectorAll(".buy-again-button");
  buyAgainButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const item = cart.find((item) => item.productId === id);

      if (item) {
        item.quantity += 1;
      } else {
        cart.push({
          productId: id,
          quantity: 1,
          deliveryOptionId: "1",
        });
      }
      saveToStorage();
      cartQuantity();
      button.innerHTML = `<span class="buy-again-message">
                ✓ Added
              </span>`;
      setTimeout(() => {
        button.innerHTML = `<img class="buy-again-icon" src="images/icons/buy-again.png">
                  <span class="buy-again-message">Buy it again</span>`;
      }, 2000);
    });
  });

  const trackButtons = document.querySelectorAll(".track-package-button");
  trackButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const date = button.dataset.date;
      const orderDate = button.dataset.today;
      const quantity = button.dataset.quantity;
      track = { id: id, date: date, quantity: quantity, orderDate: today };
      saveTrackingId();
      window.location.href = "tracking.html";
    });
  });
});

function generateUUID() {
  const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  return template.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function orderHistoryHtml(orderGrid) {
  if (orders.length !== 0) {
    const orderTotal = calculatePaymentSummary(orders).orderTotal.toFixed(2);

    let gridHTML = localStorage.getItem("orderGrid") || "";
    const orderContainer = document.createElement("div");
    const spanContainer = document.createElement("span");
    orderContainer.classList.add("order-container");
    spanContainer.appendChild(orderContainer);

    const orderHeader = document.createElement("div");
    orderHeader.classList.add("order-header");
    orderHeader.innerHTML = `<div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${today.format("MMMM DD")}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${orderTotal}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${generateUUID()}</div>
            </div>`;

    const orderDetails = document.createElement("div");
    orderDetails.classList.add("order-details-grid");
    let ordersHTML = "";
    orders.forEach((item) => {
      const id = item.productId;
      const product = products.find((product) => product.id === id);
      const deliveryDate = findDeliveryDate(item.deliveryOptionId);
      console.log(deliveryDate.format());
      ordersHTML += `
            <div class="product-image-container">
              <img src="${product.image}" />
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">Arriving on: ${deliveryDate.format(
                "MMMM D"
              )}</div>
              <div class="product-quantity">Quantity: ${item.quantity}</div>
              <button class="buy-again-button button-primary" data-id="${
                item.productId
              }">
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a>
                <button class="track-package-button button-secondary" 
                        data-id="${item.productId}" 
                        data-date="${deliveryDate.format()}"
                        data-today="${today}"
                        data-quantity="${item.quantity}">
                  Track package
                </button>
              </a>
            </div>`;
    });
    orderDetails.innerHTML = ordersHTML;

    orderContainer.appendChild(orderHeader);
    orderContainer.appendChild(orderDetails);

    gridHTML = spanContainer.innerHTML + gridHTML;
    orderGrid.innerHTML = gridHTML;

    localStorage.setItem("orderGrid", orderGrid.innerHTML);
    orders.length = 0;
    saveOrdersToStorage();
    saveToStorage();
  } else {
    orderGrid.innerHTML = localStorage.getItem("orderGrid");
  }
}

function findDeliveryDate(deliveryOption) {
  const today = dayjs();
  let deliveryDate;
  if (deliveryOption == 1) {
    deliveryDate = today.add(7, "days");
  } else if (deliveryOption == 2) {
    deliveryDate = today.add(3, "days");
  } else if (deliveryOption == 3) {
    deliveryDate = today.add(1, "days");
  }
  return deliveryDate;
}

function cartQuantity() {
  document.querySelector(".cart-quantity").innerHTML =
    calculatePaymentSummary(cart).quantity;
}

function saveTrackingId() {
  localStorage.setItem("trackingId", JSON.stringify(track));
}
