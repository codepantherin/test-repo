const PROJECTS = [
  {
    title: "DevBoard",
    description: "Real-time collaborative task board with WebSocket sync and role-based access.",
    tech: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    demo: "https://devboard.example.com",
    repo: "https://github.com/harwinder/devboard",
  },
  {
    title: "ShopKit",
    description: "Headless e-commerce storefront with Stripe checkout and admin analytics.",
    tech: ["Next.js", "Stripe", "MongoDB"],
    demo: "https://shopkit.example.com",
    repo: "https://github.com/harwinder/shopkit",
  },
  {
    title: "PulseWatch",
    description: "Lightweight uptime monitor with alerting via email and webhook channels.",
    tech: ["Python", "FastAPI", "Redis", "Docker"],
    demo: "https://pulsewatch.example.com",
    repo: "https://github.com/harwinder/pulsewatch",
  },
];

const escape = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p) => `
    <article class="card flex flex-col">
      <h3 class="text-lg font-semibold mb-2">${escape(p.title)}</h3>
      <p class="text-sm text-ink/70 mb-4 flex-1">${escape(p.description)}</p>
      <ul class="flex flex-wrap gap-2 mb-5">
        ${p.tech.map((t) => `<li class="chip">${escape(t)}</li>`).join("")}
      </ul>
      <div class="flex gap-3 text-sm font-medium">
        <a href="${escape(p.demo)}" class="text-accent hover:underline" rel="noopener" target="_blank">Live Demo →</a>
        <a href="${escape(p.repo)}" class="text-ink/60 hover:text-ink" rel="noopener" target="_blank">Source</a>
      </div>
    </article>
  `).join("");
}
