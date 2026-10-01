/**
 * animations.js
 * Scroll-reveal (IntersectionObserver) + hero parallax
 * Classic, premium-hotel motion — intentional, never distracting.
 */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────────────────────────────────────────
     1. SCROLL REVEAL
     Observes .reveal and .reveal-scale elements.
     Triggers once when ≥15% of the element is visible.
  ───────────────────────────────────────────── */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
    if (!revealEls.length) return;

    if (prefersReduced) {
      // Skip animation, just make everything visible
      revealEls.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // fire once only
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -48px 0px',
      }
    );

    revealEls.forEach(el => observer.observe(el));
  }

  /* ─────────────────────────────────────────────
     2. HERO PARALLAX
     Very subtle: at full scroll-past the hero the image
     moves ~12% — almost imperceptible, cinematic.
     Disabled on mobile (touch scroll already feels alive)
     and when prefers-reduced-motion is set.
  ───────────────────────────────────────────── */
  function initHeroParallax() {
    if (prefersReduced) return;

    // Disable on touch devices / small screens
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile) return;

    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const imgs = heroSection.querySelectorAll('.hero-slide img');
    if (!imgs.length) return;

    let ticking = false;

    function applyParallax() {
      const heroH = heroSection.offsetHeight;
      const scrollY = window.scrollY;
      // Only apply while hero is in view
      if (scrollY > heroH) return;

      // Move image 5% of the scroll distance (cinematic & subtle)
      const offset = scrollY * 0.05;
      imgs.forEach(img => {
        img.style.transform = `translateY(${offset}px)`;
      });
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          applyParallax();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ─────────────────────────────────────────────
     3. ACTIVE NAV LINK
     Sets aria-current="page" on the nav link whose
     href matches the current pathname.
  ───────────────────────────────────────────── */
  function initActiveNav() {
    const links = document.querySelectorAll('.nav-list a[href]');
    const path = window.location.pathname;

    links.forEach(link => {
      const href = link.getAttribute('href');
      // Match exact or trailing-slash variant
      if (href === path || (href !== '/' && path.startsWith(href))) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ─────────────────────────────────────────────
     4. IMAGE HOVER ZOOM on section grids
     Adds class to parent for CSS-driven zoom,
     but done here so we can safely disable on reduced-motion.
  ───────────────────────────────────────────── */
  function initImageHover() {
    if (prefersReduced) return;
    // The zoom is handled purely in CSS via .section-media-item:hover img
    // Nothing extra needed — this is a placeholder for future enhancement.
  }

  /* ─── Init ─── */
  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initHeroParallax();
    initActiveNav();
    initImageHover();
  });

})();
