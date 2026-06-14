/* ── NAV SCROLL BEHAVIOUR ───────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── MOBILE MENU ────────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

/* ── LIGHTBOX ───────────────────────────────────────────── */
/* Each panel has its own set of images. Replace the src URLs below
   with your own image files (e.g. 'images/pool1.jpg') to customize. */
const lbGalleries = [
  // Panel 0: Main hero image (Infinity Pool) - multiple images
  [
    { type: 'image', src: 'hero1.jpeg', caption: 'Infinity Pool — Dillzan Resort' },
    { type: 'image', src: 'hero5.jpeg', caption: 'Pool Deck at Sunset' },
    { type: 'image', src: 'gallery18.jpeg', caption: 'Poolside Lounging' },
    { type: 'video', src: 'view.mp4', caption: 'Pool Walkthrough' },
  ],
  // Panel 1: Luxury Suites
  [
    { type: 'image', src: 'hero2.png', caption: 'Luxury Suite Interior' },
    { type: 'image', src: 'hero21.png', caption: 'Suite Bedroom' },
    { type: 'image', src: 'hero22.png', caption: 'Suite Balcony View' },
    { type: 'video', src: 'view2.mp4', caption: 'Suite Walkthrough' },
  ],
  // Panel 2: The Dillzan Palate (Dining)
  [
    { type: 'image', src: 'cuisine.jpg', caption: 'The Dillzan Palate — Fine Dining' },
    { type: 'image', src: 'food.jpg', caption: 'Coastal Flavours' },
    { type: 'image', src: 'food1.jpeg', caption: 'Fresh Catch' },
    { type: 'video', src: 'view3.mp4', caption: 'Dining Experience' },
  ],
];
let lbGroup = 0;
let lbCurrent = 0;
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbVideo  = document.getElementById('lbVideo');
const lbCap    = document.getElementById('lbCaption');
const lbCounter = document.getElementById('lbCounter');

function updateLbCounter() {
  const imgs = lbGalleries[lbGroup];
  const multi = imgs.length > 1;
  lbCounter.textContent = (lbCurrent + 1) + ' / ' + imgs.length;
  lbCounter.style.display = multi ? '' : 'none';
  document.getElementById('lbPrev').style.display = multi ? '' : 'none';
  document.getElementById('lbNext').style.display = multi ? '' : 'none';
}

function showLbItem() {
  const item = lbGalleries[lbGroup][lbCurrent];
  if (item.type === 'video') {
    lbImg.style.display = 'none';
    lbVideo.style.display = '';
    lbVideo.src = item.src;
    lbVideo.load();
  } else {
    lbVideo.pause();
    lbVideo.removeAttribute('src');
    lbVideo.style.display = 'none';
    lbImg.style.display = '';
    lbImg.src = item.src;
  }
  lbCap.textContent = item.caption;
  updateLbCounter();
}

function openLightbox(groupIndex) {
  lbGroup = groupIndex;
  lbCurrent = 0;
  showLbItem();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lbVideo.pause();
  document.body.style.overflow = '';
}
function lbNavigate(dir) {
  const imgs = lbGalleries[lbGroup];
  lbCurrent = (lbCurrent + dir + imgs.length) % imgs.length;
  showLbItem();
}
document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', () => lbNavigate(-1));
document.getElementById('lbNext').addEventListener('click', () => lbNavigate(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbNavigate(-1);
  if (e.key === 'ArrowRight') lbNavigate(1);
});

/* ── MENU MODAL ─────────────────────────────────────────── */
function openMenuModal() {
  document.getElementById('menuOverlay').classList.add('open');
  document.getElementById('menuModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenuModal() {
  document.getElementById('menuOverlay').classList.remove('open');
  document.getElementById('menuModal').classList.remove('open');
  document.body.style.overflow = '';
}
function switchMenuTab(btn) {
  document.querySelectorAll('.menu-modal-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.menu-modal-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(btn.dataset.panel).classList.add('active');
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenuModal();
});

/* ── CAROUSEL ───────────────────────────────────────────── */
(function () {
  const track = document.getElementById('carouselTrack');
  const nav   = document.getElementById('carouselNav');
  const cards = track.querySelectorAll('.testi-card');
  let perPage = 3;
  let current = 0;

  function getPerPage() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1100) return 2;
    return 3;
  }

  function buildDots() {
    nav.innerHTML = '';
    const pages = Math.ceil(cards.length / perPage);
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === current ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      nav.appendChild(dot);
    }
  }

  function goTo(page) {
    current = page;
    const offset = page * perPage;
    cards.forEach((c, i) => {
      c.style.display = (i >= offset && i < offset + perPage) ? 'block' : 'none';
    });
    nav.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === page));
  }

  function init() {
    perPage = getPerPage();
    current = 0;
    // Show/hide based on perPage
    cards.forEach((c, i) => { c.style.display = i < perPage ? 'block' : 'none'; });
    // Adjust grid
    track.style.gridTemplateColumns = `repeat(${perPage}, 1fr)`;
    buildDots();
  }

  init();
  window.addEventListener('resize', init);
})();

