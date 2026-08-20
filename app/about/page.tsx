import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

const VALUES = [
  { title: 'Authentic', body: 'We keep it real in everything we do. No gimmicks.' },
  { title: 'Quality', body: 'Premium materials. Expert craftsmanship. No compromises.' },
  { title: 'Confidence', body: 'For the bold. For the fearless. For the ones who lead.' },
  { title: 'Individuality', body: 'Your style. Your story. Your way.' },
];

const PROCESS = [
  { n: '01', title: 'Idea', body: 'It all starts with a thought. A need. A vision.' },
  { n: '02', title: 'Design', body: 'We design with purpose. Every detail matters.' },
  { n: '03', title: 'Craft', body: 'We source the best. We craft with precision.' },
  { n: '04', title: 'Collection', body: 'We bring it to life. For those who get it.' },
];

export default function AboutPage() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative flex h-[60vh] min-h-[440px] items-end overflow-hidden border-b border-line md:h-[70vh]">
        {/* Subject sits on the right side of the frame. On narrow mobile boxes,
            object-cover was centering the crop and losing him — anchoring right
            keeps him (and the 2KRAZZY logo on his shirt) in frame. Desktop has
            enough width to just center it. */}
        <Image
          src="/images/about-campaign.jpeg"
          alt="2KRAZZY"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
        <div className="relative z-10 px-5 pb-10 md:px-8 md:pb-14">
          <div className="eyebrow">About</div>
          <h1 className="mt-2 text-4xl font-extrabold uppercase leading-tight tracking-tight md:text-6xl">
            Too Crazy
            <br />
            To Fold.
          </h1>
          <p className="mt-3 text-sm text-muted md:text-base">Built Different. Not For Everyone.</p>
        </div>
      </section>

      {/* ---------------- 01 OUR STORY ---------------- */}
      <section className="border-b border-line px-5 py-14 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <Reveal>
            <div className="eyebrow">01 · Our Story</div>
            <h2 className="mt-2 text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-4xl">
              Born In The Streets
              <br />
              Of Lagos.
            </h2>
          </Reveal>
          <Reveal className="space-y-4 text-sm leading-relaxed text-muted md:text-base">
            <p>
              2KRAZZY isn&rsquo;t just clothes — it&rsquo;s a lifestyle. Born from a simple mindset: do things your
              own way, or don&rsquo;t do it at all.
            </p>
            <p>
              Inspired by starting from nothing, the brand represents a generation that thinks differently, moves
              fearlessly, and refuses to be average. We create pieces for the ones who refuse to blend in — the
              ones who move different, think different, and live different.
            </p>
            <p>
              This isn&rsquo;t just clothing. It&rsquo;s a statement. A reminder to stay solid in a world full of
              noise. We rep Lagos loud and Lagos proud — certified fire, certified too crazy for ordinary.
            </p>
            <p className="pt-2 text-base font-bold uppercase tracking-tight text-paper md:text-lg">
              Too Crazy To Fold. <span className="text-red">That&rsquo;s the code.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- 02 OUR PHILOSOPHY ---------------- */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl md:grid-cols-2">
          <Reveal className="relative order-2 h-[50vh] md:order-1 md:h-[70vh]">
            {/* Subject (back of head/cap) sits left-of-center in the source photo.
                object-left keeps him fully visible on the tall mobile box instead
                of centering into empty wall texture. */}
            <Image
              src="/images/about-campaign-2.jpeg"
              alt="2KRAZZY cap and matching set"
              fill
              className="object-contain object-left md:object-center"
            />
          </Reveal>
          <Reveal className="order-1 flex flex-col justify-center px-5 py-14 md:order-2 md:px-8 md:py-0">
            <div className="eyebrow">02 · Our Philosophy</div>
            <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight md:text-4xl">Built Different.</h2>
            <p className="mt-4 max-w-md text-base font-semibold leading-relaxed">
              We believe in quality over quantity. Every piece is designed with intention, created with precision,
              and made to last.
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              We don&rsquo;t chase trends. We set standards. Built Different. Not For Everyone.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- 03 OUR VALUES ---------------- */}
      <section className="border-b border-line px-5 py-14 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="eyebrow">03 · Our Values</div>
            <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight md:text-4xl">What We Stand On</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {VALUES.map((v) => (
              <Reveal key={v.title}>
                <div className="border-t-2 border-red pt-4">
                  <h3 className="text-sm font-bold uppercase tracking-[0.06em]">{v.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 04 THE PROCESS ---------------- */}
      <section className="border-b border-line px-5 py-14 md:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="eyebrow">04 · The Process</div>
            <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
              Quality Is Our Standard.
            </h2>
          </Reveal>
          <div className="mt-10 divide-y divide-line border-t border-line">
            {PROCESS.map((p) => (
              <Reveal key={p.n}>
                <div className="flex items-baseline gap-6 py-5">
                  <span className="text-sm font-bold text-red">{p.n}</span>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-[0.06em]">{p.title}</h4>
                    <p className="mt-1 text-sm text-muted">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 05 COLLECTION 001 CTA ---------------- */}
      <section className="relative flex aspect-[1584/672] items-end overflow-hidden border-b border border-line md:h-[70vh] md:aspect-auto">
        {/* This image is pure typography/logo on a plain textured background —
            no subject to protect. It's also dimmed by bg-ink/60 below and sits
            behind your own live heading, so exact crop position matters far
            less here. Nudged slightly right so the logo mark stays visible. */}
        <Image
          src="/images/about-campaign_3.jpeg"
          alt="Collection 001"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/60" />
        <Reveal className="relative z-10 px-5">
          <div className="eyebrow">05 · Collection 001</div>
          <h2 className="mt-2 text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-5xl">
            The First Drop.
            <br />
            The Foundation.
          </h2>
          <p className="mt-3 text-sm text-muted md:text-base">Every piece is part of something bigger.</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 border border-red px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-red transition-colors hover:bg-red hover:text-paper"
          >
            Explore Collection →
          </Link>
        </Reveal>
      </section>

      {/* ---------------- 06 FOR THE FEW / CLOSING CTA ---------------- */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <Reveal>
            <div className="eyebrow">06 · For The Few</div>
            <h2 className="mt-2 text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-4xl">
              We Don&rsquo;t Make Clothes
              <br />
              For Everyone.
            </h2>
            <p className="mt-3 text-sm text-muted">And that&rsquo;s the point.</p>
          </Reveal>
          <Reveal className="border-t border-line pt-8 md:border-t-0 md:border-l md:pl-16 md:pt-0">
            <h2 className="text-2xl font-extrabold uppercase leading-tight tracking-tight md:text-3xl">
              Not For Everyone.
              <br />
              <span className="text-red">And That&rsquo;s The Point.</span>
            </h2>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 bg-red px-6 py-3 text-xs font-bold uppercase tracking-[0.12em]"
            >
              Explore The Collection →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
