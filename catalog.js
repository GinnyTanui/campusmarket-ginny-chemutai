/* =============================================================
   CampusMarket | js/catalog.js
   WEEK 2: filtering and calculations (client-side scripting)
   WEEK 3: uses addEventListener and checks quantities against stock

   Everything here runs inside the visitor's own browser, after the
   page has loaded. Nothing is sent to a server. That is what
   "client-side" means, and why the page feels instant.

   Two features:
     A. FILTER: typing or choosing a value shows or hides product cards.
     B. CALCULATE: quantity x price for every product, plus a running
        subtotal, VAT and total.

   Steps from the Week 2 slides, matched to the code below:
     1. Select the product list and the filter input from the DOM
     2. Write a function that loops through every product
     3. Inside the loop, use if / else to decide whether each product matches
     4. Show matching products, hide the rest, using DOM manipulation
     5. Write a second function that calculates a running total
   ============================================================= */


/* ---------- 1. VARIABLES ----------
   const = a value that never changes. Prefer const by default.
   let   = a value that WILL change later (we use it for running totals). */

// Kenya's standard VAT rate is 16%. Stored once so it is easy to change.
const TAX_RATE = 0.16;


/* ---------- 2. SELECT ELEMENTS FROM THE DOM ----------
   The DOM is the browser's live, in-memory tree of the page. Before we can
   change anything, we have to FIND it.
     getElementById       finds ONE element by its unique id
     querySelectorAll     finds EVERY element matching a CSS selector
                          (returns a list we can loop through)
   Every id used here must exist in catalog.html, spelled exactly the same. */

// Filter controls
const searchInput    = document.getElementById("search-input");
const categorySelect = document.getElementById("category-select");
const priceSelect    = document.getElementById("price-select");
const clearFiltersBtn = document.getElementById("clear-filters");

// Results area
const resultsMessage = document.getElementById("results-message");
const emptyState     = document.getElementById("empty-state");

// Every product card and every quantity box (lists of elements)
const productCards   = document.querySelectorAll(".product-card");
const quantityInputs = document.querySelectorAll(".qty-input");

// Order summary numbers
const summaryItems    = document.getElementById("summary-items");
const summarySubtotal = document.getElementById("summary-subtotal");
const summaryVat      = document.getElementById("summary-vat");
const summaryTotal    = document.getElementById("summary-total");
const clearOrderBtn   = document.getElementById("clear-order");


/* ---------- 3. SMALL HELPER FUNCTION ----------
   A function is a named, reusable block of code. It takes input
   (parameters) and can return a result. Write once, call many times. */

// Turns 1800 into "1,800" so money is easy to read.
function formatKES(amount) {
  return amount.toLocaleString("en-KE", { maximumFractionDigits: 2 });
}


/* =============================================================
   FEATURE A: FILTERING
   ============================================================= */

function filterProducts() {
  // Read what the visitor typed or chose.
  // .trim() removes stray spaces, .toLowerCase() makes the search
  // ignore capital letters ("Lamp" matches "lamp").
  const searchText = searchInput.value.trim().toLowerCase();
  const chosenCategory = categorySelect.value;

  // Select values are always TEXT. Number() turns "500" into 500 so we can compare.
  // Infinity means "no limit", so any price passes the check.
  let maxPrice = Infinity;
  if (priceSelect.value !== "all") {
    maxPrice = Number(priceSelect.value);
  }

  let visibleCount = 0;   // let, because it changes as we count

  // LOOP: go through every product card, one at a time.
  for (const card of productCards) {
    // Read this card's facts from its data-* attributes.
    // dataset.name reads data-name, dataset.price reads data-price, etc.
    const name = card.dataset.name.toLowerCase();
    const category = card.dataset.category;
    const price = Number(card.dataset.price);   // data attributes are text too

    // Start by assuming the card matches, then knock it out if any check fails.
    let matches = true;

    // IF / ELSE decisions. Each one can turn "matches" to false.
    // 1) Search box: the text must appear in the name or the category.
    //    (.includes() is true when one piece of text contains another.)
    if (searchText !== "") {
      const foundInName = name.includes(searchText);
      const foundInCategory = category.toLowerCase().includes(searchText);
      if (!foundInName && !foundInCategory) {
        matches = false;
      }
    }

    // 2) Category dropdown: "all" means no restriction.
    if (chosenCategory !== "all" && category !== chosenCategory) {
      matches = false;
    }

    // 3) Price dropdown: the product must cost less than the chosen limit.
    if (price >= maxPrice) {
      matches = false;
    }

    // DOM MANIPULATION: show or hide the card.
    // This changes only what is currently displayed, not the HTML file.
    if (matches) {
      card.style.display = "";       // "" = give control back to the CSS (shows the card)
      visibleCount++;                // ++ means "add 1"
    } else {
      card.style.display = "none";   // hides the card
    }
  }

  // Update the "3 products found" message.
  if (visibleCount === 1) {
    resultsMessage.textContent = "1 product found";
  } else {
    resultsMessage.textContent = visibleCount + " products found";
  }

  // Show the "nothing matches" message only when zero cards are visible.
  // (`hidden` is a built-in HTML attribute that JavaScript can switch on and off.)
  emptyState.hidden = visibleCount !== 0;
}

