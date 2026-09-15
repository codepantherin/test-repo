/**
 * Scroll-spy navigation + reveal-on-scroll animations.
 * Uses IntersectionObserver exclusively — no scroll event listeners.
 */

export function initScroll() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  initScrollSpy();

  if (!prefersReducedMotion) {
    initReveal();
  }
}

/**
 * Highlights the nav link whose target section is currently in view.
 * Observes each <section id> in <main> and toggles active state on
 * matching anchor links across both desktop and mobile navs.
 */
function initScrollSpy() {
  const sections = [...document.querySelectorAll("main section[id]")];
  if (sections.length === 0) return;

  const links = [...document.querySelectorAll('a[href^="#"]')];
  if (links.length === 0) return;

  const setActive = (id) => {
    const hash = `#${id}`;
    for (const link of links) {
      const isActive = link.hash === hash;
      link.classList.toggle("text-ink", isActive);
      link.classList.toggle("text-accent", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      // Choose the entry closest to the viewport's vertical center.
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) setActive(visible.target.id);
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
  );

  sections.forEach((section) => observer.observe(section));
}

/**
 * Reveals cards and section titles with the `animate-fadeUp` utility as
 * they scroll into view. Elements are unobserved after first reveal.
 * Falls back to a static (visible) state if IntersectionObserver is
 * unavailable so content is never hidden.
 */
function initReveal() {
  const targets = document.querySelectorAll(".card, .section-title");
  if (targets.length === 0) return;

  if (typeof IntersectionObserver === "undefined") {
    targets.forEach((el) => {
      el.style.opacity = "1";
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("animate-fadeUp");
        entry.target.style.opacity = "1";
        obs.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  targets.forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });
}
