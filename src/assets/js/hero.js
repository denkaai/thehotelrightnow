document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.hero-slide'));
  const dots = Array.from(slider.querySelectorAll('.hero-dot'));
  const prevBtn = slider.querySelector('.hero-prev');
  const nextBtn = slider.querySelector('.hero-next');

  if (slides.length <= 1) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 8000;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resetKenBurns(slide) {
    const imgs = slide.querySelectorAll('img');
    imgs.forEach(img => {
      // Force animation restart by briefly clearing the animation name
      img.style.animationName = 'none';
      // Reflow to flush the style change
      void img.offsetHeight;
      img.style.animationName = '';
    });
  }

  function showSlide(index) {
    slides[currentIndex].classList.remove('is-active');
    if (dots[currentIndex]) {
      dots[currentIndex].classList.remove('is-active');
      dots[currentIndex].setAttribute('aria-selected', 'false');
    }

    currentIndex = (index + slides.length) % slides.length;

    resetKenBurns(slides[currentIndex]);
    slides[currentIndex].classList.add('is-active');
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add('is-active');
      dots[currentIndex].setAttribute('aria-selected', 'true');
    }
  }


  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoplay() {
    if (prefersReducedMotion) return;
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAutoplay();
    });
  });

  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoplay);
    heroSection.addEventListener('mouseleave', startAutoplay);
    heroSection.addEventListener('focusin', stopAutoplay);
    heroSection.addEventListener('focusout', startAutoplay);
  }

  // Keyboard navigation for dots
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      startAutoplay();
    }
  });

  // Start initial autoplay
  startAutoplay();
});
