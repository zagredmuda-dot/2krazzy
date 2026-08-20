import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <div className="eyebrow">404</div>
      <h1 className="mt-2 text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-5xl">
        Too Crazy To Fold.
        <br />
        <span className="text-red">But This Page Did.</span>
      </h1>
      <p className="mt-4 max-w-sm text-sm text-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist, or it moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 border border-paper px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:bg-paper hover:text-ink"
        >
          Back To Home →
        </Link>
        <Link
          href="/shop"
          className="flex items-center justify-center gap-2 bg-red px-6 py-3 text-xs font-bold uppercase tracking-[0.12em]"
        >
          Shop Collection →
        </Link>
      </div>
    </section>
  );
}
