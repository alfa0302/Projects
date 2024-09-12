import { products } from "./products.js";
import { deliveryOption } from "./deliveryOption.js";
export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export let orders = JSON.parse(localStorage.getItem("order")) || [];

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function addToCart(productId, quantity) {
  let matchingItem;
  cart.forEach((product) => {
    if (product.productId === productId) {
      matchingItem = product;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((item) => {
    if (item.productId !== productId) {
      newCart.push(item);
    }
  });
  cart = newCart;
  saveToStorage();
  updateCartQuantity();
}

export function updateCartQuantity() {
  const itemCount = document.querySelector(".return-to-home-link");
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  itemCount.textContent = `${totalQuantity} items`;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((product) => {
    if (product.productId === productId) {
      matchingItem = product;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function calculatePaymentSummary(cart) {
  let quantity = 0;
  let fullPrice = 0;
  let totalCharge = 0;

  if (cart.length !== 0) {
    cart.forEach((item) => {
      quantity += item.quantity;

      const product = products.find((product) => product.id === item.productId);
      const itemPrice = product.priceCents / 100;
      fullPrice += itemPrice * item.quantity;

      const shippingOption = deliveryOption.find(
        (option) => option.id === item.deliveryOptionId
      );
      totalCharge += shippingOption.priceCents / 100;
    });
  } else {
    orders.forEach((item) => {
      quantity += item.quantity;

      const product = products.find((product) => product.id === item.productId);
      const itemPrice = product.priceCents / 100;
      fullPrice += itemPrice * item.quantity;

      const shippingOption = deliveryOption.find(
        (option) => option.id === item.deliveryOptionId
      );
      totalCharge += shippingOption.priceCents / 100;
    });
  }

  const totalPriceBeforeTax = fullPrice + totalCharge;
  const estimatedTax = totalPriceBeforeTax * 0.1;
  const orderTotal = totalPriceBeforeTax + estimatedTax;

  return {
    quantity,
    fullPrice,
    totalCharge,
    totalPriceBeforeTax,
    estimatedTax,
    orderTotal,
  };
}

export function saveOrdersToStorage() {
  localStorage.setItem("order", JSON.stringify(orders));
}
