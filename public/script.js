/* ============================================================
   ACURON IT SERVICES — MAIN JAVASCRIPT
   ============================================================ */

// ── Page Loader ──────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('hidden');
  }, 1800);
});

// ── Sticky Nav ───────────────────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ── Mobile Nav Toggle ────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileNav.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

// ── Hero Canvas Particle Network ─────────────────────────────
(function initParticleNetwork() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [], W, H;
  const PARTICLE_COUNT = window.innerWidth < 768 ? 40 : 80;
  const MAX_DIST = 150;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.r = Math.random() * 2 + 1;
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // Update positions
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 229, 255, 0.6)';
      ctx.fill();
    });
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 229, 255, ${(1 - dist / MAX_DIST) * 0.2})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  draw();
})();

// ── Animated Counters ────────────────────────────────────────
function animateCounter(el, target, duration = 2000, suffix = '') {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start) + suffix;
  }, 16);
}

// ── Scroll Reveal ────────────────────────────────────────────
(function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Counter animation
        const counter = entry.target.querySelector('[data-count]');
        if (counter && !counter.dataset.animated) {
          counter.dataset.animated = '1';
          const target = parseInt(counter.dataset.count);
          const suffix = counter.dataset.suffix || '';
          animateCounter(counter, target, 2000, suffix);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => observer.observe(el));

  // Also observe metric cards directly
  document.querySelectorAll('[data-count]').forEach(el => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !el.dataset.animated) {
          el.dataset.animated = '1';
          animateCounter(el, parseInt(el.dataset.count), 2000, el.dataset.suffix || '');
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
  });
})();

