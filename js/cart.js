/* ============================================================
   CampusMarket — cart storage
   No server yet (that's Week 7+), so the cart lives in the
   browser's localStorage. Every page that touches the cart
   (product detail, marketplace quick-add, the cart page, the
   header badge) reads and writes through these same functions
   so the count always stays correct across pages.
   ============================================================ */

const CART_KEY = "campusmarket_cart";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Could not read cart from storage", err);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart(cart);
}

function updateCartQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, qty);
  saveCart(cart);
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
}

function cartItemCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function cartSubtotal() {
  return getCart().reduce((sum, item) => {
    const product = getProductById(item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);
}

// Every page's header has a cart badge with data-cart-badge — keep it in sync on load.
function updateCartBadge() {
  document.querySelectorAll("[data-cart-badge]").forEach(el => {
    el.textContent = cartItemCount();
  });
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
