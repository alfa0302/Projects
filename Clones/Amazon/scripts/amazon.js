import { products } from "../data/products.js";
import { cart, addToCart } from "../data/cart.js";
const productsGrid = document.querySelector(".products-grid");
let timeoutId;

function generateProductsHtml(products) {
  productsGrid.innerHTML = "";
  products.forEach((product) => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("product-container");
    productContainer.innerHTML = `
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${(product.priceCents / 100).toFixed(
            2
          )}</div>

          <div class="product-quantity-container">
            <select class='js-quantity-${product.id}'>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart added-${product.id}">
            <img src="images/icons/checkmark.png" /> 
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id = '${
            product.id
          }'>Add to Cart</button>`;

    productsGrid.appendChild(productContainer);
  });
  addEventListeners();
}
generateProductsHtml(products);

function addEventListeners() {
  let filteredProducts = [];
  document.querySelector(".search-button").addEventListener("click", () => {
    const searchTerm = document.querySelector(".search-bar").value;

    if (searchTerm) {
      filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredProducts.length !== 0) {
        generateProductsHtml(filteredProducts);
      } else {
        document.querySelector(".main").innerHTML =
          "<div>No products matched your search.</div>";
      }
    } else {
      generateProductsHtml(products);
    }
  });

  const addToCartButtons = document.querySelectorAll(".js-add-to-cart-button");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      const quantity = parseInt(
        document.querySelector(`.js-quantity-${productId}`).value
      );
      const addedProduct = document.querySelector(`.added-${productId}`);

      addToCart(productId, quantity);

      updateCartQuantity();

      addedProduct.style.opacity = "1";
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        addedProduct.style.opacity = "0";
      }, 2000);
    });
  });
}

updateCartQuantity();
function updateCartQuantity() {
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  document.querySelector(".cart-quantity").textContent = totalQuantity;
}
