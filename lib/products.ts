/**
 * products.ts — 2KRAZZY product catalog.
 * Ported from the legacy data.js. This is the single source of
 * truth for Shop, Home, and Product pages, plus cart entries.
 */

export type VariantStatus = 'available' | 'soon';

export interface Variant {
  color: string;
  swatch: string;
  status: VariantStatus;
  images: string[];
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  tagline: string;
  price: number;
  description: string;
  badges: string[];
  sizes: string[];
  variants: Variant[];
}

export const PRODUCTS: Product[] = [
  // ---------------------------------------------------------------
  // TRACKSUITS
  // ---------------------------------------------------------------
  {
    slug: 'krazzy-tracksuit-v1',
    name: '2KRAZZY Tracksuit V1',
    category: 'tracksuits',
    categoryLabel: 'Tracksuits',
    tagline: 'Drip in motion',
    price: 69999,
    description:
      "Clean, bold, and built to move. A relaxed tracksuit silhouette with a heavyweight brushed-back fabric, ribbed cuffs, and an embroidered 2KRAZZY chest hit. Made for the days you're not folding for anyone.",
    badges: [],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { color: 'Black', swatch: '#0a0a0a', status: 'soon', images: ['/images/Track-suit-black.png'] },
      { color: 'Green', swatch: '#3c4a34', status: 'soon', images: ['/images/Track-suit-green.png'] },
      { color: 'Red', swatch: '#8c1f28', status: 'soon', images: ['/images/Track-suit-red.png'] },
      { color: 'Purple', swatch: '#4b3168', status: 'soon', images: ['/images/Track-suit-purple.png'] },
      { color: 'Blue', swatch: '#233a5e', status: 'soon', images: ['/images/Track-suit-blue.png'] },
    ],
  },
  

  // ---------------------------------------------------------------
  // TEE SHIRTS
  // ---------------------------------------------------------------
  {
    slug: 'krazzy-tee-shirts',
    name: '2Krazzy Tee Shirt',
    category: 'tees',
    categoryLabel: 'Tee Shirts',
    tagline: 'Wear the vibe. Own the moment.',
    price: 24999,
    description:
      'Premium quality T-shirt designed for comfort, style, and everyday wear. Perfectly crafted to give you a bold, effortless look',
    badges: [],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Black', swatch: '#0a0a0a', status: 'available', images: ['/images/tee-black.jpg'] },
      { color: 'White', swatch: '#f2efe7', status: 'available', images: ['/images/tee-white.jpg'] },
      { color: 'Red', swatch: '#8c1f28', status: 'available', images: ['/images/tee-white-red.jpg'] },
    ],
  },

  // ---------------------------------------------------------------
  // CADET CAPS
  // ---------------------------------------------------------------
  {
    slug: 'krazzy-cadet-cap',
    name: 'Krazzy Cadet Cap',
    category: 'caps',
    categoryLabel: 'Cadet Caps',
    tagline: 'Top off your style',
    price: 17999,
    description:
      'A structured cadet-cap silhouette with an embroidered 2KRAZZY crest, adjustable back strap, and a stiffened brim that holds its shape. Goes with everything.',
    badges: [],
    sizes: [],
    variants: [
      { color: 'Black', swatch: '#0a0a0a', status: 'available', images: ['/images/Cadet-cap-black.png'] },
      { color: 'Blue', swatch: '#2a4a6b', status: 'available', images: ['/images/Cadet-cap-blue.png'] },
      { color: 'Green', swatch: '#3d5a3a', status: 'available', images: ['/images/Cadet-cap-green.png'] },
      { color: 'Camo', swatch: '#5c5a45', status: 'available', images: ['/images/Cadet-cap-camo.png'] },
    ],
  },
  
  // ---------------------------------------------------------------
  // BOX TEES
  // ---------------------------------------------------------------
  {
    slug: 'krazzy-box-tee',
    name: '2Krazzy Box Tee',
    category: 'Box tees',
    categoryLabel: 'Box Tees',
    tagline: 'Wide fit. Clean drip.',
    price: 40000,
    description:
      'A boxy, dropped-shoulder tee cut from heavyweight cotton. Wide fit through the body, cropped sleeve, front graphic hit. The staple piece that works with anything.',
    badges: [],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { color: 'Black', swatch: '#0a0a0a', status: 'soon', images: ['/images/Box-tee-black.png'] },
      { color: 'White', swatch: '#f2efe7', status: 'soon', images: ['/images/Box-tee-white.png'] },
      { color: 'Blue', swatch: '#3a5a8c', status: 'soon', images: ['/images/Box-tee-blue.png'] },
      { color: 'Pink', swatch: '#d98aa0', status: 'soon', images: ['/images/Box-tee-pink.png'] },
      { color: 'Light Blue', swatch: '#9cc3d9', status: 'soon', images: ['/images/Box-tee-skyBlue.png'] },
      { color: 'Light Pink', swatch: '#e9c2cd', status: 'soon', images: ['/images/Box-tee-LightPink.png'] },
    ],
  },

  // ---------------------------------------------------------------
  // FACE CAPS
  // ---------------------------------------------------------------
  {
    slug: 'krazzy-face-cap',
    name: 'Krazzy Face Cap',
    category: 'caps',
    categoryLabel: 'Face Caps',
    tagline: 'Top it off right',
    price: 7999,
    description:
      'A classic six-panel trucker-style face cap with an embroidered 2KRAZZY logo patch and a breathable mesh back. Adjustable snap closure, one size fits most.',
    badges: [],
    sizes: [],
    variants: [
      {
        color: 'Black',
        swatch: '#0a0a0a',
        status: 'available',
        images: ['/images/Face-cap-black.jpeg'],
      },
      { color: 'Brown', swatch: '#6b4a35', status: 'available', images: ['/images/Face-cap-brown.jpeg'] },
      { color: 'Red', swatch: '#8c1f28', status: 'available', images: ['/images/Face-cap-red.jpeg'] },
      { color: 'Blue', swatch: '#0c3a8a', status: 'available', images: ['/images/Face-cap-blue.jpeg'] },
    ],
  },

  // {
  //   slug: 'krazzy-tracksuit-v2',
  //   name: '2KRAZZY Tracksuit V2',
  //   category: 'tracksuits',
  //   categoryLabel: 'Tracksuits',
  //   tagline: 'Drip in motion',
  //   price: 80000,
  //   description:
  //     'The second cut in the tracksuit line — same premium construction, back-panel wordmark treatment. Full zip jacket, tapered joggers, engineered for everyday wear.',
  //   badges: [],
  //   sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  //   variants: [
  //     { color: 'Black', swatch: '#0a0a0a', status: 'soon', images: ['/images/Track-suit-black.png'] },
  //     { color: 'Green', swatch: '#3c4a34', status: 'soon', images: ['/images/Track-suit-green.png'] },
  //     { color: 'Red', swatch: '#8c1f28', status: 'soon', images: ['/images/Track-suit-red.png'] },
  //     { color: 'Purple', swatch: '#4b3168', status: 'soon', images: ['/images/Track-suit-purple.png'] },
  //   ],
  // },

