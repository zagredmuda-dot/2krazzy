/**
 * script.js — 2KRAZZY Streetwear Website
 *
 * Sections
 *  1.  Constants & SVG snippets
 *  2.  Data — product categories, reviews, UGC photos
 *  3.  Cart state & helpers
 *  4.  Cart drawer — open / close / render
 *  5.  Product card rendering (one card per category)
 *  6.  Variant panel — slide-in detail view with colour switcher
 *  7.  Section rendering
 *  8.  Toast notifications
 *  9.  Testimonial slider
 * 10.  Waitlist form
 * 11.  Hamburger / mobile menu
 * 12.  Theme toggle
 * 13.  Smooth scroll
 * 14.  Scroll-reveal
 * 15.  Navbar scroll shadow
 * 16.  Logo injection
 * 17.  Initialisation
 */


/* =============================================================
   1. CONSTANTS & SVG SNIPPETS
   ============================================================= */

const WA_NUMBER = '2349122253796';

const SVG_WA_SMALL = `<svg width="12" height="12" aria-hidden="true"><use href="#icon-wa"/></svg>`;

const SVG_CART = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M16 10a4 4 0 01-8 0"/></svg>`;

const SVG_CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

const SVG_PLUS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;

const SVG_CLOSE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

const SVG_ARROW_LEFT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`;


/* =============================================================
   2. DATA
   ============================================================= */

const CATEGORIES = [
  {
    id: 'tracksuit', num: '002', title: '2KRAZZY TRACKSUITS', alt: false,
    products: [
      { id: 'h1', name: ' 2KRAZZY TRACKSUITS',     tag: 'DRIP IN MOTION',   price: 80000, badge: 'SOON',        bc: 'bh', stars: 5, rev: 142, image: 'images/Track-suit-black.png',    color: 'Black',   desc: 'Clean, bold, and timeless. A versatile tracksuit that delivers effortless style and all-day comfort. COMING SOON.' },
      { id: 'h2', name: '2KRAZZY TRACKSUITS',      tag: 'DRIP IN MOTION',    price: 80000, badge: 'SOON',        bc: 'bn', stars: 5, rev: 89,  image: 'images/Track-suit-green.png',  color: 'Green',  desc: 'Fresh and standout. Brings a unique edge while keeping comfort and style on point. COMING SOON.' },
      { id: 'h3', name: '2KRAZZY TRACKSUITS',     tag: 'DRIP IN MOTION',    price: 80000, badge: 'SOON',       bc: 'bs', stars: 4, rev: 12,  image: 'images/Track-suit-red.png', color: 'Red', desc: 'Confident and eye-catching. Designed to stand out with a bold, stylish finish. COMING SOON.' },
       { id: 'h4', name: '2KRAZZY TRACKSUITS',     tag: 'DRIP IN MOTION',    price: 80000, badge: 'SOON',       bc: 'bs', stars: 4, rev: 12,  image: 'images/Track-suit-purple.png', color: 'Purple', desc: 'Smooth and distinctive. A refined look with a touch of uniqueness and comfort. COMING SOON.' },
      { id: 'h4', name: '2KRAZZY TRACKSUITS',     tag: 'DRIP IN MOTION',    price: 80000, badge: 'SOON',       bc: 'bs', stars: 4, rev: 12,  image: 'images/Track-suit-blue.png', color: 'Blue', desc: 'Cool abd Classic. Easy to wear, combining relaxed comfort with a sharp look. COMING SOON.' },
    ],
  },
  {
    id: 'cadet', num: '003', title: 'CADET CAPS', alt: true,
    products: [
      { id: 't1', name: 'Krazzy Cadet Cap',     tag: 'top off your style', price: 20000, badge: 'AVAILABLE', bc: 'bb', stars: 5, rev: 217, image: 'images/Cadet-cap-blue.png',  color: 'Blue',  desc: 'Cool and laid-back .Brings a fresh touch to your style with all-day comfort.' },
      { id: 't2', name: 'Krazzy Cadet Cap',     tag: 'top off your style',   price: 20000, badge: 'AVAILABLE',        bc: 'bn', stars: 5, rev: 104, image: 'images/Cadet-cap-green.png', color: 'Green',  desc: 'Bold yet natural .Adds a subtle standout vibe while staying easy to wear.' },
      { id: 't3', name: 'Krazzy Cadet Cap',     tag: 'top off your style',   price: 20000, badge: 'AVAILABLE',        bc: 'bh', stars: 5, rev: 67,  image: 'images/Cadet-cap-black.png', color: 'Black',  desc: "Don't sleep on Black. Bold graphic, statement colour, Staying sharp. Pairs with everything." },
      { id: 't4', name: 'Krazzy Cadet Cap',    tag: 'top off your style', price: 20000, badge: 'AVAILABLE',       bc: 'bs', stars: 4, rev: 8,   image: 'images/Cadet-cap-camo.png', color: 'Camo', desc: 'Rugged and street-ready. Built to stand out with a strong, confident edge.' },
    ],
  },
  {
    id: 'box-tees', num: '004', title: 'BOX TEES', alt: false,
    products: [
      { id: 'b1', name: '2Krazzy Box Tees',      tag: 'Wide fit. clean drip', price: 40000, badge: 'SOON',  bc: 'bh', stars: 5, rev: 89, image: 'images/Box-tee-black.png', color: 'Black',   desc: 'Deep, bold, and minimal. A staplepiece that works with anything and never misses. COMING SOON' },
      { id: 'b2', name: '2Krazzy Box Tees ', tag: 'Wide fit. clean drip',       price: 40000, badge: 'SOON',  bc: 'bn', stars: 5, rev: 56, image: 'images/Box-tee-white.png',  color: 'White',    desc: 'Pure and clean. a fresh essential that keeps your look sharp and effortless. COMING SOON' },
      { id: 'b3', name: '2Krazzy Box Tees',     tag: 'Wide fit. clean drip', price: 40000, badge: 'SOON', bc: 'bs', stars: 4, rev: 5,  image: 'images/Box-tee-blue.png', color: 'Blue', desc: 'Calm but strong. A solid everyday tee with a smooth easy going vibe. COMING SOON' },
      { id: 'b4', name: '2Krazzy Box Tees',      tag: 'Wide fit. clean drip', price: 40000, badge: 'SOON',  bc: 'bh', stars: 5, rev: 89, image: 'images/Box-tee-pink.png', color: 'Pink',   desc: 'Soft tone, loud presence. Adds personality without doing too much. COMING SOON' },
      { id: 'b5', name: '2Krazzy Box Tees', tag: 'Wide fit. clean drip',       price: 40000, badge: 'SOON',  bc: 'bn', stars: 5, rev: 56, image: 'images/Box-tee-skyBlue.png',  color: 'Light Blue',    desc: 'Cool and light. A relaxed shade that keeps your fit easy and fresh. COMING SOON' },
      { id: 'b6', name: '2Krazzy Box Tees',     tag: 'Wide fit. clean drip', price: 40000, badge: 'SOON', bc: 'bs', stars: 4, rev: 5,  image: 'images/Box-tee-LightPink.png', color: 'Light Pink', desc: 'Subtle and clean. A soft finish that stands out in its own way. COMING SOON' },
    ],
  },
  {
    id: 'Cap', num: '005', title: 'FACE CAP', alt: true,
    products: [
      { id: 'o1', name: 'Krazzy Face Cap', tag: 'Top it off right', price: 12000,  badge: 'AVAILABLE', bc: 'bs', stars: 5, rev: 38, image: 'images/Face-cap-brown.png',  color: 'Brown', desc: 'Warm and Classic. A natural tone with effortless style.' },
      { id: 'o2', name: 'Krazzy Face Cap', tag: 'Top it off right', price: 12000, badge: 'AVAILABLE', bc: 'bs', stars: 5, rev: 14, image: 'images/Face-cap-black.png', color: 'Black', desc: 'Sleek and timeless. Goes with everything, everytime.' },
      { id: 'o3', name: 'Krazzy Face Cap',  tag: 'Top it off right', price: 12000,  badge: 'AVAILABLE', bc: 'bs', stars: 4, rev: 7,  image: 'images/Face-cap-brown-again.png', color: 'Brown',  desc: 'Soft and refined. A lighter tone for a clean, relaxed look.' },
      { id: 'o3', name: 'Krazzy Face Cap',  tag: 'Top it off right', price: 12000,  badge: 'AVAILABLE', bc: 'bs', stars: 4, rev: 7,  image: 'images/Face-cap-red.png', color: 'Red',  desc: 'Bold and eye-catching. Made to stand out' },
    ],
  },
  {
    id: 'headwear', num: '006', title: 'CAPS & HEADWEAR', alt: false,
    products: [
      { id: 'c1', name: 'Eko Atlantic Cap', tag: 'Face-cap', price: 18000, badge: 'NEW', bc: 'bn', stars: 5, rev: 55, image: 'images/Face-cap.jpg', color: 'All Black', desc: 'Named after the new Lagos landmark. Structured 6-panel cap with embroidered 2K logo. Fits all heads.' },
    ],
  },
  {
    id: 'shorts', num: '007', title: 'TROUSERS', alt: true,
    products: [
      { id: 's1', name: 'Krazzy 2K Crew Joggers', tag: 'Trousers',    price: 35000, badge: 'NEW',  bc: 'bn', stars: 5, rev: 74, image: 'images/trouser2.jpg', color: 'Cream', desc: 'Relaxed jogger silhouette with drawstring waist and embroidered crew branding. All-day comfort, all-day drip.' },
      { id: 's2', name: 'Krazzy 2K Goth Camo',    tag: '3-Quarters',  price: 28000, badge: 'SOON', bc: 'bs', stars: 4, rev: 11, image: 'images/trouser.jpg',  color: 'Camo',  desc: 'Dark camo print on a cropped 3-quarter cut. Street energy meets outdoor adventure. Limited run.' },
    ],
  },
  {
    id: 'sets', num: '008', title: 'LONG-SLEEVES', alt: false,
    products: [
      { id: 'st1', name: 'Krazzy Built Long-Sleeve',   tag: 'Long-Sleeve', price: 85000, badge: 'HOT',  bc: 'bh', stars: 5, rev: 62, image: 'images/long-sleeve.jpg',  color: 'Black', desc: 'Heavy-weight long-sleeve with a statement graphic panel. Built for when the streets get cold.' },
      { id: 'st2', name: 'Krazzy Skater Long-Sleeve',  tag: 'Long-Sleeve', price: 92000, badge: 'SOON', bc: 'bs', stars: 5, rev: 9,  image: 'images/long-sleeve2.jpg', color: 'Gray',  desc: 'Skate-culture inspired long-sleeve. Loose fit, dropped shoulders, all-over graphic placement.' },
    ],
  },
];

const REVIEWS = [
  { text: 'This hoodie turns heads everywhere I go. Walked into a spot and everyone asked where I got it. Ordered 2 more immediately!', stars: 5, name: 'Emeka O.',    role: 'Anonymous Buyer · Lagos Island' },
  { text: '2krazzy is literally the best streetwear plug in Lagos. The Krazzy Wave Tee is divine — I get compliments every single day. Fast delivery too!', stars: 5, name: 'Adaeze N.',   role: 'Verified Buyer · Lekki' },
  { text: "The Area Boy Cargos fit exactly like what a Lagos boss should wear. 100% authentic quality. Nothing cheap here. I'm loyal for life.", stars: 5, name: 'Dotun A.',    role: 'Repeat Buyer · Victoria Island' },
  { text: 'I was skeptical ordering online but they delivered right to my door and the packaging was so premium. The Lagos Hustle Hoodie is everything. 10/10.', stars: 5, name: 'Fatima K.',   role: 'First-Time Buyer · Abuja' },
  { text: 'E don happen! The quality is insane for the price. Fabric is heavy, stitching is clean, fits are perfect. 2krazzy no dey cap!', stars: 5, name: 'Seun B.',     role: 'Verified Buyer · Ikeja' },
  { text: "Sabi people dey wear 2krazzy. I wore the tee to an event and I couldn't count the compliments. Lagos streetwear has arrived!", stars: 5, name: 'Chidinma E.', role: 'Repeat Buyer · Surulere' },
];

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

let cart = {};

function formatPrice(amount) {
  return '₦' + amount.toLocaleString('en-NG');
}

function isInCart(productId) {
  return Boolean(cart[productId]);
}

function getTotalItems() {
  return Object.values(cart).reduce((sum, entry) => sum + entry.qty, 0);
}

function getTotalPrice() {
  return Object.values(cart).reduce((sum, entry) => sum + entry.product.price * entry.qty, 0);
}

function addToCart(product) {
  if (cart[product.id]) {
    cart[product.id].qty += 1;
  } else {
    cart[product.id] = { product, qty: 1 };
  }
}

function removeFromCart(productId) {
  delete cart[productId];
}

function changeQty(productId, delta) {
  if (!cart[productId]) return;
  cart[productId].qty += delta;
  if (cart[productId].qty <= 0) removeFromCart(productId);
  renderCartDrawer();
  updateNavDot();
  refreshAllCartButtons();
}

function clearCart() {
  cart = {};
  renderCartDrawer();
  updateNavDot();
  refreshAllCartButtons();
  showToast('Cart cleared');
}

function toggleCart(product) {
  if (isInCart(product.id)) {
    removeFromCart(product.id);
    showToast(`"${product.name}" removed`);
  } else {
    addToCart(product);
    showToast(`"${product.name}" added to cart`);
  }
  renderCartDrawer();
  updateNavDot();
  refreshAllCartButtons();
  syncPanelCartBtn();
}

function refreshAllCartButtons() {
  document.querySelectorAll('[data-cart-id]').forEach((el) => {
    const inC = isInCart(el.dataset.cartId);
    el.classList.toggle('in-cart', inC);
    if (el.classList.contains('pcard-qadd')) {
      el.innerHTML = inC ? SVG_CHECK : SVG_PLUS;
      el.title = inC ? 'Remove from cart' : 'Add to cart';
    }
  });

  const featBtn = document.getElementById('feat-cart-btn');
  if (featBtn) {
    const inC = isInCart('feat-hoodie');
    featBtn.classList.toggle('in-cart', inC);
    const label = featBtn.querySelector('.cart-btn-lbl');
    if (label) label.textContent = inC ? 'Remove from Cart' : 'Add to Cart';
  }
}

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

function renderCartDrawer() {
  const items     = Object.values(cart);
  const itemsEl   = document.getElementById('cart-items');
  const footerEl  = document.getElementById('cart-foot');
  const countEl   = document.getElementById('cart-head-count');
  const totalEl   = document.getElementById('cart-total');
  const waLinkEl  = document.getElementById('cart-wa-link');
  const itemCount = getTotalItems();

  countEl.textContent = `${itemCount} item${itemCount !== 1 ? 's' : ''}`;

  if (!items.length) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="ce-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40" height="40" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg></div>
        <p>Your cart is empty.<br />Start shopping!</p>
        <a href="#shop" onclick="closeCart()">Browse Drops</a>
      </div>`;
    footerEl.style.display = 'none';
    return;
  }

  footerEl.style.display = 'flex';
  totalEl.textContent = formatPrice(getTotalPrice());
  waLinkEl.href = `https://wa.me/${WA_NUMBER}?text=${buildCartWhatsAppMessage()}`;

  itemsEl.innerHTML = items.map(({ product, qty }) => `
    <div class="ci">
      <div class="ci-img">
        ${product.image
          ? `<img src="${product.image}" alt="${product.name}" />`
          : `<span style="font-size:1.4rem">🛍️</span>`}
      </div>
      <div class="ci-info">
        <div class="ci-name">${product.name}</div>
        <div class="ci-tag">${product.tag}</div>
        <div class="ci-price">${formatPrice(product.price)}</div>
      </div>
      <div class="ci-qty">
        <button onclick="changeQty('${product.id}', -1)" aria-label="Decrease">−</button>
        <span class="qty-n">${qty}</span>
        <button onclick="changeQty('${product.id}', 1)" aria-label="Increase">+</button>
      </div>
      <button class="ci-rm" onclick="changeQty('${product.id}', -${qty})" title="Remove">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>`).join('');
}


