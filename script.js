/**
 * script.js — 2KRAZZY Streetwear Website
 * Improved by AI • Business info integrated • WA number updated
 *
 * Sections
 *  1.  Constants & SVG snippets
 *  2.  Data — product categories, reviews, UGC photos
 *  3.  Cart state & helpers
 *  4.  Cart drawer — open / close / render
 *  5.  Product card rendering
 *  6.  Section rendering (categories, UGC, testimonials)
 *  7.  Toast notifications
 *  8.  Testimonial slider
 *  9.  Waitlist form
 * 10.  Hamburger / mobile menu
 * 11.  Theme toggle (dark ↔ light)
 * 12.  Smooth scroll
 * 13.  Scroll-reveal (IntersectionObserver)
 * 14.  Navbar scroll shadow
 * 15.  Logo image injection
 * 16.  Initialisation
 */


/* =============================================================
   1. CONSTANTS & SVG SNIPPETS
   Reusable SVG strings so we're not duplicating markup inside
   every template literal.
   ============================================================= */

/** Real business WhatsApp number */
const WA_NUMBER = '2349122253796';

/**
 * WhatsApp icon SVG (12 × 12).
 * References the #icon-wa symbol defined once in index.html <defs>.
 * No path coordinates needed here — the shape lives in one place only.
 */
const SVG_WA_SMALL = `<svg width="12" height="12" aria-hidden="true"><use href="#icon-wa"/></svg>`;

/** Shopping-bag icon SVG (stroke) */
const SVG_CART = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
       aria-hidden="true">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>`;

/** Checkmark icon SVG (stroke) */
const SVG_CHECK = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
       aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>`;