/* ── ROOM IMAGE SLIDERS (per card) ──────────────────────── */
document.querySelectorAll('[data-room-images]').forEach(box => {
  const track = box.querySelector('.room-img-track');
  const slides = box.querySelectorAll('.room-img-slide');
  const dotsWrap = box.querySelector('.room-img-dots');
  const prevBtn = box.querySelector('.room-img-prev');
  const nextBtn = box.querySelector('.room-img-next');
  let idx = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'room-img-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => { goTo(i); clearInterval(timer); startAuto(); });
    dotsWrap.appendChild(dot);
  });

  function goTo(i) {
    idx = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dotsWrap.querySelectorAll('.room-img-dot').forEach((d, j) => d.classList.toggle('active', j === idx));
  }
  function startAuto() { timer = setInterval(() => goTo(idx + 1), 3500); }
  prevBtn.addEventListener('click', e => { e.stopPropagation(); goTo(idx - 1); clearInterval(timer); startAuto(); });
  nextBtn.addEventListener('click', e => { e.stopPropagation(); goTo(idx + 1); clearInterval(timer); startAuto(); });
  startAuto();
});

/* ── ROOMS OUTER SLIDER ─────────────────────────────────── */
(function () {
  const track = document.getElementById('roomsTrack');
  const dotsWrap = document.getElementById('roomsDots');
  const prevBtn = document.getElementById('roomsPrev');
  const nextBtn = document.getElementById('roomsNext');
  const cards = track.querySelectorAll('.room-card');
  let perView = 3;
  let page = 0;

  function getPerView() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1100) return 2;
    return 3;
  }

  function pages() { return Math.max(1, cards.length - perView + 1); }

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < pages(); i++) {
      const dot = document.createElement('button');
      dot.className = 'rooms-slider-dot' + (i === page ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function goTo(i) {
    page = Math.max(0, Math.min(i, pages() - 1));
    const card = cards[page];
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    dotsWrap.querySelectorAll('.rooms-slider-dot').forEach((d, j) => d.classList.toggle('active', j === page));
  }

  prevBtn.addEventListener('click', () => goTo(page - 1));
  nextBtn.addEventListener('click', () => goTo(page + 1));

  function init() {
    perView = getPerView();
    page = 0;
    buildDots();
    goTo(0);
  }
  init();
  window.addEventListener('resize', init);
})();

