'use client';

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { formatPrice } from './products';

export const WA_NUMBER = '2349122253796'; // business WhatsApp number — shared with Contact page
const CART_KEY = '2krazzy_cart_v1';

export interface CartItem {
  slug: string;
  color: string;
  name: string;
  price: number;
  image: string;
  size?: string | null;
  qty: number;
}

type CartMap = Record<string, CartItem>;

interface CartContextValue {
  cart: CartMap;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  removeFromCart: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  isInCart: (slug: string, color: string, size?: string | null) => boolean;
  checkoutOnWhatsApp: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function cartKey(slug: string, color: string, size?: string | null) {
  return `${slug}::${color}${size ? '::' + size : ''}`;
}

function loadCart(): CartMap {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '{}') || {};
  } catch {
    return {};
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartMap>({});
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(loadCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  const addToCart: CartContextValue['addToCart'] = (item, qty = 1) => {
    const key = cartKey(item.slug, item.color, item.size);
    setCart((prev) => {
      const existing = prev[key];
      return {
        ...prev,
        [key]: existing ? { ...existing, qty: existing.qty + qty } : { ...item, qty },
      };
    });
    setIsOpen(true);
  };

  const removeFromCart = (key: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const updateQty = (key: string, qty: number) => {
    setCart((prev) => {
      if (!prev[key]) return prev;
      if (qty <= 0) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: { ...prev[key], qty } };
    });
  };

  const isInCart = (slug: string, color: string, size?: string | null) => !!cart[cartKey(slug, color, size)];

  const totalItems = useMemo(() => Object.values(cart).reduce((s, e) => s + e.qty, 0), [cart]);
  const totalPrice = useMemo(() => Object.values(cart).reduce((s, e) => s + e.price * e.qty, 0), [cart]);

  const checkoutOnWhatsApp = () => {
    const items = Object.values(cart);
    if (!items.length) return;
    const lines = items.map(
      (e) =>
        `• ${e.name} (${e.color}${e.size ? `, ${e.size}` : ''}) x${e.qty} — ${formatPrice(e.price * e.qty)}`
    );
    const message = [`Hi 2KRAZZY! I'd like to order:`, '', ...lines, '', `Total: ${formatPrice(totalPrice)}`].join(
      '\n'
    );
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        totalPrice,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addToCart,
        removeFromCart,
        updateQty,
        isInCart,
        checkoutOnWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export { cartKey };