// {
  //   slug: 'krazzy-cadet-cap-v2',
  //   name: 'Krazzy Cadet Cap V2',
  //   category: 'caps',
  //   categoryLabel: 'Cadet Caps',
  //   tagline: 'Top off your style',
  //   price: 20000,
  //   description:
  //     'A lower-profile take on the cadet cap with a debossed leather-look back patch. Same all-day comfort, sharper back-of-cap branding.',
  //   badges: [],
  //   sizes: [],
  //   variants: [
  //     { color: 'Black', swatch: '#0a0a0a', status: 'available', images: ['/images/Cadet-cap-black.png'] },
  //     { color: 'Blue', swatch: '#2a4a6b', status: 'available', images: ['/images/Cadet-cap-blue.png'] },
  //     { color: 'Green', swatch: '#3d5a3a', status: 'available', images: ['/images/Cadet-cap-green.png'] },
  //     { color: 'Camo', swatch: '#5c5a45', status: 'available', images: ['/images/Cadet-cap-camo.png'] },
  //   ],
  // },


 

  // ---------------------------------------------------------------
  // TROUSERS
  // ---------------------------------------------------------------
  {
    slug: 'krazzy-crew-joggers',
    name: 'Krazzy 2K Crew Joggers',
    category: 'trousers',
    categoryLabel: 'Trousers',
    tagline: 'Relaxed fit, all day comfort',
    price: 29999,
    description:
      'A relaxed jogger silhouette with a drawstring waist, tapered leg, and embroidered crew branding at the hem. All-day comfort, all-day drip.',
    badges: ['NEW'],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [{ color: 'Cream', swatch: '#e9e2cf', status: 'soon', images: ['/images/trouser2.jpg'] }],
  },
  {
    slug: 'krazzy-goth-camo',
    name: 'Krazzy 2K Goth Camo',
    category: 'trousers',
    categoryLabel: 'Trousers',
    tagline: '3-quarter cut',
    price: 19999,
    description:
      'Dark camo print on a cropped 3-quarter cut. Street energy meets outdoor utility — limited run.',
    badges: [],
    sizes: ['S', 'M', 'L'],
    variants: [{ color: 'Camo', swatch: '#4a4a3a', status: 'soon', images: ['/images/trouser.jpg'] }],
  },

  // ---------------------------------------------------------------
  // LONG-SLEEVES
  // ---------------------------------------------------------------
  {
    slug: 'krazzy-built-long-sleeve',
    name: 'Krazzy Built Long-Sleeve',
    category: 'long-sleeves',
    categoryLabel: 'Long-Sleeves',
    tagline: 'Built for cold streets',
    price: 29999,
    description:
      'A heavyweight long-sleeve with a statement graphic panel across the chest. Built for when the streets get cold.',
    badges: ['HOT'],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [{ color: 'Black', swatch: '#0a0a0a', status: 'soon', images: ['/images/long-sleeve.jpg'] }],
  },
  {
    slug: 'krazzy-skater-long-sleeve',
    name: 'Krazzy Skater Long-Sleeve',
    category: 'long-sleeves',
    categoryLabel: 'Long-Sleeves',
    tagline: 'Loose fit, dropped shoulder',
    price: 92000,
    description: 'Skate-culture inspired long-sleeve. Loose fit, dropped shoulders, all-over graphic placement.',
    badges: [],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [{ color: 'Grey', swatch: '#6b6b66', status: 'soon', images: ['/images/long-sleeve2.jpg'] }],
  },

  // // ---------------------------------------------------------------
  // // HOODIE
  // // ---------------------------------------------------------------
  // {
  //   slug: 'krazzy-hoodie',
  //   name: '2KRAZZY Hoodie',
  //   category: 'hoodies',
  //   categoryLabel: 'Hoodies',
  //   tagline: 'Heavyweight. Everyday.',
  //   price: 69999,
  //   description:
  //     'A heavyweight pullover hoodie with a lined hood, kangaroo pocket, and ribbed cuffs. The everyday piece that anchors the collection.',
  //   badges: [],
  //   sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  //   variants: [{ color: 'Black', swatch: '#0a0a0a', status: 'soon', images: ['/images/long-sleeve.jpg'] }],
  // },

  // ---------------------------------------------------------------
  // TANK TOP
  // ---------------------------------------------------------------
  {
    slug: 'krazzy-tank-top',
    name: '2Krazzy Tank Top',
    category: 'tees',
    categoryLabel: 'Tanks',
    tagline: 'Sleeveless. Statement piece.',
    price: 29999,
    description: 'A ribbed sleeveless tank with a bold front number graphic. Built for warm nights out.',
    badges: [],
    sizes: ['S', 'M', 'L', 'XL'],
    variants: [{ color: 'Cream', swatch: '#EDE4D3', status: 'available', images: ['/images/tank-cream.jpg'] },
     { color: 'Red', swatch: '#D32F2F', status: 'available', images: ['/images/tank-red.jpg'] },
      { color: 'Pink', swatch: '#FF1A75', status: 'available', images: ['/images/tank-pink.jpg'] },
    ],
  },
  
  // ---------------------------------------------------------------
  // Beanies
  // ---------------------------------------------------------------
   {
    slug: 'krazzy skeleton beanie',
    name: 'Krazzy Skeleton Beanie',
    category: 'caps',
    categoryLabel: 'Beanies',
    tagline: 'Bone-chilling style. Krazy by nature',
    price: 12999,
    description:
      'Soft periwinkle blue beanie featuring a glowing X-ray skeleton hand. Cozy strech fit  with a classic cuff.',
    badges: ['NEW'],
    sizes: [],
    variants: [{ color: '', swatch: '#7090c8', status: 'available', images: ['/images/skeleton-beanie.jpg'] }],
  },
];

