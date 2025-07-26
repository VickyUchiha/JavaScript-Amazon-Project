import { deliveryOptions } from "../util/money.js";

export let cart = JSON.parse(localStorage.getItem("cart")) || [];
export function addToCart(productId) {
  let matchingItem = cart.find((item) => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: 1, // Default to the first delivery option
    });
  }
  saveToLocalStorage();
}

export function updateCartQuantity() {
  const cartQuantityElement = document.querySelector(".cart-quantity");
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cart.length;
  }
  saveToLocalStorage();
}

export const saveToLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export function deleteCartItem(productId) {
  let newCart = [];
  cart.forEach((item) => {
    if (item.productId !== productId) {
      newCart.push(item);
    } else {
      item.quantity--;
      if (item.quantity > 0) {
        document.querySelector(".js-quantity-label-" + productId).innerHTML =
          item.quantity;
        newCart.push(item);
      } else {
        document.querySelector(".js-cart-item-container-" + productId).remove();
      }
    }
  });
  cart = newCart;
  saveToLocalStorage();
  updateCartQuantity();
  if (cart.length === 0) {
    NoProductsFound();
  }
}

export function NoProductsFound() {
  document.querySelector(".order-summary").innerHTML = `<div class="no-orders">
  <div class="no-orders-icon">📦</div>
  <h2>No Orders Found</h2>
  <p>You haven’t placed any orders yet. Start shopping now!</p>
  <a class="shop-now-btn" href="./amazon.html">Shop Now</a>
</div>
`;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  console.log(productId, deliveryOptionId);
  const matchingItem = cart.find((item) => item.productId === productId);
  if (matchingItem) {
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToLocalStorage();
    document.querySelector(
      ".js-delivery-option-" + productId + "-" + deliveryOptionId
    ).checked = true;
  }
}

export function deliveryOptionsHTML(item) {
  let htmlContent = "";
  console.log(item);
  console.log(deliveryOptions);
  deliveryOptions.forEach((option) => {
    let checked = false;
    if (option.deliveryOptionsId === parseInt(item.deliveryOptionId)) {
      checked = true;
    }
    htmlContent += `
                <div class="delivery-option">
                  <input type="radio" ${checked ? "checked" : ""}
                    class="delivery-option-input js-delivery-option-${
                      item.productId
                    }-${option.deliveryOptionsId}"
                    name="delivery-option-${item.productId}" data-product-id="${
      item.productId
    }" data-delivery-option-id="${option.deliveryOptionsId}">
                  <div>
                    <div class="delivery-option-date">
                      ${option.date}
                    </div>
                    <div class="delivery-option-price">
                      ${option.price}
                    </div>
                  </div>
                </div>`;
  });
  console.log(htmlContent);
  return htmlContent;
}
