'use client';

import { useState } from 'react';
import { subscribeEmail, markSubscribed } from '@/lib/newsletter';

export default function NewsletterInlineForm({
  layout = 'row',
}: {
  /** 'row' — input + button side by side (Home). 'stacked' — button below (tighter columns, e.g. Contact). */
  layout?: 'row' | 'stacked';
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setError('');
    const result = await subscribeEmail(email);
    if (result.ok) {
      markSubscribed();
      setStatus('success');
      setEmail('');
    } else {
      setError(result.error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <p className="text-sm font-semibold uppercase tracking-[0.08em] text-red">You&rsquo;re In. ✓</p>;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        noValidate
        className={layout === 'row' ? 'flex flex-col gap-3 sm:flex-row' : 'flex flex-col gap-3'}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 border border-line bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted focus:border-red"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex items-center justify-center gap-2 border border-paper px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:bg-paper hover:text-ink disabled:opacity-60"
        >
          {status === 'loading' ? 'Joining…' : 'Subscribe →'}
        </button>
      </form>
      {status === 'error' && <p className="mt-2 text-xs text-red">{error}</p>}
    </div>
  );
}
