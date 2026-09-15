const PROJECTS = [
  {
    title: "DevBoard",
    year: "2025",
    description: "Real-time collaborative task board with WebSocket sync and role-based access.",
    tech: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    demo: "https://devboard.example.com",
    repo: "https://github.com/harwinder/devboard",
    image: "https://picsum.photos/seed/devboard/800/600",
    accent: "from-accent/45",
  },
  {
    title: "ShopKit",
    year: "2024",
    description: "Headless e-commerce storefront with Stripe checkout and admin analytics.",
    tech: ["Next.js", "Stripe", "MongoDB"],
    demo: "https://shopkit.example.com",
    repo: "https://github.com/harwinder/shopkit",
    image: "https://picsum.photos/seed/shopkit/800/600",
    accent: "from-glow/40",
  },
  {
    title: "PulseWatch",
    year: "2024",
    description: "Lightweight uptime monitor with alerting via email and webhook channels.",
    tech: ["Python", "FastAPI", "Redis", "Docker"],
    demo: "https://pulsewatch.example.com",
    repo: "https://github.com/harwinder/pulsewatch",
    image: "https://picsum.photos/seed/pulsewatch/800/600",
    accent: "from-glow-alt/40",
  },
];

const escape = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p) => `
    <article class="card reveal group flex flex-col overflow-hidden !p-0">
      <div class="relative aspect-[4/3] overflow-hidden">
        <img src="${escape(p.image)}" alt="Preview of ${escape(p.title)}"
             loading="lazy" decoding="async" width="800" height="600"
             class="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110" />
        <div class="absolute inset-0 bg-gradient-to-t ${p.accent} via-ink/40 to-transparent"></div>
        <span class="absolute left-5 top-5 rounded-full bg-ink/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cream/70 backdrop-blur">${escape(p.year)}</span>
      </div>
      <div class="flex flex-1 flex-col p-7 pt-6">
        <h3 class="text-xl font-semibold">${escape(p.title)}</h3>
        <p class="mb-5 mt-2 flex-1 text-sm text-cream/60">${escape(p.description)}</p>
        <ul class="mb-6 flex flex-wrap gap-2">
          ${p.tech.map((t) => `<li class="chip">${escape(t)}</li>`).join("")}
        </ul>
        <div class="flex items-center gap-5 text-sm font-medium">
          <a href="${escape(p.demo)}" class="text-glow transition-all duration-300 hover:gap-2 inline-flex items-center gap-1" rel="noopener" target="_blank">Live demo →</a>
          <a href="${escape(p.repo)}" class="text-cream/50 transition-colors hover:text-cream" rel="noopener" target="_blank">Source</a>
        </div>
      </div>
    </article>
  `).join("");
}
