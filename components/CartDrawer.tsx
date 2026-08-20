'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2 } from 'lucide-react';
import { useCart, cartKey } from '@/lib/cart';
import { formatPrice } from '@/lib/products';
import { useFocusTrap } from '@/lib/useFocusTrap';

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateQty, removeFromCart, totalPrice, checkoutOnWhatsApp } = useCart();
  const items = Object.entries(cart);
  const drawerRef = useRef<HTMLElement>(null);

  useFocusTrap(drawerRef, isOpen, closeCart);

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        ref={drawerRef}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-ink-2 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div className="text-sm font-extrabold uppercase tracking-[0.12em]">Your Cart</div>
          <button onClick={closeCart} aria-label="Close cart" className="flex items-center">
            <X size={22} strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-sm text-muted">Your cart is empty.</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-red hover:opacity-80"
              >
                Continue Shopping →
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map(([key, item]) => (
                <li key={key} className="flex gap-4">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-ink-3">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="text-xs font-semibold uppercase tracking-wide">{item.name}</div>
                    <div className="text-[11px] text-muted">
                      {item.color}
                      {item.size ? ` · ${item.size}` : ''}
                    </div>
                    <div className="mt-1 text-xs font-semibold">{formatPrice(item.price)}</div>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        onClick={() => updateQty(cartKey(item.slug, item.color, item.size), item.qty - 1)}
                        className="h-6 w-6 border border-line text-xs"
                      >
                        −
                      </button>
                      <span className="text-xs">{item.qty}</span>
                      <button
                        onClick={() => updateQty(cartKey(item.slug, item.color, item.size), item.qty + 1)}
                        className="h-6 w-6 border border-line text-xs"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(cartKey(item.slug, item.color, item.size))}
                        aria-label={`Remove ${item.name} from cart`}
                        className="ml-auto text-muted hover:text-red"
                      >
                        <Trash2 size={15} strokeWidth={1.75} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-line px-6 py-5">
            <div className="mb-4 flex items-center justify-between text-sm font-semibold">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <button
              onClick={checkoutOnWhatsApp}
              className="flex w-full items-center justify-center gap-2 bg-red py-3 text-xs font-bold uppercase tracking-[0.12em]"
            >
              Checkout on WhatsApp →
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
