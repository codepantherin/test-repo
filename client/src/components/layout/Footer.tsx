import { Container } from '../ui/Container';
import { SOCIAL_LINKS, SITE_NAME } from '../../lib/constants';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-100 bg-surface">
      <Container>
        <div className="flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted">
            &copy; {year} {SITE_NAME}. All rights reserved.
          </p>

          <nav aria-label="Social">
            <ul className="flex items-center gap-6">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-ink-700 transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
