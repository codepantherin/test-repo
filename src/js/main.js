import { initNavigation } from "./navigation.js";
import { initScroll } from "./scroll.js";
import { renderProjects } from "./projects.js";
import { initForm } from "./form.js";

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

function init() {
  try {
    initNavigation();
    initScroll();
    renderProjects();
    initForm();
  } catch (err) {
    console.error("[portfolio] initialization failed:", err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