// ── Testimonials Carousel ─────────────────────────────────────
(function initTestimonialsCarousel() {
  const track = document.querySelector('.testimonials-track');
  if (!track) return;
  const cards = track.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.tNav-dot');
  const prevBtn = document.getElementById('tPrev');
  const nextBtn = document.getElementById('tNext');
  let current = 0;
  let cardsPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;

  function getCardWidth() {
    if (!cards[0]) return 0;
    return cards[0].offsetWidth + 24;
  }

  function goto(idx) {
    const max = cards.length - cardsPerView;
    current = Math.max(0, Math.min(idx, max));
    track.style.transform = `translateX(-${current * getCardWidth()}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goto(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goto(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goto(i)));

  // Auto-advance
  let autoPlay = setInterval(() => goto(current + 1 >= cards.length - cardsPerView + 1 ? 0 : current + 1), 5000);
  track.addEventListener('mouseenter', () => clearInterval(autoPlay));
  track.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => goto(current + 1 >= cards.length - cardsPerView + 1 ? 0 : current + 1), 5000);
  });

  window.addEventListener('resize', () => {
    cardsPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    goto(0);
  });
})();

// ── AI Widget ────────────────────────────────────────────────
(function initAIWidget() {
  const aiInput = document.getElementById('ai-input');
  const aiSubmit = document.getElementById('ai-submit');
  const aiResponse = document.getElementById('ai-response');
  const chips = document.querySelectorAll('.ai-chip');

  const responses = {
    'ai': 'AI can transform your business by automating repetitive tasks, generating predictive insights from data, personalising customer experiences at scale, and enabling smarter decision-making. <strong>Acuron</strong> specialises in custom ML pipelines, NLP solutions, and computer vision systems tailored for enterprise.',
    'cloud': 'Cloud migration requires a structured approach: assessment, planning, pilot migration, and full rollout. <strong>Acuron Cloud Engineering</strong> supports AWS, Azure, and GCP, with a DevSecOps framework to ensure zero-downtime migrations and ongoing cost optimisation.',
    'mobile': 'We build cross-platform and native mobile apps for iOS and Android using React Native, Flutter, and Swift/Kotlin. Our mobile-first architecture ensures scalability, performance, and seamless UX. <strong>Acuron</strong> has delivered 50+ enterprise mobile applications globally.',
    'cybersecurity': 'Cybersecurity for startups starts with Zero Trust architecture, identity management, encryption at rest and in transit, and continuous threat monitoring. <strong>Acuron Cybersecurity</strong> offers vulnerability assessments, SOC-as-a-Service, and compliance frameworks (ISO 27001, SOC 2).',
    'default': 'Thank you for your question! <strong>Acuron IT Services</strong> provides end-to-end technology consulting across AI, Cloud, Software Development, Cybersecurity, and Data Analytics. Please <a href="#" style="color:var(--cyan)">contact our experts</a> for a personalised consultation.'
  };

  function getResponse(q) {
    q = q.toLowerCase();
    if (q.includes('ai') || q.includes('machine learning') || q.includes('intelligence')) return responses.ai;
    if (q.includes('cloud') || q.includes('migration') || q.includes('devops')) return responses.cloud;
    if (q.includes('mobile') || q.includes('app') || q.includes('software')) return responses.mobile;
    if (q.includes('security') || q.includes('cyber') || q.includes('hack')) return responses.cybersecurity;
    return responses.default;
  }

  function submit() {
    const q = aiInput ? aiInput.value.trim() : '';
    if (!q && !aiInput?.dataset.chip) return;
    const query = q || (aiInput?.dataset.chip);
    if (aiResponse) {
      aiResponse.innerHTML = `<span style="color:var(--cyan)">▶</span> ${getResponse(query)}`;
      aiResponse.classList.add('show');
    }
    if (aiInput) { aiInput.value = ''; delete aiInput.dataset.chip; }
  }

  if (aiSubmit) aiSubmit.addEventListener('click', submit);
  if (aiInput) {
    aiInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } });
  }
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (aiInput) { aiInput.value = chip.textContent; }
      submit();
    });
  });
})();

// ── Cookie Banner ─────────────────────────────────────────────
(function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  if (localStorage.getItem('acuron-cookies-accepted')) { banner.classList.add('hidden'); return; }
  document.getElementById('cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('acuron-cookies-accepted', '1');
    banner.classList.add('hidden');
  });
  document.getElementById('cookie-manage')?.addEventListener('click', () => {
    alert('Cookie preference management: You can disable analytics cookies in your browser settings.');
  });
})();

// ── Dark Mode Toggle ─────────────────────────────────────────
(function initDarkMode() {
  const toggle = document.getElementById('dark-toggle');
  if (!toggle) return;
  // Already dark by default; "light" mode = slightly lighter blues
  let isLight = false;
  toggle.addEventListener('click', () => {
    isLight = !isLight;
    document.documentElement.style.setProperty('--blue-deep', isLight ? '#0F2D52' : '#0B1F3A');
    document.documentElement.style.setProperty('--blue-mid', isLight ? '#1A3A60' : '#0D2B4E');
    toggle.textContent = isLight ? '🌙' : '☀️';
  });
})();

// ── Search Toggle ─────────────────────────────────────────────
(function initSearch() {
  const btn = document.getElementById('search-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const q = prompt('Search Acuron IT Services:');
    if (q && q.trim()) {
      window.open(`https://www.google.com/search?q=site:acuronit.com+${encodeURIComponent(q)}`, '_blank');
    }
  });
})();

// ── Newsletter Form ───────────────────────────────────────────
(function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    if (email) {
      const btn = form.querySelector('button');
      btn.textContent = '✓ Subscribed!';
      btn.style.background = '#10B981';
      setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; form.reset(); }, 3000);
    }
  });
})();

// ── Float Chat ────────────────────────────────────────────────
const floatChat = document.getElementById('float-chat');
if (floatChat) {
  floatChat.addEventListener('click', () => {
    const widget = document.getElementById('ai-assistant');
    if (widget) { widget.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  });
}

// ── Smooth scroll for anchor links ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

console.log('%c Acuron IT Services ', 'background:#00E5FF;color:#0B1F3A;font-weight:bold;font-size:14px;padding:4px 8px;border-radius:4px;');
console.log('%c Engineering Intelligent Digital Solutions ', 'color:#7C3AED;font-style:italic');
// v2
