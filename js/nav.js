/* ============================================================
   CampusMarket — shared navigation behavior
   Handles: marking the correct bottom-nav tab as active,
   wiring the header search bar, and a reusable toast() helper
   used by every page. All done with addEventListener, per the
   Week 3 requirement (never onclick attributes).
   ============================================================ */

function showToast(message) {
  let toast = document.querySelector("[data-toast]");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("data-toast", "");
    toast.innerHTML = '<span class="material-symbols-outlined" style="font-size:18px;">check_circle</span><span data-toast-text></span>';
    document.body.appendChild(toast);
  }
  toast.querySelector("[data-toast-text]").textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function setActiveNavTab() {
  const page = document.body.getAttribute("data-page");
  document.querySelectorAll("[data-nav-path]").forEach(link => {
    const isActive = link.getAttribute("data-nav-path") === page;
    link.classList.toggle("text-primary-container", isActive);
    link.classList.toggle("font-semibold", isActive);
    link.classList.toggle("text-on-surface-variant", !isActive);
    if (isActive) link.setAttribute("aria-current", "page");
  });
}

function wireHeaderSearch() {
  const form = document.querySelector("[data-search-form]");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("input[type='search']");
    const query = input.value.trim();
    const url = new URL("marketplace.html", window.location.href);
    if (query) url.searchParams.set("search", query);
    window.location.href = url.toString();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNavTab();
  wireHeaderSearch();
});
