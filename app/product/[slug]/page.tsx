'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { findProduct, findVariant, formatPrice } from '@/lib/products';
import { useCart } from '@/lib/cart';

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const product = findProduct(params.slug);
  const { addToCart, isInCart } = useCart();

  const [color, setColor] = useState<string | undefined>(product ? findVariant(product, undefined).color : undefined);
  const [size, setSize] = useState<string | null>(product ? product.sizes[0] ?? null : null);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <section className="px-5 py-24 text-center">
        <h1 className="text-2xl font-extrabold uppercase">Product not found</h1>
        <Link href="/shop" className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.1em] text-red">
          ← Back to Shop
        </Link>
      </section>
    );
  }

  const variant = findVariant(product, color);
  const available = variant.status === 'available';
  const inCart = isInCart(product.slug, variant.color, size);

  return (
    <section className="px-5 py-10 md:px-8 md:py-14">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-16">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[3/4] overflow-hidden bg-ink-3">
            <Image
              src={variant.images[activeImage] ?? variant.images[0]}
              alt={`${product.name} in ${variant.color}`}
              fill
              className="object-cover"
              priority
            />
          </div>
          {variant.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {variant.images.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-16 w-14 shrink-0 overflow-hidden border ${
                    i === activeImage ? 'border-red' : 'border-line'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="eyebrow">{product.categoryLabel}</div>
          <h1 className="mt-2 text-2xl font-extrabold uppercase tracking-tight md:text-3xl">{product.name}</h1>
          <p className="mt-1 text-sm text-muted">{product.tagline}</p>
          <div className="mt-4 text-xl font-semibold">{formatPrice(product.price)}</div>

          <span
            className={`mt-3 inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] ${
              available ? 'bg-paper text-ink' : 'bg-ink-3 text-muted'
            }`}
          >
            {available ? 'In Stock' : 'Coming Soon'}
          </span>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">{product.description}</p>

          {/* Color picker — status is explicit per swatch, not just implied by opacity */}
          {product.variants.length > 1 && (
            <div className="mt-8">
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                Color — <span className="text-paper">{color}</span>
                {!available && <span className="ml-2 text-red">Coming Soon in this color</span>}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-3">
                {product.variants.map((v) => (
                  <button
                    key={v.color}
                    onClick={() => {
                      setColor(v.color);
                      setActiveImage(0);
                    }}
                    title={`${v.color}${v.status === 'soon' ? ' — Coming Soon' : ''}`}
                    className="flex flex-col items-center gap-1"
                  >
                    <span
                      className={`h-9 w-9 rounded-full border-2 ${
                        v.color === color ? 'border-red' : 'border-line'
                      } ${v.status === 'soon' ? 'opacity-40' : ''}`}
                      style={{ background: v.swatch }}
                    />
                    <span
                      className={`text-[8px] font-semibold uppercase tracking-wide ${
                        v.status === 'soon' ? 'text-muted' : 'text-transparent'
                      }`}
                    >
                      {v.status === 'soon' ? 'Soon' : '·'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size picker */}
          {product.sizes.length > 0 && (
            <div className="mt-8">
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                Size — <span className="text-paper">{size}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-10 min-w-[2.6rem] border px-3 text-xs font-semibold ${
                      s === size ? 'border-red bg-red text-paper' : 'border-line hover:border-paper'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            disabled={!available}
            onClick={() =>
              addToCart({
                slug: product.slug,
                color: variant.color,
                name: product.name,
                price: product.price,
                image: variant.images[0],
                size,
              })
            }
            className={`mt-10 flex w-full items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-[0.12em] sm:w-auto sm:px-10 ${
              available ? 'bg-red text-paper hover:opacity-90' : 'cursor-not-allowed bg-ink-3 text-muted'
            }`}
          >
            {!available ? 'Coming Soon' : inCart ? 'Added ✓ — Add Another' : 'Add to Cart →'}
          </button>
        </div>
      </div>
    </section>
  );
}
