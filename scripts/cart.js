export let cart = JSON.parse(localStorage.getItem('cart')) || [];
export function addToCart(productId) {
      let matchingItem = cart.find(item => item.productId === productId);

    if (matchingItem) {
      matchingItem.quantity++;
    } else {
      cart.push({
        productId: productId,
        quantity: 1
      });
    }
    saveToLocalStorage();

}

export function updateCartQuantity() {
  const cartQuantityElement = document.querySelector('.cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cart.length;
  }
  saveToLocalStorage();
}

export const saveToLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function deleteCartItem(productId) {
  let newCart = [];
  cart.forEach(item => {
    if (item.productId !== productId) {
      newCart.push(item);
    }
    else{
      item.quantity--;
      if(item.quantity > 0) {
        document.querySelector('.js-quantity-label-' + productId).innerHTML = item.quantity;
        newCart.push(item);
      }else{
        document.querySelector('.js-cart-item-container-' + productId).remove();
      }
    }
  });
  cart = newCart;
  saveToLocalStorage();
  updateCartQuantity();
}