/** Plus icon SVG (stroke) */
const SVG_PLUS = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="2.5" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5"  y1="12" x2="19" y2="12"/>
  </svg>`;


/* =============================================================
   2. DATA
   ============================================================= */

/**
 * Product categories.
 * Each category maps to a <section> rendered by renderSections().
 *
 * Product shape:
 *   id     {string}  — unique key used as the cart key and image filename hint
 *   name   {string}  — display name
 *   tag    {string}  — sub-label (e.g. "Oversized Hoodie")
 *   price  {number}  — price in Naira (no symbol)
 *   badge  {string}  — badge text: "HOT" | "NEW" | "BESTSELLER" | "SOON"
 *   bc     {string}  — badge CSS class key: "bh" | "bn" | "bb" | "bs"
 *   stars  {number}  — 1–5
 *   rev    {number}  — review count
 *   emoji  {string}  — placeholder emoji shown before real photos are added
 */
const CATEGORIES = [
  {
    id: 'hoodies', num: '002', title: 'MATCHING SETS', alt: false,
    products: [
      { id: 'h1', name: 'Krazzy Co-ord Set',     tag: 'Oversized Set',    price: 65000, badge: 'HOT',        bc: 'bh', stars: 5, rev: 142, image:"images/matching.jpg" },
      { id: 'h2', name: 'Krazzy Nebula Set',  tag: 'Matching Set',  price: 58000, badge: 'NEW',        bc: 'bn', stars: 5, rev: 89,   image:"images/Nebula-set.jpg" },
      { id: 'h3', name: 'Krazzy Voltage Set',     tag: 'Matching Set',       price: 72000, badge: 'SOON',       bc: 'bs', stars: 4, rev: 12,   image:"images/Voltage-set.jpg" },
    ],
  },
  {
    id: 'tees', num: '003', title: 'GRAPHIC TEES', alt: true,
    products: [
      { id: 't1', name: 'Krazzy Gray Tee',   tag: 'Oversized Tee', price: 28500, badge: 'BESTSELLER', bc: 'bb', stars: 5, rev: 217,  image:"images/Shirt.jpg" },
      { id: 't2', name: 'Krazzy Blue Tee',     tag: 'Graphic Tee',       price: 24000, badge: 'NEW',        bc: 'bn', stars: 5, rev: 104, image:"images/Shirt2.jpg" },
      { id: 't3', name: 'Krazzy Pink Tee',    tag: 'Premium Tee',       price: 26500, badge: 'HOT',        bc: 'bh', stars: 5, rev: 67,  image:"images/Shirt3.jpg" },
      { id: 't4', name: 'Danfo Driver Tee',  tag: 'Oversized Tee',     price: 22000, badge: 'SOON',       bc: 'bs', stars: 4, rev: 8,   image:"images/Shirt4.jpg" },
    ],
  },
  {
    id: 'bottoms', num: '004', title: 'FEMALE WEARS', alt: false,
    products: [
      { id: 'b1', name: 'Krazzy Venom Crop',  tag: 'Female Shirt',        price: 58000, badge: 'HOT',  bc: 'bh', stars: 5, rev: 89, image:"images/Female3.jpg" },
      { id: 'b2', name: 'Krazzy Skeleton Romper',   tag: 'Romper', price: 42000, badge: 'NEW',  bc: 'bn', stars: 5, rev: 56, image:"images/Female.jpg" },
      { id: 'b3', name: 'Krazzy Grills Crop', tag: 'Female Shirt',     price: 54000, badge: 'SOON', bc: 'bs', stars: 4, rev: 5,  image:"images/Female2.jpg" },
    ],
  },
  {
    id: 'outerwear', num: '005', title: 'POLO', alt: true,
    products: [
      { id: 'o1', name: 'Krazzy Black Polo',        tag: 'POLO', price: 95000,  badge: 'SOON', bc: 'bs', stars: 5, rev: 38, image:"images/polo.jpg" },
      { id: 'o2', name: 'Krazzy White Polo',          tag: 'POLO',     price: 110000, badge: 'SOON', bc: 'bs', stars: 5, rev: 14, image:"images/polo2.jpg" },
      { id: 'o3', name: 'Krazzy Pink Polo', tag: 'POLO',      price: 78000,  badge: 'SOON', bc: 'bs', stars: 4, rev: 7,  image:"images/polo3.jpg" },
    ],
  },
  {
    id: 'headwear', num: '006', title: 'CAPS & HEADWEAR', alt: false,
    products: [
      { id: 'c1', name: 'Eko Atlantic Cap',  tag: 'Face-cap',    price: 18000, badge: 'NEW',        bc: 'bn', stars: 5, rev: 55,  image:"images/Face-cap.jpg" },
      // { id: 'c2', name: '2krazzy 5-Panel',  tag: '5-Panel Cap', price: 15500, badge: 'BESTSELLER', bc: 'bb', stars: 5, rev: 143, emoji: '🧢' },
      // { id: 'c3', name: 'Area Bucket Hat',  tag: 'Bucket Hat',  price: 20000, badge: 'NEW',        bc: 'bn', stars: 5, rev: 71,  emoji: '🎩' },
    ],
  },
  {
    id: 'shorts', num: '007', title: 'TROUSERS', alt: true,
    products: [
      { id: 's1', name: 'Krazzy 2K Crew Joggers',        tag: 'Trousers', price: 35000, badge: 'NEW',  bc: 'bn', stars: 5, rev: 74, image:"images/trouser2.jpg" },
      { id: 's2', name: 'Krazzy 2K Goth Camo', tag: '3-Quarters',  price: 28000, badge: 'SOON', bc: 'bs', stars: 4, rev: 11, image:"images/trouser.jpg" },
    ],
  },
  {
    id: 'sets', num: '008', title: 'LONG-SLEEVES', alt: false,
    products: [
      { id: 'st1', name: 'Krazzy Built Long-Sleeve',    tag: 'Long-Sleeve', price: 85000, badge: 'HOT',  bc: 'bh', stars: 5, rev: 62, image:"images/long-sleeve.jpg" },
      { id: 'st2', name: 'Krazzy Skater Long-Sleeve',  tag: 'Long-Sleeve',   price: 92000, badge: 'SOON', bc: 'bs', stars: 5, rev: 9,  image:"images/long-sleeve2.jpg" },
    ],
  },
  // {
  //   id: 'accessories', num: '009', title: 'ACCESSORIES', alt: true,
  //   products: [
  //     { id: 'a1', name: 'Krazzy Canvas Bag', tag: 'Tote Bag',      price: 12000, badge: 'NEW',        bc: 'bn', stars: 5, rev: 88,  emoji: '👜' },
  //     { id: 'a2', name: '2K Crossbody',      tag: 'Crossbody Bag', price: 24000, badge: 'SOON',       bc: 'bs', stars: 4, rev: 6,   emoji: '👜' },
  //     { id: 'a3', name: 'Street Balaclava',  tag: 'Balaclava',     price: 9500,  badge: 'BESTSELLER', bc: 'bb', stars: 5, rev: 210, emoji: '🎭' },
  //   ],
  // },
  // {
  //   id: 'footwear', num: '010', title: 'FOOTWEAR', alt: false,
  //   products: [
  //     { id: 'f1', name: 'Eko Slide',    tag: 'Rubber Slide', price: 18500, badge: 'SOON', bc: 'bs', stars: 5, rev: 22, emoji: '🩴' },
  //     { id: 'f2', name: 'Lagos Runner', tag: 'Sneaker',      price: 65000, badge: 'SOON', bc: 'bs', stars: 5, rev: 4,  emoji: '👟' },
  //   ],
  // },
  // {
  //   id: 'youth', num: '011', title: 'YOUTH LINE', alt: true,
  //   products: [
  //     { id: 'y1', name: 'Mini Krazzy Hoodie', tag: 'Kids Hoodie', price: 35000, badge: 'NEW', bc: 'bn', stars: 5, rev: 43, emoji: '🧥' },
  //     { id: 'y2', name: 'Youth Krazzy Tee',   tag: 'Kids Tee',    price: 16000, badge: 'NEW', bc: 'bn', stars: 5, rev: 29, emoji: '👕' },
  //   ],
  // },
];

/** Customer testimonials */
const REVIEWS = [
  { text: 'This hoodie turns heads everywhere I go. Walked into a spot and everyone asked where I got it. Ordered 2 more immediately!', stars: 5, name: 'Emeka O.',    role: 'Anonymous Buyer · Lagos Island' },
  { text: '2krazzy is literally the best streetwear plug in Lagos. The Krazzy Wave Tee is divine — I get compliments every single day. Fast delivery too!', stars: 5, name: 'Adaeze N.',   role: 'Verified Buyer · Lekki' },
  { text: 'The Area Boy Cargos fit exactly like what a Lagos boss should wear. 100% authentic quality. Nothing cheap here. I\'m loyal for life.', stars: 5, name: 'Dotun A.',    role: 'Repeat Buyer · Victoria Island' },
  { text: 'I was skeptical ordering online but they delivered right to my door and the packaging was so premium. The Lagos Hustle Hoodie is everything. 10/10.', stars: 5, name: 'Fatima K.',   role: 'First-Time Buyer · Abuja' },
  { text: 'E don happen! The quality is insane for the price. Fabric is heavy, stitching is clean, fits are perfect. 2krazzy no dey cap!', stars: 5, name: 'Seun B.',     role: 'Verified Buyer · Ikeja' },
  { text: "Sabi people dey wear 2krazzy. I wore the tee to an event and I couldn't count the compliments. Lagos streetwear has arrived!", stars: 5, name: 'Chidinma E.', role: 'Repeat Buyer · Surulere' },
];

/** User-generated / community photos */
const UGC_PHOTOS = [
  { img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80', handle: '@tunde_fits',   caption: 'Lagos boys on top 🔥 #2krazzy' },
  { img: 'https://images.unsplash.com/photo-1542219550-37153d387c27?w=600&q=80', handle: '@chioma_style',  caption: 'She goes krazzy different 💚' },
  { img: 'https://images.unsplash.com/photo-1503341338985-95ad5e163a01?w=600&q=80', handle: '@emeka_drip',   caption: 'Agbero lifestyle 🖤 #2krazzy' },
  { img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', handle: '@adaeze_slay',  caption: 'She said she too krazzy 👑' },
  { img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80', handle: '@chuka_savage',  caption: 'Street certified no debate 🔥' },
  { img: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&q=80', handle: '@ngozi_krazzy', caption: 'Naija represent ✊🇳🇬' },
  { img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80', handle: '@ife_waves',    caption: 'The hoodie go hard sha 💯' },
  { img: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600&q=80', handle: '@dayo_gee',     caption: 'Every day na krazzy day 🔥' },
];


/* =============================================================
   3. CART STATE & HELPERS
   ============================================================= */

/**
 * Cart object — keyed by product id.
 * Shape: { [productId]: { product: ProductObject, qty: number } }
 */
let cart = {};

/** Format a number as Naira (e.g. 65000 → "₦65,000") */
function formatPrice(amount) {
  return '₦' + amount.toLocaleString('en-NG');
}

/** Return true if the product with this id is in the cart */
function isInCart(productId) {
  return Boolean(cart[productId]);
}

/** Total number of individual items across all cart entries */
function getTotalItems() {
  return Object.values(cart).reduce((sum, entry) => sum + entry.qty, 0);
}

/** Total price of all cart items */
function getTotalPrice() {
  return Object.values(cart).reduce((sum, entry) => sum + entry.product.price * entry.qty, 0);
}

/** Add a product to the cart (or increment qty if already there) */
function addToCart(product) {
  if (cart[product.id]) {
    cart[product.id].qty += 1;
  } else {
    cart[product.id] = { product, qty: 1 };
  }
}

/** Remove a product from the cart entirely */
function removeFromCart(productId) {
  delete cart[productId];
}

/**
 * Increment or decrement a cart item's qty.
 * Removes the item when qty drops to 0.
 */
function changeQty(productId, delta) {
  if (!cart[productId]) return;

  cart[productId].qty += delta;

  if (cart[productId].qty <= 0) {
    removeFromCart(productId);
  }

  renderCartDrawer();
  updateNavDot();
  refreshAllCartButtons();
}

/** Empty the entire cart */
function clearCart() {
  cart = {};
  renderCartDrawer();
  updateNavDot();
  refreshAllCartButtons();
  showToast('Cart cleared');
}

/**
 * Toggle a product in / out of the cart.
 * Called by the Featured Drop card and by handleCardToggle().
 */
function toggleCart(product, _buttonId) {
  if (isInCart(product.id)) {
    removeFromCart(product.id);
    showToast(`"${product.name}" removed from cart`);
  } else {
    addToCart(product);
    showToast(`"${product.name}" added to cart! 🔥`);
  }

  renderCartDrawer();
  updateNavDot();
}

/**
 * Refresh every button/icon on the page that tracks a cart item.
 * Loops over [data-cart-id] elements and updates classes + inner SVGs.
 */
function refreshAllCartButtons() {
  // Product-card quick-add and "Add" buttons
  document.querySelectorAll('[data-cart-id]').forEach((el) => {
    const inC = isInCart(el.dataset.cartId);
    el.classList.toggle('in-cart', inC);

    if (el.classList.contains('pcard-qadd')) {
      el.innerHTML = inC ? SVG_CHECK : SVG_PLUS;
      el.title = inC ? 'Remove from cart' : 'Add to cart';
    }

    if (el.classList.contains('btn-cart-sm')) {
      el.innerHTML = (inC ? SVG_CHECK : SVG_CART) +
        `<span class="sm-lbl">${inC ? 'In Cart ✓' : 'Add'}</span>`;
    }
  });

  // Featured drop cart button (separate id, not data-cart-id)
  const featBtn = document.getElementById('feat-cart-btn');
  if (featBtn) {
    const inC = isInCart('feat-hoodie');
    featBtn.classList.toggle('in-cart', inC);

    const label = featBtn.querySelector('.cart-btn-lbl');
    if (label) label.textContent = inC ? 'Remove from Cart' : 'Add to Cart';

    const svg = featBtn.querySelector('svg');
    if (svg) {
      svg.outerHTML = inC
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M16 10a4 4 0 01-8 0"/></svg>`;
    }
  }
}