function clearFilters() {
  searchInput.value = "";
  categorySelect.value = "all";
  priceSelect.value = "all";
  filterProducts();   // run the filter again so the cards reappear
}


/* =============================================================
   FEATURE B: CALCULATIONS
   ============================================================= */

// The core sum from the slides: price x quantity.
function calculateLineTotal(price, qty) {
  return price * qty;
}

// WEEK 3 TOUCH: a custom validation rule ("a quantity must be less than
// what's in stock"). HTML's min/max attributes do not stop someone TYPING
// 50, so JavaScript checks it too.
// Returns a safe whole number, and shows a message next to the box if needed.
function getValidQuantity(input, card) {
  const stock = Number(input.dataset.stock);
  const message = card.querySelector(".qty-message");

  // Start clean: clear any old error.
  message.textContent = "";
  input.classList.remove("invalid");

  // An empty box (someone is mid-typing) simply counts as 0. No error.
  if (input.value === "") {
    return 0;
  }

  const qty = Number(input.value);

  if (!Number.isInteger(qty) || qty < 0) {
    message.textContent = "Enter a whole number, 0 or more.";
    input.classList.add("invalid");
    return 0;
  } else if (qty > stock) {
    message.textContent = "Only " + stock + " in stock.";
    input.classList.add("invalid");
    input.value = stock;   // set the box to the most that is available
    return stock;
  }

  return qty;
}

// Recalculates every line total and the running order total.
// Called every time any quantity box changes.
function calculateTotal() {
  let subtotal = 0;    // running totals start at 0 and grow inside the loop
  let itemCount = 0;

  for (const card of productCards) {
    const input = card.querySelector(".qty-input");
    const price = Number(card.dataset.price);

    const qty = getValidQuantity(input, card);
    const lineTotal = calculateLineTotal(price, qty);

    // Show this product's line total inside its card.
    card.querySelector(".line-total-value").textContent = formatKES(lineTotal);

    subtotal = subtotal + lineTotal;
    itemCount = itemCount + qty;
  }

  // VAT on the subtotal. Math.round(x * 100) / 100 rounds to 2 decimal places,
  // which avoids computer maths oddities like 288.00000000000006.
  const vat = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = subtotal + vat;

  // Write the results into the order summary.
  summaryItems.textContent = itemCount;
  summarySubtotal.textContent = formatKES(subtotal);
  summaryVat.textContent = formatKES(vat);
  summaryTotal.textContent = formatKES(total);

  // NOTE: hidden (filtered-out) products still count if they have a quantity.
  // Filtering only changes what you SEE, not what is in your order.
}

function clearOrder() {
  for (const input of quantityInputs) {
    input.value = 0;
  }
  calculateTotal();
}


/* =============================================================
   CONNECT EVENTS TO FUNCTIONS
   An event is something that happens in the browser (a click, a key press,
   a change). addEventListener says: "when THIS event happens on THIS
   element, run THAT function."

   Week 2's slide used onclick="..." inside the HTML. addEventListener
   (Week 3) is the professional way: it keeps JavaScript out of the HTML,
   and one element can listen for many events. We use it from the start.

   Common events:
     "input"   fires on every keystroke or change (instant feedback)
     "change"  fires when a select/dropdown value is chosen
     "click"   fires when a button is clicked
   Notice we pass the function NAME (filterProducts), without (), so it
   runs later when the event happens, not right now.
   ============================================================= */

searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);
priceSelect.addEventListener("change", filterProducts);
clearFiltersBtn.addEventListener("click", clearFilters);

// Loop through every quantity box and give each one a listener.
for (const input of quantityInputs) {
  input.addEventListener("input", calculateTotal);
}
clearOrderBtn.addEventListener("click", clearOrder);


/* =============================================================
   BONUS (not required): pre-select a category from the link
   The home page links to catalog.html?category=Textbooks.
   URLSearchParams reads the part of the address after the "?".
   ============================================================= */

const params = new URLSearchParams(window.location.search);
const categoryFromLink = params.get("category");

// Only use it if it matches one of the real dropdown options.
if (categoryFromLink !== null) {
  const validOptions = Array.from(categorySelect.options).map(function (option) {
    return option.value;
  });
  if (validOptions.includes(categoryFromLink)) {
    categorySelect.value = categoryFromLink;
  }
}


/* ---------- RUN ONCE WHEN THE PAGE LOADS ----------
   Draws the correct starting state. It also fixes the case where a browser
   remembers old form values after a refresh. */
filterProducts();
calculateTotal();
