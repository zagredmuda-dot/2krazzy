'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import {
  subscribeEmail,
  markSubscribed,
  hasSubscribed,
  hasDismissedPopupThisSession,
  markPopupDismissedThisSession,
} from '@/lib/newsletter';
import { useFocusTrap } from '@/lib/useFocusTrap';

const SCROLL_TRIGGER_PERCENT = 22; // within the 20–25% band
const TIME_TRIGGER_MS = 9000; // within the 8–10s band

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const triggeredRef = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Eligibility check happens once, on mount — never for a subscribed
    // or already-this-session-dismissed visitor, on any page.
    if (hasSubscribed() || hasDismissedPopupThisSession()) return;

    const trigger = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      setVisible(true);
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = (window.scrollY / scrollable) * 100;
      if (percent >= SCROLL_TRIGGER_PERCENT) trigger();
    };

    const timer = setTimeout(trigger, TIME_TRIGGER_MS);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    markPopupDismissedThisSession();
    setVisible(false);
  };

  useFocusTrap(cardRef, visible, dismiss);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setError('');
    const result = await subscribeEmail(email);
    if (result.ok) {
      markSubscribed();
      setStatus('success');
    } else {
      setError(result.error);
      setStatus('error');
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center md:items-center">
      {/* Backdrop — clicking outside dismisses, exactly like the × */}
      <button
        aria-label="Dismiss"
        onClick={dismiss}
        className="absolute inset-0 bg-black/70"
      />

      <div className="relative w-full max-w-md border border-line bg-ink-2 p-6 pb-8 shadow-2xl md:mx-4 md:rounded-none md:p-8" ref={cardRef}>
        {/* Close button — always present, generously sized for one-hand mobile reach */}
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center text-muted hover:text-paper"
        >
          <X size={22} strokeWidth={1.75} />
        </button>

        {status === 'success' ? (
          <div className="py-4 text-center">
            <div className="text-2xl font-extrabold uppercase tracking-tight">You&rsquo;re In.</div>
            <p className="mt-2 text-sm text-muted">Welcome to the list. New drops land in your inbox first.</p>
          </div>
        ) : (
          <>
            <div className="pr-6 text-center">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight">Stay In The Loop.</h2>
              <p className="mt-2 text-sm text-muted">New drops. Limited releases. Straight to your inbox.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="border border-line bg-transparent px-4 py-3 text-center text-sm outline-none placeholder:text-muted focus:border-red"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-red py-3 text-xs font-bold uppercase tracking-[0.12em] disabled:opacity-60"
              >
                {status === 'loading' ? 'Joining…' : 'Join The List →'}
              </button>
              {status === 'error' && <p className="text-center text-xs text-red">{error}</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
