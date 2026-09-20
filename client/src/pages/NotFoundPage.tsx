import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <Container>
      <section className="flex min-h-[60vh] flex-col items-start justify-center py-16 sm:py-24">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-prose text-base text-ink-500">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <nav aria-label="Recovery" className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="primary">
            <Link to="/">Back to home</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/portfolio">View portfolio</Link>
          </Button>
        </nav>
      </section>
    </Container>
  );
}
