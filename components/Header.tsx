'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { useFocusTrap } from '@/lib/useFocusTrap';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useFocusTrap(menuRef, menuOpen, () => setMenuOpen(false));

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <Image src="/images/logo.png" alt="2KRAZZY" width={34} height={34} className="h-8 w-8 object-contain" />
            <div className="leading-none">
              <div className="text-sm font-extrabold tracking-[0.12em]">2KRAZZY</div>
              <div className="hidden text-[9px] tracking-[0.2em] text-muted md:block">BORN IN LAGOS</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`text-xs font-semibold tracking-[0.12em] uppercase transition-colors hover:text-red ${
                  pathname === n.href ? 'text-red' : 'text-paper'
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button onClick={openCart} aria-label="Open cart" className="relative flex items-center">
              <ShoppingBag size={20} strokeWidth={1.75} />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red text-[9px] font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            <button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="flex items-center md:hidden">
              <Menu size={22} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div ref={menuRef} className="fixed inset-0 z-50 flex flex-col bg-ink px-6 py-5 md:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
              <Image src="/images/logo.png" alt="2KRAZZY" width={34} height={34} className="h-8 w-8 object-contain" />
              <div className="text-sm font-extrabold tracking-[0.12em]">2KRAZZY</div>
            </Link>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="flex items-center">
              <X size={26} strokeWidth={1.75} />
            </button>
          </div>

          <nav className="mt-16 flex flex-1 flex-col gap-8">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="text-4xl font-extrabold uppercase tracking-tight"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="pb-4 text-[10px] tracking-[0.2em] text-muted">
            BORN IN LAGOS.
            <br />
            BUILT DIFFERENT.
          </div>
        </div>
      )}
    </>
  );
}
