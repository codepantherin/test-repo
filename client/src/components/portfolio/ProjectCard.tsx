import { ArrowUpRight } from 'lucide-react';

import type { Project } from '../../features/portfolio/projects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-ink-900/5 bg-white shadow-sm transition hover:shadow-md">
      <img
        src={project.imageUrl}
        alt=""
        loading="lazy"
        className="aspect-[3/2] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-semibold tracking-tight text-ink-900">
          {project.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-ink-700">
          {project.description}
        </p>
        <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-lg bg-ink-900/5 px-2.5 py-1 text-xs font-medium text-ink-700"
            >
              {tech}
            </li>
          ))}
        </ul>
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent transition hover:text-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            View project
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
}