/** Update the cart count badge in the navbar */
function updateNavDot() {
  const count = getTotalItems();
  const dot = document.getElementById('nav-dot');
  dot.textContent = count;
  dot.classList.toggle('visible', count > 0);
}


/* =============================================================
   4. CART DRAWER — open / close / render
   ============================================================= */

function openCart() {
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCartDrawer();
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-drawer').classList.remove('open');
  document.body.style.overflow = '';
}

/**
 * Build the pre-filled WhatsApp message for a full cart checkout.
 * Returns a URL-encoded string ready for wa.me.
 */
function buildCartWhatsAppMessage() {
  const items = Object.values(cart);
  if (!items.length) return '';

  let message = "Hi 2krazzy! I'd like to order:\n\n";
  items.forEach(({ product, qty }) => {
    message += `• ${product.name} x${qty} — ${formatPrice(product.price * qty)}\n`;
  });
  message += `\nTotal: ${formatPrice(getTotalPrice())}`;

  return encodeURIComponent(message);
}

/**
 * Rebuild the cart drawer DOM.
 * Shows an empty-state when the cart has no items,
 * otherwise lists each item with qty controls.
 */
function renderCartDrawer() {
  const items      = Object.values(cart);
  const itemsEl    = document.getElementById('cart-items');
  const footerEl   = document.getElementById('cart-foot');
  const countEl    = document.getElementById('cart-head-count');
  const totalEl    = document.getElementById('cart-total');
  const waLinkEl   = document.getElementById('cart-wa-link');
  const itemCount  = getTotalItems();

  // Update header count label
  countEl.textContent = `${itemCount} item${itemCount !== 1 ? 's' : ''}`;

  if (!items.length) {
    // Empty state
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="ce-icon">🛒</div>
        <p>Your cart is empty.<br />Start shopping!</p>
        <a href="#shop" onclick="closeCart()">Browse Drops</a>
      </div>`;
    footerEl.style.display = 'none';
    return;
  }

  // Items list
  footerEl.style.display = 'flex';
  totalEl.textContent = formatPrice(getTotalPrice());
  waLinkEl.href = `https://wa.me/${WA_NUMBER}?text=${buildCartWhatsAppMessage()}`;

  itemsEl.innerHTML = items.map(({ product, qty }) => `
    <div class="ci">
      <div class="ci-emoji">${product.emoji || '🛍️'}</div>

      <div class="ci-info">
        <div class="ci-name">${product.name}</div>
        <div class="ci-tag">${product.tag}</div>
        <div class="ci-price">${formatPrice(product.price)}</div>
      </div>

      <div class="ci-qty">
        <button onclick="changeQty('${product.id}', -1)" aria-label="Decrease quantity">−</button>
        <span class="qty-n">${qty}</span>
        <button onclick="changeQty('${product.id}', 1)"  aria-label="Increase quantity">+</button>
      </div>

      <button
        class="ci-rm"
        onclick="changeQty('${product.id}', -${qty})"
        title="Remove item"
        aria-label="Remove ${product.name} from cart"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <line x1="18" y1="6"  x2="6"  y2="18"/>
          <line x1="6"  y1="6"  x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  `).join('');
}


/* =============================================================
   5. PRODUCT CARD RENDERING
   ============================================================= */

/** Map badge key to its CSS class */
function badgeClass(bc) {
  return { bh: 'bh', bn: 'bn', bb: 'bb', bs: 'bs' }[bc] || 'bs';
}

/** Generate a star string e.g. "★★★★☆" for 4 stars */
function starString(count) {
  return '★'.repeat(count) + (count < 5 ? '☆'.repeat(5 - count) : '');
}

/**
 * Build the HTML string for a single product card.
 * Inline onclick handlers pass the full product object as JSON
 * so no global lookup is required.
 */
function makeProductCard(product) {
  const inCart    = isInCart(product.id);
  const waMessage = encodeURIComponent(`I'd like to order ${product.name} (${formatPrice(product.price)})`);

  return `
    <div class="pcard rv">

      <!-- Image / placeholder area -->
      <div class="pcard-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <div class="pcard-ph"></div>

        <!-- Badge (HOT / NEW / BESTSELLER / SOON) -->
        <span class="pbadge ${badgeClass(product.bc)}">${product.badge}</span>

        <!-- Quick-add / remove button (top-right corner) -->
        <button
          class="pcard-qadd ${inCart ? 'in-cart' : ''}"
          data-cart-id="${product.id}"
          onclick='handleCardToggle(${JSON.stringify(product)}, this)'
          title="${inCart ? 'Remove from cart' : 'Add to cart'}"
          aria-label="${inCart ? 'Remove from cart' : 'Add to cart'}"
        >
          ${inCart ? SVG_CHECK : SVG_PLUS}
        </button>
      </div>

      <!-- Card body -->
      <div class="pcard-body">
        <p class="pcard-tag">${product.tag}</p>
        <h3 class="pcard-name">${product.name}</h3>

        <div>
          <span class="pcard-stars">${starString(product.stars)}</span>
          <span class="pcard-rc">(${product.rev})</span>
        </div>

        <div class="pcard-foot">
          <span class="pcard-price">${formatPrice(product.price)}</span>

          <div class="pcard-actions">
            <!-- WhatsApp direct order — real business number -->
            <a
              href="https://wa.me/${WA_NUMBER}?text=${waMessage}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-wa-sm"
              aria-label="Order ${product.name} on WhatsApp"
            >
              ${SVG_WA_SMALL} Order
            </a>

            <!-- Cart toggle (small) -->
            <button
              class="btn-cart-sm ${inCart ? 'in-cart' : ''}"
              data-cart-id="${product.id}"
              onclick='handleCardToggle(${JSON.stringify(product)}, this)'
              aria-label="${inCart ? 'Remove from cart' : 'Add to cart'}"
            >
              ${inCart ? SVG_CHECK : SVG_CART}
              <span class="sm-lbl">${inCart ? 'In Cart ✓' : 'Add'}</span>
            </button>
          </div>
        </div>
      </div>

    </div>`;
}

/**
 * Handle a click on any product-card cart button.
 * Toggles the cart and then refreshes every button for that product.
 */
function handleCardToggle(product, _buttonEl) {
  toggleCart(product, null);

  // Sync all elements that track this product's cart state
  document.querySelectorAll(`[data-cart-id="${product.id}"]`).forEach((el) => {
    const inC = isInCart(product.id);
    el.classList.toggle('in-cart', inC);

    if (el.classList.contains('pcard-qadd')) {
      el.innerHTML = inC ? SVG_CHECK : SVG_PLUS;
      el.title = inC ? 'Remove from cart' : 'Add to cart';
    }

    if (el.classList.contains('btn-cart-sm')) {
      el.innerHTML = (inC ? SVG_CHECK : SVG_CART) +
        `<span class="sm-lbl">${inC ? 'In Cart ✓' : 'Add'}</span>`;
    }
  });

  updateNavDot();
  renderCartDrawer();
}


/* =============================================================
   6. SECTION RENDERING
   ============================================================= */

/**
 * Inject all category sections into #sroot.
 * Each category becomes a <section> with its own product grid.
 */
function renderSections() {
  const arrowSvg = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>`;

  document.getElementById('sroot').innerHTML = CATEGORIES.map((cat) => `
    <section id="${cat.id}" class="cat-sec${cat.alt ? ' alt' : ''}">
      <div class="pw">

        <div class="cat-hd rv">
          <div>
            <p class="cat-num">— ${cat.num}</p>
            <h2 class="cat-title">${cat.title}</h2>
          </div>
          <a href="#waitlist" class="see-all">
            See All ${arrowSvg}
          </a>
        </div>

        <div class="pgrid">
          ${cat.products.map(makeProductCard).join('')}
        </div>

      </div>
    </section>
  `).join('');
}

/**
 * Inject UGC community photos into #ugc-grid.
 */
function renderUGC() {
  document.getElementById('ugc-grid').innerHTML = UGC_PHOTOS.map((photo) => `
    <div class="ugc-item">
      <img src="${photo.img}" alt="${photo.handle}" loading="lazy" />
      <div class="ugc-ov">
        <div>
          <div class="ugc-h">${photo.handle}</div>
          <div class="ugc-c">${photo.caption}</div>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Inject testimonial cards into #testi-track.
 */
function renderTestimonials() {
  document.getElementById('testi-track').innerHTML = REVIEWS.map((review) => `
    <div class="testi-card">
      <div class="testi-quote">"</div>
      <p class="testi-text">${review.text}</p>
      <div class="testi-stars">${'★'.repeat(review.stars)}</div>
      <div class="testi-author">
        <span class="testi-name">${review.name}</span>
        <span class="testi-role">${review.role}</span>
      </div>
    </div>
  `).join('');
}


/* =============================================================
   7. TOAST NOTIFICATIONS
   ============================================================= */

let toastTimer;

/**
 * Show a toast message that automatically dismisses after 3.2 s.
 * Clears any previous timer so rapid calls don't stack.
 */
function showToast(message) {
  const toastEl  = document.getElementById('toast');
  const messageEl = document.getElementById('tmsg');

  messageEl.textContent = message;
  toastEl.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
}


/* =============================================================
   8. TESTIMONIAL SLIDER
   ============================================================= */

let testimonialIndex = 0;

/**
 * Slide the testimonial track to the current index.
 * Clamps the index so we never scroll past the last visible card.
 */
function slideTestimonials() {
  const track = document.getElementById('testi-track');
  const card  = track.querySelector('.testi-card');
  if (!card) return;

  const cardWidth = card.offsetWidth + 20; // 20 = gap
  const visibleCount = Math.floor(track.parentElement.offsetWidth / cardWidth);
  const maxIndex = Math.max(0, REVIEWS.length - visibleCount);

  testimonialIndex = Math.min(testimonialIndex, maxIndex);
  track.style.transform = `translateX(-${testimonialIndex * cardWidth}px)`;
}

function testiNext() {
  testimonialIndex += 1;
  slideTestimonials();
}

function testiPrev() {
  testimonialIndex = Math.max(0, testimonialIndex - 1);
  slideTestimonials();
}


/* =============================================================
   9. WAITLIST FORM
   ============================================================= */

/**
 * Handle waitlist form submission.
 * Hides the form and reveals the success message.
 * (Wire this to a real backend when ready.)
 */
function handleWL(event) {
  event.preventDefault();
  document.getElementById('wl-form').style.display = 'none';
  document.getElementById('wl-ok').style.display   = 'block';
  showToast('Locked in! 🔥');
}


/* =============================================================
   10. HAMBURGER / MOBILE MENU
   ============================================================= */

const hamburgerBtn  = document.getElementById('ham');
const mobileMenuEl  = document.getElementById('mob-menu');

hamburgerBtn.addEventListener('click', () => {
  const isOpen = hamburgerBtn.classList.toggle('open');
  mobileMenuEl.classList.toggle('open', isOpen);
  hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
  // Prevent body scroll when menu is open
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

/** Close the mobile menu (called by inline onclick on each link) */
function cm() {
  hamburgerBtn.classList.remove('open');
  mobileMenuEl.classList.remove('open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}


/* =============================================================
   11. THEME TOGGLE (dark ↔ light)
   Persists the user's preference in localStorage under key '2k4'.
   ============================================================= */

const htmlRoot  = document.documentElement;
const moonIcon  = document.getElementById('i-moon');
const sunIcon   = document.getElementById('i-sun');

function applyTheme(isDark) {
  htmlRoot.setAttribute('data-theme', isDark ? 'dark' : 'light');
  moonIcon.style.display = isDark ? 'block' : 'none';
  sunIcon.style.display  = isDark ? 'none'  : 'block';
}

// Apply saved preference on load (defaults to dark)
applyTheme(localStorage.getItem('2k4') !== 'light');

document.getElementById('theme-btn').addEventListener('click', () => {
  const currentlyDark = htmlRoot.getAttribute('data-theme') === 'dark';
  localStorage.setItem('2k4', currentlyDark ? 'light' : 'dark');
  applyTheme(!currentlyDark);
});


/* =============================================================
   12. SMOOTH SCROLL
   Intercepts clicks on any anchor that points to an id on the
   page and scrolls smoothly instead of jumping.
   ============================================================= */

document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* =============================================================
   13. SCROLL-REVEAL
   Elements with class .rv, .rv-l, or .rv-r start hidden and
   animate in when they enter the viewport.
   ============================================================= */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target); // animate once only
      }
    });
  },
  { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
);

/**
 * Attach the observer to every reveal element.
 * Call after renderSections() so dynamically created cards are included.
 */
function observeRevealElements() {
  document.querySelectorAll('.rv, .rv-l, .rv-r').forEach((el, index) => {
    // Stagger delay so cards cascade in rather than all appearing at once
    el.style.transitionDelay = `${(index % 5) * 0.08}s`;
    revealObserver.observe(el);
  });
}


/* =============================================================
   14. NAVBAR SCROLL SHADOW
   Adds a drop shadow to the navbar once the user scrolls down.
   ============================================================= */

window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.style.boxShadow = window.scrollY > 20
    ? '0 4px 40px rgba(0, 0, 0, .45)'
    : 'none';
}, { passive: true });


