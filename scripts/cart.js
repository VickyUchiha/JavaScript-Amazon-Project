export let cart = []
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
}

export function updateCartQuantity() {
  const cartQuantityElement = document.querySelector('.cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cart.length;
  }
}