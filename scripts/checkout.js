import { products } from "../data/products.js";
import {
  cart,
  addToCart,
  updateCartQuantity,
  deleteCartItem,
  NoProductsFound,
  deliveryOptionsHTML,
  updateDeliveryOption,
} from "./cart.js";
import { formatMoney } from "../util/money.js";

console.log(dayjs().format("dddd, MMMM d"));
let htmlContent;
if (cart && cart.length > 0) {
  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.productId);
    htmlContent += `<div class="cart-item-container js-cart-item-container-${
      item.productId
    }" data-product-id="${item.productId}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  ${formatMoney(product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${
                      item.productId
                    }">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary" data-product-id="${
                    item.productId
                  }">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-${
                    item.productId
                  }" data-product-id="${item.productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options" data-product-id="${item.productId}">
              <div class="delivery-options-title">
                  Choose a delivery option:
              </div>
                ${deliveryOptionsHTML(item)}
              </div>
            </div>
          </div>`;
  });
  document.querySelector(".order-summary").innerHTML = htmlContent;

  document.querySelectorAll(".delete-quantity-link").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      deleteCartItem(productId);
      updateCartQuantity();
    });
  });
  document.querySelectorAll(".update-quantity-link").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      const matchingItem = cart.find((item) => item.productId === productId);
      if (matchingItem) {
        matchingItem.quantity++;
      }
      updateCartQuantity();
      document.querySelector(".js-quantity-label-" + productId).innerHTML =
        matchingItem.quantity;
    });
  });
  document.querySelectorAll(".delivery-option-input").forEach((button) => {
    button.addEventListener("change", () => {
      const productId = button.dataset.productId;
      const deliveryOptionId = button.dataset.deliveryOptionId;
      console.log("Delivery option changed for product:", productId);
      updateDeliveryOption(productId, deliveryOptionId);
    });
  });
} else {
  NoProductsFound();
}