/* =============================================================
   15. LOGO IMAGE INJECTION
   The base64 logo lives in a single variable below.
   Paste the base64 string here, or replace with a file path.
   Every <img> with an empty src that represents the logo is
   updated at startup.
   ============================================================= */

/**
 * Set LOGO_SRC to your actual logo path (e.g. "images/logo.png")
 * or to a data:image/... base64 string.
 * Leave as "" if you want to add images manually in the HTML.
 */
const LOGO_SRC = ''; // ← Replace with "images/logo.png" or base64

function injectLogos() {
  if (!LOGO_SRC) return;
  document.querySelectorAll('.brand-mark img, .hero-orb-ring img, .feat-big-logo, .story-logo img, .f-logo-box img').forEach((img) => {
    img.src = LOGO_SRC;
  });
}


/* =============================================================
   16. INITIALISATION
   Runs once the script is parsed (at bottom of <body>).
   ============================================================= */

(function init() {
  injectLogos();           // inject logo into all placements
  renderSections();        // build all category product grids
  renderUGC();             // build community photo grid
  renderTestimonials();    // build review slider cards
  observeRevealElements(); // attach scroll-reveal to all .rv elements
  renderCartDrawer();      // paint the cart drawer (empty state)
  updateNavDot();          // ensure badge starts hidden
})();