/** First variant whose status is 'available', else the first variant. */
export function primaryVariant(product: Product): Variant {
  return product.variants.find((v) => v.status === 'available') || product.variants[0];
}

/** True if ANY variant of a product can be bought right now. */
export function isProductAvailable(product: Product): boolean {
  return product.variants.some((v) => v.status === 'available');
}

export function findProduct(slug: string | null | undefined): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function findVariant(product: Product, color?: string | null): Variant {
  return product.variants.find((v) => v.color === color) || primaryVariant(product);
}

/** Flat list of { product, variant } pairs — one entry per swatch. */
export function flattenCatalog(): { product: Product; variant: Variant }[] {
  const out: { product: Product; variant: Variant }[] = [];
  PRODUCTS.forEach((product) => {
    product.variants.forEach((variant) => out.push({ product, variant }));
  });
  return out;
}

export function categoryList(): { value: string; label: string }[] {
  const seen = new Map<string, string>();
  PRODUCTS.forEach((p) => {
    if (!seen.has(p.category)) seen.set(p.category, p.categoryLabel);
  });
  return Array.from(seen, ([value, label]) => ({ value, label }));
}

export function formatPrice(n: number): string {
  return '₦' + Number(n).toLocaleString('en-NG');
}

/** True if a product carries a given promotional badge (e.g. 'NEW', 'HOT'). Purely promotional — never required. */
export function hasBadge(product: Product, badge: string): boolean {
  return product.badges.includes(badge);
}

// Home "Collection 001" grid — matches the reference's Tank / Tee / Hoodie / Cap spread.
export const HOME_DROP_SLUGS = ['krazzy-tank-top', 'krazzy-tee-shirts', 'krazzy-tracksuit-v1', 'krazzy-cadet-cap'];
