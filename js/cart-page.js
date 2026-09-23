/* ============================================================
   CampusMarket — cart page behavior
   Renders the cart from localStorage, recalculates totals live
   as quantities change or an item is removed (Week 2 calc +
   Week 3 events), and handles the delivery-option choice.
   ============================================================ */

let deliveryFee = 0;

function rowHTML(item, product) {
  return `
    <div class="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm" data-cart-row="${product.id}">
      <div class="flex gap-space-sm">
        <a href="product.html?id=${product.id}" class="relative w-24 h-24 rounded-lg overflow-hidden bg-surface-container shrink-0 block">
          <img alt="${product.name}" class="w-full h-full object-cover" src="${product.image}">
        </a>
        <div class="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between gap-1">
              <a href="product.html?id=${product.id}" class="font-title-md text-title-md text-on-surface line-clamp-2 leading-snug hover:text-primary-container">${product.name}</a>
              <button data-remove-item="${product.id}" aria-label="Remove item" class="w-8 h-8 -mr-1 -mt-1 flex items-center justify-center text-outline hover:text-error transition-colors rounded-full">
                <span class="material-symbols-outlined text-[20px]">delete</span>
              </button>
            </div>
            <p class="font-label-sm text-label-sm text-on-surface-variant truncate mt-1">${product.seller} • ${product.campus}</p>
          </div>
          <span class="font-price-display text-price-display text-secondary font-extrabold">${formatKSh(product.price)}</span>
        </div>
      </div>
      <div class="flex items-center justify-between pt-space-xs bg-surface-container-low/60 -mx-space-md -mb-space-md p-space-md rounded-b-xl">
        <span class="font-label-sm text-label-sm text-on-surface-variant">Line total: <strong data-line-total>${formatKSh(product.price * item.qty)}</strong></span>
        <div class="flex items-center gap-space-sm bg-surface-container-lowest px-2 py-1 rounded-full shadow-sm">
          <button data-qty-minus="${product.id}" class="w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors">
            <span class="material-symbols-outlined text-[16px]">remove</span>
          </button>
          <span class="font-title-md text-title-md text-on-surface font-bold w-4 text-center" data-qty-value>${item.qty}</span>
          <button data-qty-plus="${product.id}" class="w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors">
            <span class="material-symbols-outlined text-[16px]">add</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderCartPage() {
  const cart = getCart();
  const list = document.querySelector("[data-cart-list]");
  const emptyState = document.querySelector("[data-cart-empty]");
  const summary = document.querySelector("[data-cart-summary]");

  if (cart.length === 0) {
    list.innerHTML = "";
    emptyState.classList.remove("hidden");
    summary.classList.add("hidden");
    updateTotals();
    return;
  }

  emptyState.classList.add("hidden");
  summary.classList.remove("hidden");

  list.innerHTML = cart.map(item => {
    const product = getProductById(item.id);
    return product ? rowHTML(item, product) : "";
  }).join("");

  wireRowButtons();
  updateTotals();
}

function wireRowButtons() {
  document.querySelectorAll("[data-remove-item]").forEach(btn => {
    btn.addEventListener("click", () => {
      removeFromCart(Number(btn.getAttribute("data-remove-item")));
      renderCartPage();
      showToast("Item removed from cart");
    });
  });
  document.querySelectorAll("[data-qty-minus]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-qty-minus"));
      const item = getCart().find(i => i.id === id);
      if (item && item.qty > 1) {
        updateCartQty(id, item.qty - 1);
        renderCartPage();
      }
    });
  });
  document.querySelectorAll("[data-qty-plus]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-qty-plus"));
      const item = getCart().find(i => i.id === id);
      const product = getProductById(id);
      if (item && product && item.qty < product.stock) {
        updateCartQty(id, item.qty + 1);
        renderCartPage();
      } else {
        showToast("No more stock available from this seller");
      }
    });
  });
}

function wireDeliveryOptions() {
  document.querySelectorAll("[name='delivery_option']").forEach(radio => {
    radio.addEventListener("change", () => {
      deliveryFee = Number(radio.value);
      document.querySelector("[data-delivery-label]").textContent = radio.dataset.label;
      updateTotals();
    });
  });
}

function updateTotals() {
  const subtotal = cartSubtotal();
  const total = subtotal + deliveryFee;
  document.querySelector("[data-summary-count]").textContent = cartItemCount();
  document.querySelector("[data-summary-subtotal]").textContent = formatKSh(subtotal);
  document.querySelector("[data-summary-total]").textContent = formatKSh(total);
  const checkoutBtn = document.querySelector("[data-checkout-btn-text]");
  if (checkoutBtn) checkoutBtn.textContent = `Proceed to Secure Checkout (${formatKSh(total)})`;
}

function wireCheckout() {
  const btn = document.querySelector("[data-checkout-btn]");
  if (!btn) return;
  btn.addEventListener("click", () => {
    if (cartItemCount() === 0) {
      showToast("Your cart is empty");
      return;
    }
    showToast("Routing to Campus Escrow checkout...");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
  wireDeliveryOptions();
  wireCheckout();
});
