/* ============================================
   RUSSIAN SPA CENTRE — MAIN JS
   Interactive features: nav, tabs, FAQ, scroll animations
============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ====== STICKY HEADER ====== */
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ====== MOBILE HAMBURGER NAV ====== */
  const hamburger = document.getElementById('hamburger-btn');
  const mainNav = document.getElementById('main-nav');

  hamburger.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close nav when clicking a link
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  /* ====== FAQ ACCORDION ====== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(f => {
        f.classList.remove('open');
        f.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ====== SCROLL REVEAL ====== */
  const revealElements = document.querySelectorAll(
    '.service-card, .why-card, .ther-card, .testimonial-card, .pricing-card, .gallery-item, .faq-item, .section-header, .about-text-col, .about-image-col, .partners-bar'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger animation for grid items
        const siblings = Array.from(entry.target.parentElement.children);
        const index = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ====== SCROLL TO TOP BUTTON ====== */
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ====== SMOOTH ANCHOR SCROLLING ====== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  /* ====== COUNTER ANIMATION ====== */
  const statNums = document.querySelectorAll('.stat-num');
  const counters = [
    { el: statNums[0], target: 350, suffix: '+' },
    { el: statNums[1], target: 24, suffix: '/7' },
    { el: statNums[2], target: 15, suffix: '+' },
    { el: statNums[3], target: 10, suffix: ' min' },
  ];

  let countersStarted = false;

  const heroObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      counters.forEach(counter => {
        if (!counter.el) return;
        let current = 0;
        const step = counter.target / 50;
        const interval = setInterval(() => {
          current = Math.min(current + step, counter.target);
          counter.el.textContent = Math.floor(current) + counter.suffix;
          if (current >= counter.target) clearInterval(interval);
        }, 30);
      });
    }
  }, { threshold: 0.5 });

  const heroStats = document.getElementById('hero-stats');
  if (heroStats) heroObserver.observe(heroStats);

  /* ====== ACTIVE NAV ON SCROLL ====== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href]');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}` || link.getAttribute('href') === `${id}.html`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ====== GALLERY HOVER GLOW ====== */
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.boxShadow = '0 8px 40px rgba(124,77,188,0.2)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.boxShadow = '';
    });
  });

  /* ====== SCROLL INDICATOR HIDE ====== */
  const scrollIndicator = document.getElementById('scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '1';
      }
    }, { passive: true });
  }

  /* ====== PARALLAX HERO ====== */
  const heroContent = document.querySelector('.hero-content');
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      if (heroContent) {
        heroContent.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      }
    }
  }, { passive: true });

  /* ====== GOLD CURSOR GLOW EFFECT ====== */
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed; width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(124,77,188,0.03) 0%, transparent 70%);
    pointer-events: none; z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
  `;
  document.body.appendChild(cursor);

  window.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }, { passive: true });

  console.log('%c✦ Russian Spa Centre Mahipalpur', 'color: #7C4DBC; font-size: 16px; font-weight: bold;');
  console.log('%cExperience luxury wellness · Open 24/7 · +91 8929979542', 'color: #6B5F8A; font-size: 12px;');
});
