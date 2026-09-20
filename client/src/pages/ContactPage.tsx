import { ContactForm } from '../features/contact/ContactForm';
import { Container } from '../components/ui/Container';
import { SOCIAL_LINKS } from '../lib/constants';

export function ContactPage() {
  return (
    <Container>
      <section className="py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,32rem)]">
          <header className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Contact
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
              Let’s work together
            </h1>
            <p className="max-w-prose text-base leading-relaxed text-ink-500">
              Have a project in mind or just want to say hello? Fill out the form and
              I’ll get back to you as soon as I can.
            </p>
            <nav aria-label="Social" className="pt-2">
              <ul className="flex flex-wrap gap-6">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-ink-500 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </header>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </Container>
  );
}