/* ── ENQUIRY FORM: BILL CALCULATION + WHATSAPP/EMAIL SEND ────────── */
(function () {
  const checkin  = document.getElementById('ef-checkin');
  const checkout = document.getElementById('ef-checkout');
  const guests   = document.getElementById('ef-guests');
  const roomField = document.getElementById('ef-room');
  const name     = document.getElementById('ef-name');
  const phone    = document.getElementById('ef-phone');
  const email    = document.getElementById('ef-email');
  const notes    = document.getElementById('ef-notes');
  const submit   = document.getElementById('ef-submit');
  const submitEmail = document.getElementById('ef-submit-email');

  const billGuests   = document.getElementById('bill-guests');
  const billNights   = document.getElementById('bill-nights');
  const billTotal    = document.getElementById('bill-total');

  const RATE_PER_PERSON = 3500;
  const RESORT_EMAIL = 'info@dillzanresort.com';

  function fmt(n) { return '₹' + Math.round(n).toLocaleString('en-IN'); }

  function nights() {
    if (!checkin.value || !checkout.value) return 0;
    const d1 = new Date(checkin.value);
    const d2 = new Date(checkout.value);
    const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }

  function calc() {
    const g = parseInt(guests.value) || 0;
    const n = nights();
    const total = RATE_PER_PERSON * g * n;

    billGuests.textContent = g;
    billNights.textContent = n;
    billTotal.textContent = fmt(total);
    return { g, n, total };
  }

  [checkin, checkout, guests].forEach(el => el.addEventListener('input', calc));
  calc();

  function validate() {
    if (!name.value || !phone.value || !checkin.value || !checkout.value) {
      alert('Please fill in your name, phone number, check-in and check-out dates.');
      return null;
    }
    return calc();
  }

  function buildLines(g, n, total) {
    return [
      'Hello Dillzan Resort, I would like to make an enquiry:',
      '',
      'Guest Name: ' + name.value,
      'Phone: ' + phone.value,
      email.value ? 'Email: ' + email.value : null,
      'Check In: ' + checkin.value,
      'Check Out: ' + checkout.value,
      'Guests: ' + g,
      'Room Type: ' + roomField.value,
      'No. of Nights: ' + n,
      notes.value ? 'Special Requests: ' + notes.value : null,
      '',
      '--- Estimated Bill ---',
      'Rate per Person: ' + fmt(RATE_PER_PERSON) + ' / night',
      'Total Amount (' + g + ' guests x ' + n + ' nights): ' + fmt(total)
    ].filter(Boolean);
  }

  submit.addEventListener('click', () => {
    const result = validate();
    if (!result) return;
    const { g, n, total } = result;
    const lines = buildLines(g, n, total).join('\n');
    const url = 'https://wa.me/917715966111?text=' + encodeURIComponent(lines);
    window.open(url, '_blank');
  });

  submitEmail.addEventListener('click', () => {
    const result = validate();
    if (!result) return;
    const { g, n, total } = result;
    const lines = buildLines(g, n, total);
    const subject = 'Booking Enquiry - ' + name.value;
    const body = lines.join('\n');
    const url = 'mailto:' + RESORT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    window.location.href = url;
  });
})();

(function () {
  const box = document.getElementById('bookImgSlider');
  if (!box) return;
  const track = box.querySelector('.book-image-track');
  const slides = box.querySelectorAll('.book-image-slide');
  const dotsWrap = box.querySelector('.book-image-dots');
  const prevBtn = box.querySelector('.book-image-prev');
  const nextBtn = box.querySelector('.book-image-next');
  let idx = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'book-image-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(i) {
    idx = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dotsWrap.querySelectorAll('.book-image-dot').forEach((d, j) => d.classList.toggle('active', j === idx));
  }
  function startAuto() {
    timer = setInterval(() => goTo(idx + 1), 4000);
  }
  prevBtn.addEventListener('click', () => { goTo(idx - 1); clearInterval(timer); startAuto(); });
  nextBtn.addEventListener('click', () => { goTo(idx + 1); clearInterval(timer); startAuto(); });
  startAuto();
})();

/* ── HERO MOBILE AUTO-SLIDER ────────────────────────────── */
(function () {
  const heroGrid = document.querySelector('.hero-grid');
  const heroSlides = heroGrid.querySelectorAll('.hero-cell');
  let heroIdx = 0;
  let heroTimer;

  function isMobile() { return window.innerWidth <= 768; }

  // Create dots container
  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'hero-slider-dots';
  heroSlides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-slider-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => { heroGoTo(i); clearInterval(heroTimer); heroStartAuto(); });
    dotsWrap.appendChild(dot);
  });
  heroGrid.appendChild(dotsWrap);

  function heroGoTo(i) {
    heroSlides[heroIdx].classList.remove('active-slide');
    heroIdx = (i + heroSlides.length) % heroSlides.length;
    heroSlides[heroIdx].classList.add('active-slide');
    dotsWrap.querySelectorAll('.hero-slider-dot').forEach((d, j) => d.classList.toggle('active', j === heroIdx));
  }
  function heroStartAuto() { heroTimer = setInterval(() => heroGoTo(heroIdx + 1), 3000); }

  function heroInit() {
    if (isMobile()) {
      heroSlides.forEach(s => s.classList.remove('active-slide'));
      heroSlides[heroIdx].classList.add('active-slide');
      dotsWrap.style.display = 'flex';
      clearInterval(heroTimer);
      heroStartAuto();
    } else {
      heroSlides.forEach(s => s.classList.remove('active-slide'));
      dotsWrap.style.display = 'none';
      clearInterval(heroTimer);
    }
  }
  heroInit();
  window.addEventListener('resize', heroInit);
})();

