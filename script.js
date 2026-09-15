document.documentElement.classList.remove('no-js');

// Failsafe: if GSAP fails to load, show hero content
window.addEventListener('load', () => {
  if (typeof gsap === 'undefined') {
    document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero .btn, .scroll-indicator').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance animation
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.to('.hero-title', { opacity: 1, y: 0, duration: 1 })
    .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .to('.hero-description', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .to('.hero .btn', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .to('.scroll-indicator', { opacity: 1, duration: 0.5 }, '-=0.3');

  // Section reveal animations
  gsap.utils.toArray('.section').forEach((section) => {
    gsap.from(section.querySelector('.section-title'), {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  // About text animation
  gsap.from('.about-text p', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top 70%',
    },
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power3.out',
  });

  // About image animation
  gsap.from('.about-image', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top 70%',
    },
    opacity: 0,
    x: 50,
    duration: 1,
    ease: 'power3.out',
  });

  // Portfolio items animation
  gsap.from('.portfolio-item', {
    scrollTrigger: {
      trigger: '#portfolio',
      start: 'top 70%',
    },
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
  });

  // Services cards animation
  gsap.from('.service-card', {
    scrollTrigger: {
      trigger: '#services',
      start: 'top 70%',
    },
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
  });

  // Contact form animation
  gsap.from('.contact-form', {
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 70%',
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out',
  });

  // Social links animation
  gsap.from('.social-links a', {
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 60%',
    },
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power3.out',
  });
});

// Smooth scroll for navigation links (always run)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Form submission handler (placeholder)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! (This is a placeholder)');
  });
}