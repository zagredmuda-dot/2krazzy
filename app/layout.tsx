import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import NewsletterPopup from '@/components/NewsletterPopup';

export const metadata: Metadata = {
  title: '2KRAZZY — Born in Lagos. Built Different.',
  description: 'Too crazy to fold. Lagos streetwear — not for everyone.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-ink text-paper">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <NewsletterPopup />
        </CartProvider>
      </body>
    </html>
  );
}
