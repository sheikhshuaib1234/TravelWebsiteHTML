// ===================== TRAVELA — main.js =====================

document.addEventListener('DOMContentLoaded', function () {

  /* ---- mobile nav toggle ---- */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  /* ---- hero slider ---- */
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero-dots button');
  var current = 0;
  var sliderTimer;

  function showSlide(i) {
    slides.forEach(function (s, idx) { s.classList.toggle('active', idx === i); });
    dots.forEach(function (d, idx) { d.classList.toggle('active', idx === i); });
    current = i;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  if (slides.length) {
    showSlide(0);
    sliderTimer = setInterval(nextSlide, 5000);
    dots.forEach(function (d, idx) {
      d.addEventListener('click', function () {
        clearInterval(sliderTimer);
        showSlide(idx);
        sliderTimer = setInterval(nextSlide, 5000);
      });
    });
  }

  /* ---- destination filter chips (packages page) ---- */
  var chips = document.querySelectorAll('.chip[data-filter]');
  var pkgCards = document.querySelectorAll('[data-category]');
  if (chips.length && pkgCards.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        var filter = chip.getAttribute('data-filter');
        pkgCards.forEach(function (card) {
          var cat = card.getAttribute('data-category');
          card.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
        });
      });
    });
  }

  /* ---- gallery lightbox ---- */
  var galleryImgs = document.querySelectorAll('.gallery-grid img');
  var lightbox = document.querySelector('.lightbox');
  if (galleryImgs.length && lightbox) {
    var lightboxImg = lightbox.querySelector('img');
    galleryImgs.forEach(function (img) {
      img.addEventListener('click', function () {
        lightboxImg.src = img.src;
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  /* ---- FAQ accordion ---- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---- contact form (demo submit, no backend) ---- */
  var contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
        success.textContent = 'Thanks! Your enquiry has been received — our travel desk will reach out within 24 hours.';
      }
      contactForm.reset();
    });
  }

  /* ---- newsletter form ---- */
  var newsletterForm = document.querySelector('#newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = newsletterForm.querySelector('button');
      var original = btn.textContent;
      btn.textContent = 'Subscribed ✓';
      newsletterForm.reset();
      setTimeout(function () { btn.textContent = original; }, 2500);
    });
  }

  /* ---- back to top ---- */
  var totop = document.querySelector('.totop');
  if (totop) {
    window.addEventListener('scroll', function () {
      totop.classList.toggle('show', window.scrollY > 500);
    });
    totop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- planner search demo ---- */
  var plannerForm = document.querySelector('#planner-form');
  if (plannerForm) {
    plannerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      window.location.href = 'packages.html';
    });
  }

});