/* =============================================================
   5. PRODUCT CARD & SECTION RENDERING
   ============================================================= */

function badgeClass(bc) {
  return { bh: 'bh', bn: 'bn', bb: 'bb', bs: 'bs' }[bc] || 'bs';
}

function starString(count) {
  return '★'.repeat(count) + (count < 5 ? '☆'.repeat(5 - count) : '');
}

// Groups of categories shown together in one section
const SECTION_GROUPS = [
  { id: 'sg1', label: 'NEW ARRIVALS', alt: false,
    cats: ['tracksuit', 'cadet', 'box-tees', 'Cap'] },
  // { id: 'sg2', label: 'FRESH DROPS', alt: true,
  //   cats: ['outerwear', 'headwear', 'shorts'] },
  // { id: 'sg3', label: 'FULL FIT', alt: false,
  //   cats: ['sets'] },
];

/**
 * Build the hero card for one category.
 * The category name is shown as a label at the top of the card.
 */
function makeCategoryCard(cat) {
  const hero    = cat.products[0];
  const inCart  = isInCart(hero.id);
  const hasMore = cat.products.length > 1;

  const dots = hasMore
    ? cat.products.map((p, i) =>
        `<button class="pvar-dot${i === 0 ? ' active' : ''}"
           title="${p.color || p.name}"
           onclick="event.stopPropagation();openVariantPanel('${cat.id}',${i})"
           aria-label="View ${p.color || p.name}"
           style="background-image:url('${p.image}')"></button>`
      ).join('')
    : '';

  const variantsRow = hasMore
    ? `<div class="pcard-variants">${dots}</div>` : '';

  const heroJson = JSON.stringify(hero).replace(/'/g, "\'");

  return `<div class="pcard rv"
    onclick="openVariantPanel('${cat.id}',0)"
    tabindex="0" role="button"
    aria-label="View ${cat.title}"
    onkeydown="if(event.key==='Enter')openVariantPanel('${cat.id}',0)">

    <div class="pcard-cat-label">
      <span class="pcard-cat-num">${cat.num}</span>
      <span class="pcard-cat-title">${cat.title}</span>
    </div>

    <div class="pcard-img">
      <img src="${hero.image}" alt="${hero.name}" loading="lazy" />
      <span class="pbadge ${badgeClass(hero.bc)}">${hero.badge}</span>
      ${hasMore ? `<div class="pcard-more-chip">${cat.products.length} styles</div>` : ''}
      <button class="pcard-qadd${inCart ? ' in-cart' : ''}"
        data-cart-id="${hero.id}"
        onclick="event.stopPropagation();handleCardToggle(JSON.parse(this.dataset.p))"
        data-p='${JSON.stringify(hero)}'
        title="${inCart ? 'Remove from cart' : 'Add to cart'}"
        aria-label="${inCart ? 'Remove from cart' : 'Add to cart'}">
        ${inCart ? SVG_CHECK : SVG_PLUS}
      </button>
    </div>

    <div class="pcard-body">
      <p class="pcard-tag">${hero.tag}</p>
      <h3 class="pcard-name">${hero.name}</h3>
      <div>
        <span class="pcard-stars">${starString(hero.stars)}</span>
        <span class="pcard-rc">(${hero.rev})</span>
      </div>
      ${variantsRow}
      <div class="pcard-foot">
        <span class="pcard-price">${formatPrice(hero.price)}</span>
        <button class="pcard-explore-btn"
          onclick="event.stopPropagation();openVariantPanel('${cat.id}',0)">
          View Styles
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  </div>`;
}

function handleCardToggle(product) {
  toggleCart(product);
}


/* =============================================================
   6. VARIANT PANEL
   ============================================================= */

let panelCurrentCatId    = null;
let panelCurrentVarIndex = 0;

function openVariantPanel(catId, varIndex) {
  const cat = CATEGORIES.find(c => c.id === catId);
  if (!cat) return;
  panelCurrentCatId    = catId;
  panelCurrentVarIndex = varIndex;
  renderVariantPanel(cat, varIndex);
  document.getElementById('vp-overlay').classList.add('open');
  document.getElementById('variant-panel').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVariantPanel() {
  document.getElementById('vp-overlay').classList.remove('open');
  document.getElementById('variant-panel').classList.remove('open');
  document.body.style.overflow = '';
}

function switchVariant(varIndex) {
  if (!panelCurrentCatId) return;
  const cat = CATEGORIES.find(c => c.id === panelCurrentCatId);
  if (!cat) return;
  panelCurrentVarIndex = varIndex;
  renderVariantPanel(cat, varIndex);
}

function renderVariantPanel(cat, varIndex) {
  const product = cat.products[varIndex];
  const inCart  = isInCart(product.id);
  const waMsg   = encodeURIComponent('Hi 2krazzy! I want to order: ' + product.name + ' — ' + formatPrice(product.price));

  const thumbs = cat.products.map((p, i) =>
    `<button class="vp-thumb${i === varIndex ? ' active' : ''}"
       onclick="switchVariant(${i})"
       title="${p.color || p.name}"
       aria-label="View ${p.color || p.name}">
       <img src="${p.image}" alt="${p.name}" loading="lazy" />
       <span class="vp-thumb-lbl">${p.color || (i + 1)}</span>
     </button>`
  ).join('');

  const panel = document.getElementById('variant-panel');
  panel.innerHTML =
    `<div class="vp-head">
       <button class="vp-back" onclick="closeVariantPanel()" aria-label="Close">
         ${SVG_ARROW_LEFT}<span>Back</span>
       </button>
       <p class="vp-cat-label">${cat.title}</p>
       <button class="vp-close" onclick="closeVariantPanel()" aria-label="Close">${SVG_CLOSE}</button>
     </div>

     <div class="vp-body">
       <div class="vp-img-wrap" onclick="openLightbox('${product.image}', '${product.name}')" title="Click to view full image">
         <img src="${product.image}" alt="${product.name}" class="vp-main-img" />
         <span class="vp-badge pbadge ${badgeClass(product.bc)}">${product.badge}</span>
         <div class="vp-img-zoom-hint">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
           View full image
         </div>
       </div>

       ${cat.products.length > 1
         ? `<div class="vp-thumbs-section">
              <p class="vp-thumbs-label">Available Styles</p>
              <div class="vp-thumbs">${thumbs}</div>
            </div>`
         : ''}

       <div class="vp-info">
         <div class="vp-info-top">
           <div>
             <p class="vp-tag">${product.tag}</p>
             <h2 class="vp-name">${product.name}</h2>
           </div>
           <div class="vp-price">${formatPrice(product.price)}</div>
         </div>

         <div class="vp-stars-row">
           <span class="vp-stars">${starString(product.stars)}</span>
           <span class="vp-rev-ct">(${product.rev} reviews)</span>
         </div>

         ${product.color
           ? `<div class="vp-colour-row">
                <span class="vp-colour-label">Colour:</span>
                <span class="vp-colour-val">${product.color}</span>
              </div>`
           : ''}

         <p class="vp-desc">${product.desc || ''}</p>

         <div class="vp-size-note">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
           All sizes available. Message us on WhatsApp for your perfect fit.
         </div>
       </div>
     </div>

     <div class="vp-foot">
       <a href="https://wa.me/${WA_NUMBER}?text=${waMsg}" target="_blank" rel="noopener noreferrer" class="vp-wa-btn">
         <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-wa"/></svg>
         Order via WhatsApp
       </a>
       <button class="vp-cart-btn${inCart ? ' in-cart' : ''}"
         id="vp-cart-btn"
         data-cart-id="${product.id}"
         data-p='${JSON.stringify(product)}'
         onclick="toggleCart(JSON.parse(this.dataset.p))">
         ${inCart ? SVG_CHECK : SVG_CART}
         <span class="vp-cart-lbl">${inCart ? 'In Cart ✓' : 'Add to Cart'}</span>
       </button>
     </div>`;
}

function syncPanelCartBtn() {
  const btn = document.getElementById('vp-cart-btn');
  if (!btn) return;
  const inC = isInCart(btn.dataset.cartId);
  btn.classList.toggle('in-cart', inC);
  const lbl = btn.querySelector('.vp-cart-lbl');
  if (lbl) lbl.textContent = inC ? 'In Cart ✓' : 'Add to Cart';
}


/* =============================================================
   7. SECTION RENDERING
   Categories are grouped 2-3 per section.
   ============================================================= */

function renderSections() {
  const arrowSvg = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;

  // Build a map for quick lookup
  const catMap = {};
  CATEGORIES.forEach(c => { catMap[c.id] = c; });

  const html = SECTION_GROUPS.map((grp) => {
    const cats = grp.cats.map(id => catMap[id]).filter(Boolean);
    return `
      <section id="${grp.id}" class="cat-sec${grp.alt ? ' alt' : ''}">
        <div class="pw">
          <div class="cat-hd rv">
            <h2 class="cat-title">${grp.label}</h2>
          </div>
          <div class="pgrid pgrid-group">
            ${cats.map(cat => makeCategoryCard(cat)).join('')}
          </div>
        </div>
      </section>`;
  }).join('');

  document.getElementById('sroot').innerHTML = html;
}


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
   8. TOAST NOTIFICATIONS
   ============================================================= */

let toastTimer;

function showToast(message) {
  const toastEl   = document.getElementById('toast');
  const messageEl = document.getElementById('tmsg');
  messageEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
}


/* =============================================================
   9. TESTIMONIAL SLIDER
   ============================================================= */

let testimonialIndex = 0;
let testiAutoTimer   = null;
const TESTI_INTERVAL = 4500;

function renderTestimonialsInfinite() {
  // Render cards TWICE so we can seamlessly loop
  const track = document.getElementById('testi-track');
  if (!track) return;
  const single = REVIEWS.map((review) => `
    <div class="testi-card">
      <div class="testi-quote">"</div>
      <p class="testi-text">${review.text}</p>
      <div class="testi-stars">${'★'.repeat(review.stars)}</div>
      <div class="testi-author">
        <span class="testi-name">${review.name}</span>
        <span class="testi-role">${review.role}</span>
      </div>
    </div>`).join('');
  // Two copies for seamless wrap
  track.innerHTML = single + single;
}

function getCardWidth() {
  const track = document.getElementById('testi-track');
  const card  = track.querySelector('.testi-card');
  if (!card) return 360;
  return card.offsetWidth + 20;
}

function slideTestimonials() {
  const track = document.getElementById('testi-track');
  if (!track) return;
  const cw        = getCardWidth();
  const total     = REVIEWS.length; // one set length
  // If we've scrolled past the first full set, jump silently back
  if (testimonialIndex >= total) {
    // Disable transition momentarily for the invisible jump
    track.style.transition = 'none';
    testimonialIndex = 0;
    track.style.transform = `translateX(0)`;
    // Re-enable transition on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition = '';
      });
    });
    return;
  }
  track.style.transform = `translateX(-${testimonialIndex * cw}px)`;
}

