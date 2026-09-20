import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NAV_ITEMS, SITE_NAME } from '../../lib/constants';
import { Container } from '../ui/Container';

const linkBase =
  'text-sm font-medium text-ink-700 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg px-2 py-1';

const linkActive = 'text-accent';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-surface/80 backdrop-blur">
      <Container>
        <nav aria-label="Primary" className="flex h-16 items-center justify-between">
          <NavLink
            to="/"
            className="text-lg font-semibold tracking-tight text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            {SITE_NAME}
          </NavLink>

          <ul className="hidden items-center gap-1 sm:flex">
            {NAV_ITEMS.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? linkActive : ''}`
                  }
                >
                  {({ isActive }) => (
                    <span aria-current={isActive ? 'page' : undefined}>{label}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-ink-700 transition-colors hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </nav>

        {isOpen && (
          <ul id="mobile-nav" className="flex flex-col gap-1 pb-4 sm:hidden">
            {NAV_ITEMS.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                      isActive ? 'text-accent' : 'text-ink-700'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <span aria-current={isActive ? 'page' : undefined}>{label}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </header>
  );
}
