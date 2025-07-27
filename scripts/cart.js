import { products } from "../data/products.js";
import { deliveryOptions, formatMoney, orderSummary } from "../util/money.js";

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
  console.log("Cart saved to localStorage:", cart);
  // updateOrderSummary(cart);
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
  updateOrderSummary(cart);
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
  updateOrderSummary(cart);
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
  updateOrderSummary(cart);
  return htmlContent;
}

export function updateOrderSummary(cart) {
  console.log("jhoh", cart);
  let totalItems = 0;
  let totalPrice = 0;
  let deliveryPrice = 0;
  let totalPriceWithDelivery = 0;
  let tax = 0;
  let totalPriceWithTax = 0;

  if (cart.length > 0) {
    cart.forEach((item) => {
      const matchingItem = products.find((p) => p.id === item.productId);
      totalItems += 1;
      totalPrice += matchingItem.priceCents * item.quantity;
      let dPrice = deliveryOptions.find(
        (option) => option.deliveryOptionsId == item.deliveryOptionId
      ).price;

      deliveryPrice += dPrice === "Free Shipping" ? 0 : dPrice;
      console.log("flka", dPrice);
      console.log("matchingItem", matchingItem);
      console.log("deliveryPrice", deliveryPrice);
    });
    totalPriceWithDelivery = totalPrice + deliveryPrice;
    tax = totalPriceWithDelivery * 0.1; // Assuming a 10%
    totalPriceWithTax = totalPriceWithDelivery + tax;
    orderSummary.totalItems = totalItems;
    orderSummary.totalPrice = totalPrice;
    orderSummary.deliveryPrice = deliveryPrice;
    orderSummary.totalPriceWithDelivery = totalPriceWithDelivery;
    orderSummary.tax = tax;
    orderSummary.totalPriceWithTax = totalPriceWithTax;
  }

  console.log(orderSummary);
  let htmlContent = `<div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${totalItems}):</div>
            <div class="payment-summary-money">${formatMoney(totalPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${deliveryPrice}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${formatMoney(
              totalPriceWithDelivery
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatMoney(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${formatMoney(
              totalPriceWithTax
            )}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-button">
            Place your order
          </button>`;
  console.log("jkhfh", document.querySelector(".payment-summary").innerHTML);

  document.querySelector(".js-payment-summary").innerHTML = htmlContent;
}
