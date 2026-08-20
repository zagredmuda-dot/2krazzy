'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Mail, MessageCircle } from 'lucide-react';
import { SiWhatsapp, SiInstagram } from '@icons-pack/react-simple-icons';
import { WA_NUMBER } from '@/lib/cart';
import { submitContactForm } from '@/lib/contact';
import NewsletterInlineForm from '@/components/NewsletterInlineForm';
import Reveal from '@/components/Reveal';

const FAQS = [
  {
    q: 'Shipping Information',
    a: 'Orders are confirmed and processed over WhatsApp once you place them. Lagos deliveries typically arrive within 1–3 business days; other states orders vary by destination.',
  },
  // {
  //   q: 'Returns & Exchanges',
  //   a: 'We accept exchanges for sizing issues within 3 days of delivery, provided the item is unworn with tags attached. Reach out on WhatsApp to start the process.',
  // },
  // {
  //   q: 'Sizing Guide',
  //   a: 'Each product page lists available sizes. If you\u2019re between sizes, message us on WhatsApp with your measurements and we\u2019ll help you pick.',
  // },
  {
    q: 'Payment Methods',
    a: 'Orders are confirmed via WhatsApp, where we\u2019ll share available payment options including bank transfer.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Most Lagos orders arrive in 1–3 business days. Other locations within Nigeria typically take 3–7 business days.',
  },
  // {
  //   q: 'Do you ship internationally?', 
  //   a: 'Yes — we ship worldwide. International delivery timelines and costs are confirmed per order over WhatsApp.',
  // },
];

const TOUCH_POINTS = [
  {
    label: 'WhatsApp',
    detail: 'Fastest way to order and get a response.',
    href: `https://wa.me/${WA_NUMBER}`,
    primary: true,
    Icon: SiWhatsapp,
  },
  { label: 'Instagram', detail: 'Campaigns. Drops. Behind the scenes.', href: 'https://instagram.com', Icon: SiInstagram },
  { label: 'Email', detail: 'Business inquiries and collaborations.', href: 'mailto:hello@2krazzy.com', Icon: Mail },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setError('');
    const result = await submitContactForm(form);
    if (result.ok) {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } else {
      setError(result.error);
      setStatus('error');
    }
  };

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative flex h-[42vh] min-h-[320px] items-end overflow-hidden border-b border-line md:h-[46vh]">
        <Image src="/images/contact-campaign.jpeg" alt="2KRAZZY" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
        <div className="relative z-10 px-5 pb-8 md:px-8 md:pb-10">
          <div className="eyebrow">Contact</div>
          <h1 className="mt-2 text-4xl font-extrabold uppercase tracking-tight md:text-5xl">Let&rsquo;s Connect.</h1>
          <p className="mt-2 max-w-sm text-sm text-muted">Built Different. Stay Connected.</p>
        </div>
      </section>

      {/* ---------------- GET IN TOUCH + FORM ---------------- */}
      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
          {/* Touch points */}
          <Reveal>
            <div className="eyebrow">01 · Get In Touch</div>
            <div className="mt-6 space-y-3">
              {TOUCH_POINTS.map((t) => (
                <a
                  key={t.label}
                  href={t.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-4 border px-5 py-4 transition-colors ${
                    t.primary ? 'border-red bg-red/10 hover:bg-red/20' : 'border-line hover:border-paper'
                  }`}
                >
                  <t.Icon size={20} />
                  <div className="flex-1">
                    <div className="text-sm font-bold uppercase tracking-[0.06em]">{t.label}</div>
                    <div className="mt-0.5 text-xs text-muted">{t.detail}</div>
                  </div>
                  <span className="text-lg">→</span>
                </a>
              ))}
            </div>
            <p className="mt-5 text-xs text-muted">
              We respond to every message. <span className="text-paper">Thank you for choosing 2KRAZZY.</span>
            </p>
          </Reveal>

          {/* Secondary channel: contact form */}
          <Reveal>
            <div className="eyebrow">02 · Send A Message</div>
            {status === 'success' ? (
              <div className="mt-6 flex flex-col items-center border border-line px-5 py-8 text-center">
                <MessageCircle size={28} className="text-red" strokeWidth={1.5} />
                <div className="mt-3 text-lg font-extrabold uppercase tracking-tight">Message Sent ✓</div>
                <p className="mt-2 text-sm text-muted">We&rsquo;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-line bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted focus:border-red"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-line bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted focus:border-red"
                />
                <textarea
                  rows={5}
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-line bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted focus:border-red"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-red py-3 text-xs font-bold uppercase tracking-[0.12em] disabled:opacity-60"
                >
                  {status === 'loading' ? 'Sending…' : 'Send Message →'}
                </button>
                {status === 'error' && <p className="text-xs text-red">{error}</p>}
                <p className="text-[11px] text-muted">
                  🔒 We respect your privacy. Your information will never be shared.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="border-t border-line px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="eyebrow">03 · Frequently Asked</div>
          <div className="mt-6 divide-y divide-line border-t border-b border-line">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold uppercase tracking-[0.04em]"
                  >
                    {f.q}
                    <span className="text-lg text-muted">{open ? '−' : '+'}</span>
                  </button>
                  {open && <p className="pb-4 text-sm leading-relaxed text-muted">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- BASED IN / SHIPPING ---------------- */}
      <section className="border-t border-line px-5 py-8 text-center md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
          Based in Lagos, Nigeria. <span className="text-paper">We ship Nationwide.</span>
        </p>
      </section>

      {/* ---------------- NEWSLETTER ---------------- */}
      <section className="border-t border-line px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="eyebrow">Newsletter</div>
          <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight md:text-4xl">Join The List</h2>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Be the first to know about new collections and exclusives. No spam.
          </p>
          <div className="mt-6 max-w-md">
            <NewsletterInlineForm layout="row" />
          </div>
        </div>
      </section>
    </>
  );
}
