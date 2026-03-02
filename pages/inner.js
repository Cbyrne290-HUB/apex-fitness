/* ============================================
   APEX FITNESS — INNER PAGES JAVASCRIPT
   ============================================ */

// --- NAV SCROLL EFFECT ---
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// --- MOBILE BURGER MENU ---
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('active');

  const spans = burger.querySelectorAll('span');
  if (burger.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('active');
    const spans = burger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// --- SCROLL REVEAL ---
const revealElements = document.querySelectorAll(
  '.story__inner, .story__stat-card, .facility__card, .coach__card, .contact-method__card, .contact-form__inner, .section__header'
);

revealElements.forEach(el => {
  el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// --- PAGE HERO ANIMATION ---
window.addEventListener('load', () => {
  const label = document.querySelector('.page-hero .section__label');
  const title = document.querySelector('.page-hero__title');
  const sub = document.querySelector('.page-hero__sub');

  const elements = [label, title, sub];
  const delays = [100, 250, 450];

  elements.forEach((el, i) => {
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delays[i]);
    }
  });
});

// --- CURSOR GLOW ---
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 92, 0, 0.06) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
});

// --- CONTACT FORM ---
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('formSuccess');

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.style.display = 'none';
      if (successMsg) {
        successMsg.classList.add('visible');
      }
      contactForm.reset();
    }, 1200);
  });
}

// --- COUNTER ANIMATION ---
const counters = document.querySelectorAll('.story__stat-card strong');

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const num = parseFloat(text.replace(/[^0-9.]/g, ''));
      const suffix = text.replace(/[0-9.]/g, '');

      if (isNaN(num)) return;

      let start = 0;
      const duration = 1500;
      const increment = num / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= num) {
          el.textContent = text;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(start) + suffix;
        }
      }, 16);

      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => countObserver.observe(counter));