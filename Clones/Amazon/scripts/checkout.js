import {
  cart,
  removeFromCart,
  updateCartQuantity,
  updateDeliveryOption,
  calculatePaymentSummary,
  orders,
  saveToStorage,
  saveOrdersToStorage,
} from "../data/cart.js";
import { products } from "../data/products.js";
//exporting dayJs from the internet.For this esm version is used.
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOption } from "../data/deliveryOption.js";

const orderSummary = document.querySelector(".order-summary");

renderCart();
updateCartQuantity();
renderPaymentSummary();

function renderCart() {
  if (cart.length === 0) {
    document.querySelector(".checkout-grid").style.display = "none";
    document.querySelector(".page-title").innerHTML = "Your Cart is Empty";
  }
  let cartHtml = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingItem;
    products.forEach((prodItem) => {
      if (prodItem.id === productId) {
        matchingItem = prodItem;
      }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;

    let dOption;

    deliveryOption.forEach((option) => {
      if (option.id === deliveryOptionId) {
        dOption = option;
      }
    });
    const today = dayjs();
    const dateString = today
      .add(dOption.deliveryDays, "days")
      .format("dddd, MMMM D");
    cartHtml += `<div class="cart-item-container js-cart-item-container-${
      matchingItem.id
    }">
            <div class="delivery-date">Delivery date: ${dateString}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingItem.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">$${(
                  matchingItem.priceCents / 100
                ).toFixed(2)}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${
                    cartItem.quantity
                  }</span> </span>
                  <span class="update-quantity-link link-primary" data-product-id="${
                    matchingItem.id
                  }">
                    Update 
                  </span>
                  <input class="quantity-input" value="${cartItem.quantity}">
                  <span class="save-quantity-link link-primary" data-product-id="${
                    matchingItem.id
                  }">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-item" data-product-id=${
                    matchingItem.id
                  }>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingItem, cartItem)}
              </div>
            </div>
          </div>`;
  });
  orderSummary.innerHTML = cartHtml;

  orderSummary.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("delete-quantity-link")) {
      const productId = target.dataset.productId;
      removeFromCart(productId);
      renderCart();
      renderPaymentSummary();
    }

    if (target.classList.contains("update-quantity-link")) {
      const productId = target.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
    }

    if (target.classList.contains("save-quantity-link")) {
      const productId = target.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      const updatedQuantity = container.querySelector(".quantity-input").value;
      const quantityNumber = parseInt(updatedQuantity);
      if (quantityNumber && quantityNumber > 0) {
        const cartItem = cart.find((item) => item.productId === productId);
        if (cartItem) {
          cartItem.quantity = quantityNumber;
        }
        container.classList.remove("is-editing-quantity");
        renderCart();
        updateCartQuantity();
        renderPaymentSummary();
      } else {
        alert("Invalid quantity entered");
      }
    }
  });

  function deliveryOptionsHTML(matchingItem, cartItem) {
    let html = "";
    deliveryOption.forEach((option) => {
      const today = dayjs();
      const dateString = today
        .add(option.deliveryDays, "days")
        .format("dddd, MMMM D");
      const priceString =
        option.priceCents === 0
          ? "FREE"
          : `$ ${(option.priceCents / 100).toFixed(2)} -`;

      const isChecked = option.id === cartItem.deliveryOptionId;
      html += `<div class="delivery-option js-delivery-option" data-product-id="${
        matchingItem.id
      }" data-delivery-option-id="${option.id}">
                  <input
                    type="radio" ${isChecked ? "checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}"
                  />
                  <div>
                    <div class="delivery-option-date">${dateString}</div>
                    <div class="delivery-option-price">${priceString}  Shipping</div>
                  </div>
                </div>`;
    });
    return html;
  }

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderCart();
      renderPaymentSummary();
    });
  });
}

function renderPaymentSummary() {
  const paymentSummary = document.querySelector(".payment-summary");

  const {
    quantity,
    fullPrice,
    totalCharge,
    totalPriceBeforeTax,
    estimatedTax,
    orderTotal,
  } = calculatePaymentSummary(cart);

  paymentSummary.innerHTML = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div>Items (${quantity}):</div>
      <div class="payment-summary-money">$${fullPrice.toFixed(2)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${totalCharge.toFixed(2)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${totalPriceBeforeTax.toFixed(
        2
      )}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${estimatedTax.toFixed(2)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${orderTotal.toFixed(2)}</div>
    </div>

    <a id="placeOrder" href="../orders.html"><button class="place-order-button button-primary">
      Place your order
    </button></a>
  `;
}

document.querySelector(".place-order-button").addEventListener("click", () => {
  cart.forEach((item) => {
    orders.push(item);
  });
  cart.length = 0;
  saveOrdersToStorage();
  saveToStorage();
  renderCart();
  updateCartQuantity();
  renderPaymentSummary(cart);
});
