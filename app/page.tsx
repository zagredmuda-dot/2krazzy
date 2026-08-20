import Link from 'next/link';
import Image from 'next/image';
import { HOME_DROP_SLUGS, findProduct, formatPrice } from '@/lib/products';
import Reveal from '@/components/Reveal';
import NewsletterInlineForm from '@/components/NewsletterInlineForm';

const dropProducts = HOME_DROP_SLUGS.map((s) => findProduct(s)!).filter(Boolean);

const dropImages: Record<string, string> = {
  'krazzy-tank-top': '/images/model-tank.png',
  'krazzy-tee-shirts': '/images/model-tee.png',
  'krazzy-tracksuit-v1': '/images/model-track.png',
  'krazzy-cadet-cap': '/images/model-cadet.png',
};
const campaignImages = [
  '/images/campaign-1.jpg',
  '/images/campaign-2.jpg',
  '/images/campaign-3.jpeg',
  '/images/campaign-4.jpeg',
];
export default function Home() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      {/* Mobile / tablet: headline overlaid directly on the image, matching reference */}
      <section className="relative overflow-hidden border-b border-line md:hidden">
        <div className="relative h-[78vh] min-h-[540px]">
          <Image
            src="/images/hero-img.png"
            alt="2KRAZZY — Too Crazy To Fold"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: '78% 8%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />

          <div className="relative z-10 flex h-full flex-col justify-between px-5 py-8">
            <div />
            <div>
              <h1 className="text-[3.2rem] font-extrabold uppercase leading-[0.92] tracking-tight">
                Too
                <br />
                Crazy
                <br />
                To
                <br />
                Fold<span className="text-red">.</span>
              </h1>
              <div className="mt-5 h-[2px] w-10 bg-red" />
              <p className="mt-4 text-sm text-muted">Not for everyone.</p>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/shop"
                  className="flex items-center justify-center gap-2 bg-red px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-90"
                >
                  Shop Collection →
                </Link>
                <Link
                  href="/about"
                  className="flex items-center justify-center gap-2 border border-paper px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:bg-paper hover:text-ink"
                >
                  Our Story →
                </Link>
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                Born in Lagos.
                <br />
                Built different.
              </div>
              <div className="flex flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                Scroll
                <span className="text-base">↓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop: two-column composition — same identity, wider canvas */}
      <section className="relative hidden overflow-hidden border-b border-line md:block">
        <div className="mx-auto grid max-w-7xl grid-cols-2 items-center px-8">
          <div className="relative z-10 col-start-1 row-start-1 py-24">
            <h1 className="text-[5.2rem] font-extrabold uppercase leading-[0.92] tracking-tight">
              Too
              <br />
              Crazy
              <br />
              To
              <br />
              Fold<span className="text-red">.</span>
            </h1>
            <div className="mt-6 h-[2px] w-10 bg-red" />
            <p className="mt-4 text-base text-muted">Not for everyone.</p>

            <div className="mt-10 flex flex-row gap-3">
              <Link
                href="/shop"
                className="flex items-center justify-center gap-2 bg-red px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-90"
              >
                Shop Collection →
              </Link>
              <Link
                href="/about"
                className="flex items-center justify-center gap-2 border border-paper px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:bg-paper hover:text-ink"
              >
                Our Story →
              </Link>
            </div>
          </div>

          <div className="relative col-start-2 row-start-1 h-[85vh]">
            <Image
              src="/images/hero-img.png"
              alt="2KRAZZY — Too Crazy To Fold"
              fill
              priority
              className="object-cover"
              style={{ objectPosition: '70% 5%' }}
            />
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            Born in Lagos.
            <br />
            Built different.
          </div>
          <div className="flex flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            Scroll
            <span className="text-base">↓</span>
          </div>
        </div>
      </section>

      {/* ---------------- COLLECTION 001 / NEW DROP ---------------- */}
      <section className="border-b border-line px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <div className="eyebrow">New Drop</div>
                <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight md:text-4xl">Collection 001</h2>
              </div>
              <Link href="/shop" className="text-lg">
                →
              </Link>
            </div>
          </Reveal>

          <div className="scroll-row -mx-5 flex gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0">
            {dropProducts.map((product) => (
              <Reveal key={product.slug} className="w-[42vw] shrink-0 md:w-auto" as="div">
                <Link href={`/product/${product.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-ink-3">
                    <Image
                      src={dropImages[product.slug]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 42vw, 25vw"
                    />
                  </div>
                  <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                    {product.name.includes('Tank') ? 'Tank' : product.categoryLabel}
                  </div>
                  <div className="text-xs font-semibold">{formatPrice(product.price)}</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- EDITORIAL ---------------- */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl md:grid-cols-2">
          <Reveal className="flex flex-col justify-center px-5 py-14 md:px-8 md:py-0">
            <div className="eyebrow">Editorial</div>
            <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight md:text-4xl">Collection 001</h2>
            <Link href="/shop?category=tracksuits" className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]">
              Shop Collection 001 →
            </Link>
          </Reveal>
          <Reveal className="relative h-[60vh] md:h-[70vh]">
            <Image src="/images/editorial.png" alt="Collection 001 editorial" fill className="object-cover" />
          </Reveal>
        </div>
      </section>

      {/* ---------------- PHILOSOPHY ---------------- */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl md:grid-cols-2">
          <Reveal className="flex flex-col justify-center px-5 py-14 md:px-8 md:py-0">
            <div className="eyebrow">Our Philosophy</div>
            <h2 className="mt-2 text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-4xl">
              Too Crazy
              <br />
              To Fold
            </h2>
            <p className="mt-4 max-w-sm text-sm text-muted">
              Means refusing to shrink yourself just because the world expects it. We make for the ones who move
              differently and think bigger.
            </p>
            <Link href="/about" className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]">
              Read Our Story →
            </Link>
          </Reveal>
          <Reveal className="relative h-[50vh] md:h-[70vh]">
            <Image src="/images/philosophy.jpg" alt="Our philosophy" fill className="object-cover" />
          </Reveal>
        </div>
      </section>

      {/* ---------------- THE CAMPAIGN ---------------- */}
      <section className="border-b border-line px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <div className="eyebrow">The Campaign</div>
                <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
                  Explore The Visuals
                </h2>
              </div>
              <Link href="/shop" className="hidden text-xs font-bold uppercase tracking-[0.12em] md:flex md:items-center md:gap-2">
                Shop The Collection →
              </Link>
            </div>
          </Reveal>

          <div className="scroll-row -mx-5 flex gap-3 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0">
            {[0, 1, 2, 3].map((i) => (
              <Reveal key={i} className="relative aspect-[3/4] w-[40vw] shrink-0 overflow-hidden bg-ink-3 md:w-auto">
                <Image
                 src={campaignImages[i]}
                  alt={`Campaign visual ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </Reveal>
            ))}
          </div>

          <Link href="/shop" className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] md:hidden">
            Shop The Collection →
          </Link>
        </div>
      </section>

      {/* ---------------- NEWSLETTER ---------------- */}
      <section className="px-5 py-14 md:px-8 md:py-20">
        <Reveal className="mx-auto max-w-3xl">
          <div className="eyebrow">Newsletter</div>
          <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight md:text-4xl">Stay Updated</h2>

          <div className="mt-6 max-w-md">
            <NewsletterInlineForm layout="row" />
          </div>
          <p className="mt-3 text-xs text-muted">New drops. Exclusive access. No spam.</p>
        </Reveal>
      </section>
    </>
  );
}
