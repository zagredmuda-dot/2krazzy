'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, isProductAvailable, formatPrice } from '@/lib/products';
import { useCart } from '@/lib/cart';

export default function ProductCard({
  product,
  showQuickAdd = true,
}: {
  product: Product;
  showQuickAdd?: boolean;
}) {
  const { addToCart } = useCart();
  const [colorIndex, setColorIndex] = useState(() => {
    const idx = product.variants.findIndex((v) => v.status === 'available');
    return idx >= 0 ? idx : 0;
  });
  const [sizePickerOpen, setSizePickerOpen] = useState(false);

  const variant = product.variants[colorIndex];
  const productAvailable = isProductAvailable(product); // any-variant rule — bucket placement
  const variantAvailable = variant.status === 'available';
  const needsSize = product.sizes.length > 0;

  const handleQuickAdd = () => {
    if (!variantAvailable) return;
    if (needsSize) {
      setSizePickerOpen(true);
      return;
    }
    addToCart({
      slug: product.slug,
      color: variant.color,
      name: product.name,
      price: product.price,
      image: variant.images[0],
      size: null,
    });
  };

  const handlePickSize = (size: string) => {
    addToCart({
      slug: product.slug,
      color: variant.color,
      name: product.name,
      price: product.price,
      image: variant.images[0],
      size,
    });
    setSizePickerOpen(false);
  };

  return (
    <div className="group relative">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-ink-3">
          <Image
            src={variant.images[0]}
            alt={`${product.name} in ${variant.color}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <span
            className={`absolute left-2 top-2 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] ${
              productAvailable ? 'bg-paper text-ink' : 'bg-ink/80 text-muted'
            }`}
          >
            {productAvailable ? 'Available' : 'Soon'}
          </span>
          {product.badges.map((b) => (
            <span
              key={b}
              className="absolute right-2 top-2 bg-red px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em]"
            >
              {b}
            </span>
          ))}
        </div>
      </Link>

      {showQuickAdd && (
        <div className="absolute right-2 top-[2.6rem]">
          <button
            onClick={handleQuickAdd}
            disabled={!variantAvailable}
            aria-label={variantAvailable ? 'Quick add to bag' : 'Coming soon'}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
              variantAvailable ? 'bg-paper text-ink' : 'cursor-not-allowed bg-ink/60 text-muted'
            }`}
          >
            +
          </button>

          {sizePickerOpen && (
            <>
              <button
                aria-label="Close size picker"
                onClick={() => setSizePickerOpen(false)}
                className="fixed inset-0 z-40 cursor-default"
              />
              <div className="absolute right-0 z-50 mt-2 w-36 border border-line bg-ink-2 p-2 shadow-xl">
                <div className="mb-2 px-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted">
                  Select Size
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => handlePickSize(s)}
                      className="border border-line py-1.5 text-[11px] font-semibold hover:border-red hover:text-red"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {product.variants.length > 1 && (
        <div className="mt-2 flex gap-1.5">
          {product.variants.map((v, i) => (
            <button
              key={v.color}
              title={v.color}
              onClick={(e) => {
                e.preventDefault();
                setColorIndex(i);
              }}
              className={`h-3.5 w-3.5 rounded-full border transition-all ${
                i === colorIndex ? 'border-red ring-1 ring-red' : 'border-line'
              }`}
              style={{ background: v.swatch }}
            />
          ))}
        </div>
      )}

      <Link href={`/product/${product.slug}`} className="mt-2 block">
        <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
          {product.categoryLabel}
        </div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.06em]">{product.name}</h3>
        <div className="mt-1 text-xs font-semibold">{formatPrice(product.price)}</div>
      </Link>
    </div>
  );
}
