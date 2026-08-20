'use client';

import { useMemo, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, categoryList, isProductAvailable, hasBadge } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';

// Curated featured banner — pick ONE collection to spotlight, not every category.
// Swap `slug`/image/copy here to feature a different drop; layout stays put.
const FEATURED = {
  category: 'tracksuits',
  eyebrow: '001',
  title: 'Tracksuits',
  tagline: 'Drip in motion.',
  image: '/images/shop-campaign.jpeg',
};

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [category, setCategory] = useState(initialCategory);
  const [newOnly, setNewOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const cats = categoryList();

  const matches = (p: (typeof PRODUCTS)[number]) => {
    if (category !== 'all' && p.category !== category) return false;
    if (newOnly && !hasBadge(p, 'NEW')) return false;
    return true;
  };

  const available = useMemo(() => PRODUCTS.filter((p) => isProductAvailable(p) && matches(p)), [category, newOnly]);
  const comingSoon = useMemo(
    () => PRODUCTS.filter((p) => !isProductAvailable(p) && matches(p)),
    [category, newOnly]
  );

  return (
    <section className="px-5 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="eyebrow">The Collection</div>
        <h1 className="mt-2 text-4xl font-extrabold uppercase tracking-tight md:text-5xl">Shop All</h1>
        <p className="mt-2 max-w-sm text-sm text-muted">Premium pieces. Built different. For those who never fold.</p>

        {/* Category filter */}
        <div className="scroll-row -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
          {[{ value: 'all', label: 'All' }, ...cats].map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`shrink-0 border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                category === c.value
                  ? 'border-red bg-red text-paper'
                  : 'border-line text-muted hover:border-paper hover:text-paper'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* New / Available toggles */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setNewOnly((v) => !v)}
            className={`border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors ${
              newOnly ? 'border-red bg-red text-paper' : 'border-line text-muted hover:border-paper hover:text-paper'
            }`}
          >
            New
          </button>
          <button
            onClick={() => setAvailableOnly((v) => !v)}
            className={`border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors ${
              availableOnly
                ? 'border-red bg-red text-paper'
                : 'border-line text-muted hover:border-paper hover:text-paper'
            }`}
          >
            Available Only
          </button>
        </div>

        {/* Curated featured banner — one collection, not a hero-per-category grid */}
        {category === 'all' && !newOnly && !availableOnly && (
          <Reveal>
            <div className="group relative mt-8 flex h-[46vh] items-end overflow-hidden md:h-[52vh]">
              <Image
                src={FEATURED.image}
                alt={FEATURED.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              {/* <div className="relative z-10 p-6">
                <div className="eyebrow">{FEATURED.eyebrow}</div>
                <div className="mt-1 text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
                  {FEATURED.title}
                </div>
                <p className="mt-1 text-sm text-muted">{FEATURED.tagline}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-red">
                  Explore Collection →
                </span>
              </div> */}
            </div>
          </Reveal>
        )}

        {/* Available Now */}
        {available.length > 0 && (
          <div className="mt-12">
            <Reveal>
              <div className="mb-6 flex items-baseline justify-between">
                <h2 className="text-xl font-extrabold uppercase tracking-tight md:text-2xl">Available Now</h2>
                <span className="text-xs text-muted">{available.length} Styles</span>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {available.map((product) => (
                <Reveal key={product.slug}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Coming Soon */}
        {!availableOnly && comingSoon.length > 0 && (
          <div className="mt-14">
            <Reveal>
              <div className="mb-6 flex items-baseline justify-between border-t border-line pt-8">
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-muted md:text-2xl">
                  Coming Soon
                </h2>
                <span className="text-xs text-muted">{comingSoon.length} Styles</span>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-4 opacity-80 md:grid-cols-4 md:gap-6">
              {comingSoon.map((product) => (
                <Reveal key={product.slug}>
                  <ProductCard product={product} showQuickAdd={false} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {available.length === 0 && comingSoon.length === 0 && (
          <p className="mt-16 text-sm text-muted">No products match these filters yet.</p>
        )}
      </div>
    </section>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopContent />
    </Suspense>
  );
}
