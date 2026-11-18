document.addEventListener('DOMContentLoaded', function () {

  var header = document.querySelector('.site-header');

  /* Mobile nav toggle */
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');
  function setNav(open) {
    mainNav.classList.toggle('is-open', open);
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', open);
    document.body.classList.toggle('nav-open', open);
  }
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      setNav(!mainNav.classList.contains('is-open'));
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setNav(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNav(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 880) setNav(false);
    });
  }

  /* Header border + active nav link on scroll */
  var sections = document.querySelectorAll('section[id], header[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
    var scrollPos = window.scrollY + window.innerHeight * 0.3;
    var current = sections[0];
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) current = sec;
    });
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 4) {
      current = sections[sections.length - 1];
    }
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current.id);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Scroll-to-top button */
  var scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      scrollTopBtn.classList.toggle('is-visible', window.scrollY > 600);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Contact form status message (after FormSubmit redirects back with ?sent=1) */
  var formStatus = document.getElementById('form-status');
  if (formStatus) {
    var params = new URLSearchParams(window.location.search);
    if (params.has('sent')) {
      formStatus.textContent = "Thanks — your message has been sent. We'll be in touch shortly.";
      formStatus.classList.add('success');
      formStatus.hidden = false;
    } else if (params.has('error')) {
      formStatus.textContent = "Something went wrong sending your message. Please check your details and try again, or email us directly.";
      formStatus.classList.add('error');
      formStatus.hidden = false;
    }
    if (params.has('sent') || params.has('error')) {
      params.delete('sent');
      params.delete('error');
      var query = params.toString();
      var newUrl = window.location.pathname + (query ? '?' + query : '') + window.location.hash;
      window.history.replaceState({}, '', newUrl);
    }
  }

});