/* ── GALLERY SLIDER ─────────────────────────────────────── */
function initGallerySlider(trackId, dotsId, prevId, nextId) {
  const track = document.getElementById(trackId);
  const dotsWrap = document.getElementById(dotsId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  if (!track) return;

  const slides = track.querySelectorAll('.gallery-slide');
  const total = slides.length;
  const perView = 3;
  let current = 0;
  let sliding = false;
  const pages = total - perView + 1; // sliding window

  // Build dots
  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('button');
      dot.className = 'gallery-dot' + (i === current ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function getSlideWidth() {
    const gap = 20; // 1.25rem ~20px
    return slides[0].offsetWidth + gap;
  }

  function markCenter() {
    slides.forEach((s, i) => s.classList.toggle('gallery-center', i === current + 1));
  }

  function goTo(i) {
    current = Math.max(0, Math.min(i, pages - 1));
    const offset = current * getSlideWidth();
    // Add blur class while transitioning
    track.classList.add('sliding');
    markCenter();
    track.style.transform = `translateX(-${offset}px)`;
    // Remove blur after transition
    clearTimeout(sliding);
    sliding = setTimeout(() => {
      track.classList.remove('sliding');
      slides.forEach(s => s.classList.remove('gallery-center'));
    }, 500);
    dotsWrap.querySelectorAll('.gallery-dot').forEach((d, j) => d.classList.toggle('active', j === current));
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  buildDots();
  markCenter();

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });

  window.addEventListener('resize', () => goTo(current));
}

initGallerySlider('galleryTrack', 'galleryDots', 'galleryPrev', 'galleryNext');


(function () {
  const track = document.getElementById('amenitiesTrack');
  const prev  = document.getElementById('amenitiesPrev');
  const next  = document.getElementById('amenitiesNext');
  if (!track) return;
  const scrollAmt = 220;
  let autoTimer;

  function step() {
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: scrollAmt, behavior: 'smooth' });
    }
  }
  function startAuto() { autoTimer = setInterval(step, 2500); }
  function restartAuto() { clearInterval(autoTimer); startAuto(); }

  prev.addEventListener('click', () => { track.scrollBy({ left: -scrollAmt, behavior: 'smooth' }); restartAuto(); });
  next.addEventListener('click', () => { track.scrollBy({ left:  scrollAmt, behavior: 'smooth' }); restartAuto(); });

  startAuto();
})();


/* ── SCROLL SPY: ACTIVE NAV LINK UNDERLINE ─────────────────── */
(function () {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = [];
  navLinks.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    const sec = document.getElementById(id);
    if (sec) sections.push({ link, sec });
  });
  if (!sections.length) return;

  function onScroll() {
    const scrollPos = window.scrollY + 120;
    let activeSec = sections[0];
    sections.forEach(item => {
      if (item.sec.offsetTop <= scrollPos) activeSec = item;
    });
    sections.forEach(item => item.link.classList.toggle('active', item === activeSec));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── SECTION SCROLL TRANSITION ─────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('.reveal-section');
  if (!sections.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  sections.forEach(s => observer.observe(s));
})();

/* ── PAGE TRANSITION ────────────────────────────────────── */
(function () {
  const overlay = document.getElementById('ptOverlay');
  if (!overlay) return;

  // On page load — leave animation
  overlay.classList.add('entering');
  overlay.style.pointerEvents = 'none';
  // Force reflow
  overlay.getBoundingClientRect();
  // Immediately transition out
  setTimeout(() => {
    overlay.classList.remove('entering');
    overlay.classList.add('leaving');
  }, 80);

  // On all anchor clicks that go to external pages (not hash links)
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel') || link.target === '_blank') return;
    link.addEventListener('click', function (e) {
      e.preventDefault();
      overlay.classList.remove('leaving');
      overlay.classList.add('entering');
      overlay.style.pointerEvents = 'all';
      setTimeout(() => {
        window.location.href = href;
      }, 520);
    });
  });
})();