document.addEventListener('DOMContentLoaded', () => {

  /* ─── Sticky header via IntersectionObserver ─── */
  const header = document.getElementById('site-header');
  const anchor = document.getElementById('top-anchor');

  if (header && anchor) {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        header.classList.toggle('is-scrolled', !entry.isIntersecting);
      },
      { threshold: 0 }
    );
    headerObserver.observe(anchor);
  }

  /* ─── Mobile menu ─── */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuToggle || !mobileMenu) return;

  // All focusable elements inside the nav
  function getFocusable() {
    return Array.from(
      mobileMenu.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
  }

  function openMenu() {
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('is-open');
    document.body.classList.add('menu-open');
    // Move focus to first focusable element inside the nav
    const focusable = getFocusable();
    if (focusable.length) focusable[0].focus();
  }

  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    menuToggle.focus();
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  /* Focus trap: includes menuToggle and elements inside mobileMenu */
  document.addEventListener('keydown', (e) => {
    if (menuToggle.getAttribute('aria-expanded') !== 'true') return;
    
    /* Escape closes menu */
    if (e.key === 'Escape') {
      closeMenu();
      return;
    }

    if (e.key !== 'Tab') return;

    const navFocusable = getFocusable();
    if (!navFocusable.length) return;

    const first = navFocusable[0];
    const last = navFocusable[navFocusable.length - 1];

    if (e.shiftKey) {
      // Shift+Tab from menuToggle -> wrap to last element
      if (document.activeElement === menuToggle) {
        e.preventDefault();
        last.focus();
      } else if (document.activeElement === first) {
        // Shift+Tab from first element -> move to menuToggle
        e.preventDefault();
        menuToggle.focus();
      }
    } else {
      // Tab from last element -> wrap to menuToggle
      if (document.activeElement === last) {
        e.preventDefault();
        menuToggle.focus();
      } else if (document.activeElement === menuToggle) {
        // Tab from menuToggle -> move to first element
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* Close menu on nav link click */
  mobileMenu.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', () => {
      if (menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      }
    });
  });

  /* Close menu if viewport widens past breakpoint */
  const mql = window.matchMedia('(min-width: 768px)');
  function handleBreakpoint(e) {
    if (e.matches && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  }
  // Use addEventListener for modern browsers, addListener for older ones
  if (mql.addEventListener) {
    mql.addEventListener('change', handleBreakpoint);
  } else {
    mql.addListener(handleBreakpoint);
  }

});