function testiNext() {
  testimonialIndex += 1;
  slideTestimonials();
}

function testiPrev() {
  const total = REVIEWS.length;
  testimonialIndex = (testimonialIndex - 1 + total) % total;
  slideTestimonials();
}

function startTestiAuto() {
  stopTestiAuto();
  testiAutoTimer = setInterval(() => {
    testimonialIndex += 1;
    slideTestimonials();
  }, TESTI_INTERVAL);
}

function stopTestiAuto() {
  if (testiAutoTimer) { clearInterval(testiAutoTimer); testiAutoTimer = null; }
}


/* =============================================================
   10. WAITLIST FORM
   ============================================================= */

function handleWL(event) {
  event.preventDefault();
  document.getElementById('wl-form').style.display = 'none';
  document.getElementById('wl-ok').style.display   = 'block';
  showToast('Locked in! Welcome to the movement.');
}


/* =============================================================
   11. HAMBURGER / MOBILE MENU
   ============================================================= */

const hamburgerBtn = document.getElementById('ham');
const mobileMenuEl = document.getElementById('mob-menu');

hamburgerBtn.addEventListener('click', () => {
  const isOpen = hamburgerBtn.classList.toggle('open');
  mobileMenuEl.classList.toggle('open', isOpen);
  hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

function cm() {
  hamburgerBtn.classList.remove('open');
  mobileMenuEl.classList.remove('open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}


/* =============================================================
   12. THEME TOGGLE
   ============================================================= */

const htmlRoot = document.documentElement;
const moonIcon = document.getElementById('i-moon');
const sunIcon  = document.getElementById('i-sun');

function applyTheme(isDark) {
  htmlRoot.setAttribute('data-theme', isDark ? 'dark' : 'light');
  moonIcon.style.display = isDark ? 'block' : 'none';
  sunIcon.style.display  = isDark ? 'none'  : 'block';
}

applyTheme(localStorage.getItem('2k4') !== 'light');

document.getElementById('theme-btn').addEventListener('click', () => {
  const currentlyDark = htmlRoot.getAttribute('data-theme') === 'dark';
  localStorage.setItem('2k4', currentlyDark ? 'light' : 'dark');
  applyTheme(!currentlyDark);
});


/* =============================================================
   13. SMOOTH SCROLL
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
   14. SCROLL-REVEAL
   ============================================================= */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
);

function observeRevealElements() {
  document.querySelectorAll('.rv, .rv-l, .rv-r').forEach((el, index) => {
    el.style.transitionDelay = `${(index % 5) * 0.08}s`;
    revealObserver.observe(el);
  });
}


/* =============================================================
   15. NAVBAR SCROLL SHADOW
   ============================================================= */

window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.style.boxShadow = window.scrollY > 20 ? '0 4px 40px rgba(0,0,0,.45)' : 'none';
}, { passive: true });


/* =============================================================
   16. LOGO INJECTION
   ============================================================= */

const LOGO_SRC = '';

function injectLogos() {
  if (!LOGO_SRC) return;
  document.querySelectorAll('.brand-mark img, .hero-orb-ring img, .story-logo img, .f-logo-box img').forEach((img) => {
    img.src = LOGO_SRC;
  });
}




/* =============================================================
   LIGHTBOX — full-size image viewer
   ============================================================= */

function openLightbox(src, alt) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lb-img');
  img.src = src;
  img.alt = alt || 'Product image';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

/* =============================================================
   17. INITIALISATION
   ============================================================= */

(function init() {
  // ── Progress bar animation ──
  const bar = document.getElementById('progress-bar');
  if (bar) {
    let w = 0;
    const tick = setInterval(() => {
      w = Math.min(w + Math.random() * 18, 85);
      bar.style.width = w + '%';
    }, 120);
    window.addEventListener('load', () => {
      clearInterval(tick);
      bar.style.width = '100%';
      bar.classList.add('done');
      document.body.classList.remove('page-loading');
    });
  }

  injectLogos();
  renderSections();
  renderUGC();
  renderTestimonialsInfinite();
  observeRevealElements();
  renderCartDrawer();
  updateNavDot();

  // Variant panel overlay click-to-close
  document.getElementById('vp-overlay').addEventListener('click', closeVariantPanel);

  // Escape key closes open panels + lightbox
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeVariantPanel();
      closeCart();
    }
  });

  // Auto-advance testimonials (infinite loop)
  startTestiAuto();

  // Pause on hover
  const testiSlider = document.querySelector('.testi-slider');
  if (testiSlider) {
    testiSlider.addEventListener('mouseenter', stopTestiAuto);
    testiSlider.addEventListener('mouseleave', startTestiAuto);
  }
})();