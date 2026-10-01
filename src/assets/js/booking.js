/**
 * Booking Enquiry Flow — Hotel Right Now
 * Multi-step form with client-side validation.
 * No backend submission — structured for future integration.
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('booking-form');
  if (!form) return;

  /* ─── Element references ─── */
  const stepEls = {
    1: document.getElementById('step-1'),
    2: document.getElementById('step-2'),
    3: document.getElementById('step-3'),
    success: document.getElementById('step-success')
  };

  const progressEls = {
    1: document.getElementById('progress-1'),
    2: document.getElementById('progress-2'),
    3: document.getElementById('progress-3')
  };

  const field = (id) => document.getElementById(id);

  let currentStep = 1;

  /* ─── Date constraints ─── */
  const today = new Date().toISOString().split('T')[0];
  field('checkin').setAttribute('min', today);

  field('checkin').addEventListener('change', () => {
    const ci = field('checkin').value;
    if (ci) {
      field('checkout').setAttribute('min', ci);
      if (field('checkout').value && field('checkout').value <= ci) {
        field('checkout').value = '';
      }
    }
  });

  /* ─── Error helpers ─── */
  function setError(id, message) {
    const input = field(id);
    const errEl = field('error-' + id);
    if (input) input.classList.add('has-error');
    if (errEl) errEl.textContent = message;
  }

  function clearError(id) {
    const input = field(id);
    const errEl = field('error-' + id);
    if (input) input.classList.remove('has-error');
    if (errEl) errEl.textContent = '';
  }

  function clearStepErrors(stepNum) {
    const step = stepEls[stepNum];
    if (!step) return;
    step.querySelectorAll('.form-error').forEach(e => e.textContent = '');
    step.querySelectorAll('.form-input').forEach(i => i.classList.remove('has-error'));
  }

  /* ─── Validation ─── */
  function validateStep(stepNum) {
    clearStepErrors(stepNum);
    let valid = true;

    if (stepNum === 1) {
      if (!field('checkin').value) {
        setError('checkin', 'Check-in date is required.');
        valid = false;
      }
      if (!field('checkout').value) {
        setError('checkout', 'Check-out date is required.');
        valid = false;
      } else if (field('checkin').value && field('checkout').value <= field('checkin').value) {
        setError('checkout', 'Check-out must be after check-in.');
        valid = false;
      }
      const guests = parseInt(field('guests').value, 10);
      if (!guests || guests < 1) {
        setError('guests', 'At least 1 guest is required.');
        valid = false;
      }
    }

    if (stepNum === 2) {
      if (!field('fullname').value.trim()) {
        setError('fullname', 'Full name is required.');
        valid = false;
      }
      const email = field('email').value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('email', 'Please enter a valid email address.');
        valid = false;
      }
      if (!field('phone').value.trim()) {
        setError('phone', 'Phone number is required.');
        valid = false;
      }
    }

    return valid;
  }

  /* ─── Step navigation ─── */
  function showStep(n) {
    // Hide all step panels
    Object.values(stepEls).forEach(el => {
      if (el) { el.hidden = true; el.classList.remove('is-active'); }
    });

    // Show target
    const target = (n === 'success') ? stepEls.success : stepEls[n];
    if (target) {
      target.hidden = false;
      // Small delay for the CSS transition to trigger
      requestAnimationFrame(() => target.classList.add('is-active'));
    }

    // Update progress indicators
    [1, 2, 3].forEach(i => {
      if (progressEls[i]) {
        progressEls[i].classList.toggle('is-active', typeof n === 'number' && i <= n);
      }
    });

    currentStep = n;

    // Populate review when reaching step 3
    if (n === 3) populateReview();
  }

  function populateReview() {
    field('rev-checkin').textContent = field('checkin').value;
    field('rev-checkout').textContent = field('checkout').value;
    field('rev-guests').textContent = field('guests').value;
    field('rev-room').textContent = field('room').value;
    field('rev-name').textContent = field('fullname').value;
    field('rev-email').textContent = field('email').value;
    field('rev-phone').textContent = field('phone').value;
    const req = field('requests').value.trim();
    field('rev-requests').textContent = req || '—';
  }

  /* ─── Button event listeners ─── */
  document.querySelectorAll('.btn-next').forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        showStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll('.btn-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      showStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  /* ─── Form submission ─── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // MVP: no backend — show confirmation
    showStep('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── WhatsApp integration ─── */
  const waBtn = field('btn-whatsapp');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const num = waBtn.dataset.wa;
      const lines = [
        `Booking enquiry for ${field('fullname').value}`,
        `Check-in: ${field('checkin').value}`,
        `Check-out: ${field('checkout').value}`,
        `Guests: ${field('guests').value}`,
        `Room: ${field('room').value}`,
        `Special requests: ${field('requests').value.trim() || 'None'}`
      ];
      const url = `https://wa.me/${num}?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(url, '_blank', 'noopener');
    });
  }

  /* ─── Clear errors on input ─── */
  ['checkin', 'checkout', 'guests', 'fullname', 'email', 'phone', 'requests'].forEach(id => {
    const el = field(id);
    if (el) el.addEventListener('input', () => clearError(id));
  });

  /* ─── Reduced motion ─── */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.booking-step').forEach(s => {
      s.style.transition = 'none';
    });
  }

  /* ─── Initialise ─── */
  showStep(1);
});
