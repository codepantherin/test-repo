import { Container } from '../../components/ui/Container';
import { ProjectCard } from '../../components/portfolio/ProjectCard';
import { projects } from './projects';

export function PortfolioPage() {
  return (
    <Container>
      <section className="py-16 sm:py-24">
        <header className="mb-12 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
            Selected work
          </h1>
          <p className="mt-4 text-lg text-ink-500">
            A collection of branding, digital, and print projects. Each piece is built around a
            clear idea and executed with intention.
          </p>
        </header>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
