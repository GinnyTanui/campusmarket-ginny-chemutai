/* ============================================================
   CampusMarket — marketplace / catalog page behavior
   This is the Week 3 task in full: a live filter (search input),
   custom validation-style rules (price range), required-field-
   style category/condition filters, and DOM manipulation to
   show/hide matching products. Every interaction is wired with
   addEventListener, not onclick.
   ============================================================ */

const state = {
  search: "",
  category: "all",
  condition: "all",
  minPrice: null,
  maxPrice: null,
  sort: "newest"
};

function readFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("search")) state.search = params.get("search");
  if (params.get("category")) state.category = params.get("category");
}

function matchesFilters(product) {
  const q = state.search.trim().toLowerCase();
  const matchesSearch = !q || product.name.toLowerCase().includes(q);
  const matchesCategory = state.category === "all" || product.category === state.category;
  const matchesCondition = state.condition === "all" || product.condition === state.condition;
  const matchesMin = state.minPrice === null || product.price >= state.minPrice;
  const matchesMax = state.maxPrice === null || product.price <= state.maxPrice;
  return matchesSearch && matchesCategory && matchesCondition && matchesMin && matchesMax;
}

function sortProducts(list) {
  const sorted = [...list];
  if (state.sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
  if (state.sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
  if (state.sort === "newest") sorted.sort((a, b) => b.id - a.id);
  return sorted;
}

function cardHTML(product) {
  return `
    <div class="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden group">
      <a href="product.html?id=${product.id}" class="relative w-full aspect-square bg-surface-container-low overflow-hidden block">
        <img alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="${product.image}">
        <span class="absolute top-2 left-2 bg-surface-container-high text-on-surface font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold shadow-sm">${product.condition}</span>
      </a>
      <div class="p-3 flex flex-col flex-1 justify-between gap-2">
        <div>
          <div class="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm mb-1">
            <span class="material-symbols-outlined text-[13px] text-primary">school</span>
            <span class="truncate">${product.campus}</span>
          </div>
          <a href="product.html?id=${product.id}" class="font-body-md text-body-md text-on-surface font-semibold line-clamp-2 leading-snug hover:text-primary-container">
            ${product.name}
          </a>
        </div>
        <div class="pt-1 flex flex-col gap-2">
          <span class="font-price-display text-price-display text-on-surface font-bold">${formatKSh(product.price)}</span>
          <button data-add-to-cart="${product.id}" class="w-full h-9 bg-primary text-on-primary rounded-lg font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
}

function renderCatalog() {
  const grid = document.querySelector("[data-catalog-grid]");
  const countLabel = document.querySelector("[data-result-count]");
  const emptyState = document.querySelector("[data-empty-state]");
  if (!grid) return;

  const results = sortProducts(PRODUCTS.filter(matchesFilters));

  if (countLabel) countLabel.textContent = `${results.length} product${results.length === 1 ? "" : "s"} found`;

  if (results.length === 0) {
    grid.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");
  grid.innerHTML = results.map(cardHTML).join("");
  grid.querySelectorAll("[data-add-to-cart]").forEach(btn => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      addToCart(Number(btn.getAttribute("data-add-to-cart")), 1);
      showToast("Added to cart");
    });
  });
}

function wireControls() {
  const searchInput = document.querySelector("[data-filter-search]");
  if (searchInput) {
    searchInput.value = state.search;
    searchInput.addEventListener("keyup", () => {
      state.search = searchInput.value;
      renderCatalog();
    });
  }

  const categorySelect = document.querySelector("[data-filter-category]");
  if (categorySelect) {
    categorySelect.value = state.category;
    categorySelect.addEventListener("change", () => {
      state.category = categorySelect.value;
      renderCatalog();
    });
  }

  const conditionSelect = document.querySelector("[data-filter-condition]");
  if (conditionSelect) {
    conditionSelect.addEventListener("change", () => {
      state.condition = conditionSelect.value;
      renderCatalog();
    });
  }

  const sortSelect = document.querySelector("[data-filter-sort]");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      state.sort = sortSelect.value;
      renderCatalog();
    });
  }

  const priceForm = document.querySelector("[data-price-form]");
  if (priceForm) {
    priceForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const min = priceForm.querySelector("[name='minPrice']").value;
      const max = priceForm.querySelector("[name='maxPrice']").value;
      state.minPrice = min ? Number(min) : null;
      state.maxPrice = max ? Number(max) : null;
      renderCatalog();
    });
  }

  const clearBtn = document.querySelector("[data-clear-filters]");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      state.search = ""; state.category = "all"; state.condition = "all";
      state.minPrice = null; state.maxPrice = null; state.sort = "newest";
      if (searchInput) searchInput.value = "";
      if (categorySelect) categorySelect.value = "all";
      if (conditionSelect) conditionSelect.value = "all";
      if (sortSelect) sortSelect.value = "newest";
      if (priceForm) priceForm.reset();
      renderCatalog();
    });
  }

  const emptyClearBtn = document.querySelector("[data-empty-clear]");
  if (emptyClearBtn && clearBtn) {
    emptyClearBtn.addEventListener("click", () => clearBtn.click());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  readFiltersFromURL();
  wireControls();
  renderCatalog();
});
