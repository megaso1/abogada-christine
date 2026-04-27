/* script.js — Página web de abogada Christine
   ================================================================
   What this file does:
   1. Adds a shadow to the header when you scroll down
   2. Highlights the active nav link based on scroll position
   3. Opens/closes the mobile hamburger menu
   4. Adds a fade-in animation to sections as you scroll
   5. Automatically sets the current year in the footer
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {


  /* ==============================================================
     1. HEADER — Add "scrolled" class after user scrolls 40px
        This triggers the frosted-glass background in CSS.
     ============================================================== */

  const header = document.getElementById('header');

  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });


  /* ==============================================================
     2. ACTIVE NAV LINK — Highlights the current section link
        Updates as you scroll through each section.
     ============================================================== */

  const navLinks    = document.querySelectorAll('.nav-link');
  const sections    = document.querySelectorAll('section[id]');

  function highlightNavLink() {
    let currentSection = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink, { passive: true });


  /* ==============================================================
     3. MOBILE HAMBURGER MENU
     ============================================================== */

  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    header.classList.add('menu-open');
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    header.classList.remove('menu-open');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });


  /* ==============================================================
     4. SCROLL REVEAL ANIMATIONS
        Adds the "visible" class to elements with class "reveal"
        when they enter the viewport.

        To make any element animate in, add class="reveal" to it
        in index.html. The CSS in style.css handles the animation.
     ============================================================== */

  const revealTargets = document.querySelectorAll(
    '.about-bio, .about-credentials, .service-card, ' +
    '.contact-intro, .contact-details, .credential-block'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealTargets.forEach(el => revealObserver.observe(el));


  /* ==============================================================
     5. FOOTER YEAR — Automatically keeps the copyright year current
        The <span id="year"> in index.html is updated here.
     ============================================================== */

  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }


  /* ==============================================================
     6. SMOOTH SCROLL — for older browsers that don't support
        CSS scroll-behavior: smooth natively.
        (Modern browsers handle this via CSS, so this is a fallback.)
     ============================================================== */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerOffset = header ? header.offsetHeight : 0;
      const elementTop   = target.getBoundingClientRect().top + window.scrollY;
      const offsetTop    = elementTop - headerOffset;

      window.scrollTo({
        top:      offsetTop,
        behavior: 'smooth'
      });
    });
  });


});