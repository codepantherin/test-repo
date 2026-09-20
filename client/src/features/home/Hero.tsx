import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Container } from '../../components/ui/Container';

const STATS = [
  { value: '5+', label: 'Years designing' },
  { value: '40+', label: 'Projects shipped' },
  { value: '12', label: 'Brands served' },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-ink-100 blur-3xl"
      />

      <Container className="relative grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:items-center lg:py-32">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Portfolio
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
            Arsh Dhiman
          </h1>
          <p className="mt-4 text-lg font-medium text-ink-700 sm:text-xl">
            Graphic designer crafting visual stories that resonate.
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted">
            I turn ideas into bold, minimal, impactful designs — spanning branding,
            digital product, and print. Five years of shipping work for startups,
            agencies, and established brands.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link to="/portfolio">
                View work
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link to="/contact">Get in touch</Link>
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-ink-100 pt-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="text-sm text-muted">{stat.label}</dt>
                <dd className="mt-1 text-2xl font-semibold text-ink-900 sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative overflow-hidden rounded-2xl border border-ink-100 bg-surface shadow-sm">
            <img
              src="https://picsum.photos/seed/arsh-hero/800/900"
              alt="Portrait of Arsh Dhiman"
              width={800}
              height={900}
              className="aspect-[4/5] w-full object-cover grayscale transition duration-500 ease-out hover:grayscale-0"
              loading="eager"
              decoding="async"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-6 -left-6 -z-10 h-40 w-40 rounded-2xl border-2 border-accent/40"
          />
        </div>
      </Container>
    </section>
  );
}
