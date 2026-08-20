import Link from 'next/link';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { SiInstagram, SiTiktok } from '@icons-pack/react-simple-icons';

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="2KRAZZY" width={40} height={40} className="h-9 w-9 object-contain" />
            <div className="text-base font-extrabold tracking-[0.12em]">2KRAZZY</div>
          </div>
          <p className="mt-4 text-xs tracking-[0.15em] text-muted">
            BORN IN LAGOS.
            <br />
            BUILT DIFFERENT.
          </p>
        </div>

        <div>
          <div className="eyebrow mb-4">Menu</div>
          <ul className="space-y-3 text-xs font-semibold uppercase tracking-[0.1em]">
            <li><Link href="/" className="hover:text-red">Home</Link></li>
            <li><Link href="/shop" className="hover:text-red">Shop</Link></li>
            <li><Link href="/about" className="hover:text-red">About</Link></li>
            <li><Link href="/contact" className="hover:text-red">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-4">Connect</div>
          <ul className="space-y-3 text-xs font-semibold uppercase tracking-[0.1em]">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-red"
              >
                <SiInstagram size={14} /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-red"
              >
                <SiTiktok size={14} /> TikTok
              </a>
            </li>
            <li>
              <a href="mailto:hello@2krazzy.com" className="flex items-center gap-2 hover:text-red">
                <Mail size={14} strokeWidth={1.75} /> Email
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-line pt-6 text-[10px] tracking-[0.15em] text-muted">
        © {new Date().getFullYear()} 2KRAZZY. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
