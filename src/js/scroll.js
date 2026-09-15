/**
 * Scroll-spy navigation + reveal-on-scroll animations.
 * Uses IntersectionObserver exclusively — no scroll event listeners.
 */

export function initScroll() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  initScrollSpy();

  if (prefersReducedMotion) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  initReveal();
}

function initScrollSpy() {
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll('a[href^="#"]')];
  if (!sections.length || !links.length) return;

  const setActive = (id) => {
    const hash = `#${id}`;
    for (const link of links) {
      const isActive = link.hash === hash;
      link.classList.toggle("text-cream", isActive);
      link.classList.toggle("text-accent", isActive);
      if (isActive) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
  );

  sections.forEach((s) => observer.observe(s));
}

function initReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (typeof IntersectionObserver === "undefined") {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      let i = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        el.style.animationDelay = `${Math.min(i++ * 70, 420)}ms`;
        el.classList.add("is-visible");
        obs.unobserve(el);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

export function initCardGlow() {
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest && e.target.closest(".card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, { passive: true });
}
