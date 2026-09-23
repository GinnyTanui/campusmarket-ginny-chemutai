/* ============================================================
   CampusMarket — product detail page behavior
   Reads the product id from the URL (?id=), renders it into the
   page, and wires the quantity calculator, gallery, accordions
   and cart actions — all addEventListener, all with a live
   calculated total (Week 2 calculation + Week 3 events).
   ============================================================ */

let currentQty = 1;
let currentProduct = null;

function getProductIdFromURL() {
  return new URLSearchParams(window.location.search).get("id") || 1;
}

function renderProduct() {
  currentProduct = getProductById(getProductIdFromURL());
  if (!currentProduct) {
    document.querySelector("[data-product-root]").innerHTML =
      '<div class="empty-state">Sorry, we could not find that listing. <a class="text-primary-container underline" href="marketplace.html">Back to marketplace</a></div>';
    return;
  }

  document.title = currentProduct.name + " — CampusMarket";
  document.querySelector("[data-product-image]").src = currentProduct.image;
  document.querySelector("[data-product-image]").alt = currentProduct.name;
  document.querySelector("[data-product-name]").textContent = currentProduct.name;
  document.querySelector("[data-product-campus]").textContent = currentProduct.campus;
  document.querySelector("[data-product-condition]").textContent = currentProduct.condition;
  document.querySelector("[data-product-price]").textContent = formatKSh(currentProduct.price);
  document.querySelector("[data-product-description]").textContent = currentProduct.description;
  document.querySelector("[data-seller-name]").textContent = currentProduct.seller;
  document.querySelector("[data-seller-course]").textContent = currentProduct.sellerCourse;
  document.querySelector("[data-seller-rating]").textContent = `${currentProduct.rating} (${currentProduct.reviews} reviews)`;
  document.querySelector("[data-stock-max]").textContent = currentProduct.stock;

  const oldPriceEl = document.querySelector("[data-product-oldprice]");
  if (currentProduct.oldPrice) {
    oldPriceEl.textContent = formatKSh(currentProduct.oldPrice);
    oldPriceEl.classList.remove("hidden");
  } else {
    oldPriceEl.classList.add("hidden");
  }

  const specsEl = document.querySelector("[data-product-specs]");
  specsEl.innerHTML = Object.entries(currentProduct.specs)
    .map(([label, value]) => `
      <div class="p-2.5 rounded-lg bg-surface-container-low flex flex-col">
        <span class="font-label-sm text-outline">${label}</span>
        <span class="font-title-md text-[14px]">${value}</span>
      </div>
    `).join("");

  renderRelated();
  updateTotal();
}

function renderRelated() {
  const related = getRelatedProducts(currentProduct, 2);
  const wrap = document.querySelector("[data-related-grid]");
  if (!wrap) return;
  wrap.innerHTML = related.map(p => `
    <a href="product.html?id=${p.id}" class="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
      <div class="relative w-full aspect-square bg-surface-container-high overflow-hidden">
        <img alt="${p.name}" class="w-full h-full object-cover" src="${p.image}">
      </div>
      <div class="p-3">
        <span class="font-label-sm text-[11px] text-outline">${p.campus}</span>
        <h4 class="font-title-md text-[13px] text-on-surface line-clamp-2 mt-0.5 leading-snug">${p.name}</h4>
        <span class="font-price-display text-[16px] font-bold text-on-surface block mt-2">${formatKSh(p.price)}</span>
      </div>
    </a>
  `).join("");
}

function updateTotal() {
  document.querySelector("[data-qty-value]").textContent = currentQty;
  document.querySelector("[data-calculated-total]").textContent = formatKSh(currentProduct.price * currentQty);
}

function wireQuantity() {
  document.querySelector("[data-qty-minus]").addEventListener("click", () => {
    if (currentQty > 1) { currentQty--; updateTotal(); }
  });
  document.querySelector("[data-qty-plus]").addEventListener("click", () => {
    if (currentQty < currentProduct.stock) {
      currentQty++;
      updateTotal();
    } else {
      showToast(`Only ${currentProduct.stock} in stock from this seller`);
    }
  });
}

function wireCartActions() {
  document.querySelector("[data-add-to-cart-btn]").addEventListener("click", () => {
    addToCart(currentProduct.id, currentQty);
    showToast(`${currentProduct.name} added to your cart`);
  });
  document.querySelector("[data-buy-now-btn]").addEventListener("click", () => {
    addToCart(currentProduct.id, currentQty);
    showToast("Redirecting to secure checkout...");
    setTimeout(() => { window.location.href = "cart.html"; }, 900);
  });
  document.querySelector("[data-chat-seller-btn]").addEventListener("click", () => {
    showToast(`Opening chat with ${currentProduct.seller}...`);
  });
}

function wireWishlist() {
  const btn = document.querySelector("[data-wishlist-btn]");
  const icon = document.querySelector("[data-wishlist-icon]");
  let saved = false;
  btn.addEventListener("click", () => {
    saved = !saved;
    icon.style.fontVariationSettings = saved ? "'FILL' 1" : "'FILL' 0";
    icon.classList.toggle("text-error", saved);
    showToast(saved ? "Saved to your wishlist" : "Removed from wishlist");
  });
}

function wireAccordions() {
  document.querySelectorAll("[data-accordion-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const panel = document.getElementById(btn.getAttribute("data-accordion-toggle"));
      const icon = btn.querySelector(".accordion-icon");
      panel.classList.toggle("is-open");
      icon.classList.toggle("is-open");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProduct();
  if (currentProduct) {
    wireQuantity();
    wireCartActions();
    wireWishlist();
    wireAccordions();
  }
});
