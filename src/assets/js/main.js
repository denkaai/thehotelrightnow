document.addEventListener('DOMContentLoaded', () => {
  // Sticky header observer
  const header = document.getElementById('site-header');
  const anchor = document.getElementById('top-anchor');
  
  if (header && anchor) {
    const observer = new IntersectionObserver(
      ([e]) => e.intersectionRatio < 1 ? header.classList.add('is-scrolled') : header.classList.remove('is-scrolled'),
      { threshold: [1] }
    );
    observer.observe(anchor);
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      
      if (!isExpanded) {
        mobileMenu.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
        menuToggle.focus();
      }
    });
  }
});
