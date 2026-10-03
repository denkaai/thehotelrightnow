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
     Disabled: Ken Burns CSS animation now owns the
     transform on .hero-slide img elements.
     The cinematic zoom/drift replaces parallax.
  ───────────────────────────────────────────── */
  function initHeroParallax() {
    // No-op — Ken Burns effect in pages.css handles cinematic motion
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
