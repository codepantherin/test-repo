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

  // Hero entrance animation (only when hero elements exist)
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to('.hero-title', { opacity: 1, y: 0, duration: 1 })
      .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to('.hero-description', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to('.hero .btn', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to('.scroll-indicator', { opacity: 1, duration: 0.5 }, '-=0.3');
  }

  // Section header reveal animations
  gsap.utils.toArray('.section-header').forEach((header) => {
    const title = header.querySelector('.section-title');
    const number = header.querySelector('.section-number');
    if (title) {
      gsap.from(title, {
        scrollTrigger: { trigger: header, start: 'top 85%' },
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
    if (number) {
      gsap.from(number, {
        scrollTrigger: { trigger: header, start: 'top 85%' },
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  });

  // About text animation
  if (document.querySelector('.about-text p')) {
    gsap.from('.about-text p', {
      scrollTrigger: { trigger: '#about, .about-section', start: 'top 70%' },
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
    });
  }

  // About image animation
  if (document.querySelector('.about-image')) {
    gsap.from('.about-image', {
      scrollTrigger: { trigger: '#about, .about-section', start: 'top 70%' },
      opacity: 0,
      x: 50,
      duration: 1,
      ease: 'power3.out',
    });
  }

  // Portfolio items animation
  if (document.querySelector('.portfolio-item')) {
    gsap.from('.portfolio-item', {
      scrollTrigger: { trigger: '#portfolio, .portfolio-section', start: 'top 75%' },
      opacity: 0,
      y: 40,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
    });
  }

  // Services cards animation
  if (document.querySelector('.service-card')) {
    gsap.from('.service-card', {
      scrollTrigger: { trigger: '#services, .services-section', start: 'top 75%' },
      opacity: 0,
      y: 40,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
    });
  }

  // Contact form animation
  if (document.querySelector('.contact-form')) {
    gsap.from('.contact-form', {
      scrollTrigger: { trigger: '#contact, .contact-section', start: 'top 75%' },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    });
  }

  // Social links animation
  if (document.querySelector('.social-links a')) {
    gsap.from('.social-links a', {
      scrollTrigger: { trigger: '#contact, .contact-section', start: 'top 60%' },
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
    });
  }

  // Floating shapes animation
  if (document.querySelector('.hero-shape')) {
    gsap.utils.toArray('.hero-shape').forEach((shape, i) => {
      gsap.to(shape, {
        y: i % 2 === 0 ? -20 : 20,
        x: i % 2 === 0 ? 15 : -15,
        rotation: 45,
        duration: 4 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    // Parallax effect on hero shapes on scroll
    gsap.to('.hero-shape', {
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: -80,
      ease: 'none',
    });
  }
});

// Smooth scroll for in-page anchor links (skip cross-page/hash-placeholder links)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  const href = anchor.getAttribute('href');
  if (!href || href === '#') return;
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Header background on scroll
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// Form submission handler (placeholder)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! (This is a placeholder)');
  });
}
