/* ============================================================
   CampusMarket — home page behavior
   Loops through PRODUCTS (Week 2: control structures + loops),
   builds product cards via the DOM (Week 2: DOM manipulation),
   and wires every button with addEventListener (Week 3).
   ============================================================ */

function productCardHTML(product) {
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return `
    <div class="flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      <a href="product.html?id=${product.id}" class="relative aspect-square w-full bg-surface-container-low overflow-hidden block">
        <img alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="${product.image}">
        <div class="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-surface-container-lowest text-tertiary font-label-sm text-label-sm font-bold shadow-sm">
          ${product.condition}
        </div>
      </a>
      <div class="p-3 flex flex-col justify-between flex-1 gap-2">
        <div>
          <div class="flex items-center gap-1 text-on-surface-variant font-body-sm text-body-sm mb-1">
            <span class="material-symbols-outlined text-[14px] text-primary-container">pin_drop</span>
            <span class="truncate">${product.campus}</span>
          </div>
          <a href="product.html?id=${product.id}" class="font-title-md text-title-md text-on-surface font-semibold line-clamp-2 leading-snug hover:text-primary-container">
            ${product.name}
          </a>
        </div>
        <div class="pt-1 flex flex-col gap-2">
          <div class="flex items-baseline gap-1.5">
            <span class="font-price-display text-price-display text-on-surface font-extrabold">${formatKSh(product.price)}</span>
            ${discount ? `<span class="text-error font-label-sm text-label-sm font-bold">${discount}% off</span>` : ""}
          </div>
          <button data-add-to-cart="${product.id}" class="w-full bg-primary-container text-on-primary py-2 rounded-lg font-label-md text-label-md flex items-center justify-center gap-1 active:scale-95 transition-transform min-h-[44px]">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderFeatured() {
  const grid = document.querySelector("[data-featured-grid]");
  if (!grid) return;
  const featured = PRODUCTS.slice(0, 6);
  grid.innerHTML = featured.map(productCardHTML).join("");
  wireAddToCartButtons(grid);
}

function wireAddToCartButtons(scope) {
  scope.querySelectorAll("[data-add-to-cart]").forEach(btn => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const id = Number(btn.getAttribute("data-add-to-cart"));
      addToCart(id, 1);
      showToast("Added to cart");
    });
  });
}

function wireCategoryCards() {
  document.querySelectorAll("[data-category-card]").forEach(card => {
    card.addEventListener("click", () => {
      const category = card.getAttribute("data-category-card");
      window.location.href = `marketplace.html?category=${category}`;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeatured();
  wireCategoryCards();
});
