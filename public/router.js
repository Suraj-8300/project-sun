// =============================================
// Project Sun — Client-Side SPA Router & Admin Panel
// "Art Student Meets Core Dev"
// =============================================

// Route → page initializer map
const routes = {
  '/': initLandingPage,
  '/admin': initAdminRoute,
  '/portfolio': initPortfolio,
  '/personal': initPersonal,
  '/instagram': () => {}
};

function initAdminRoute() {
  initLandingPage();
  if (localStorage.getItem('admin_token')) {
    openAdminDrawer();
  } else {
    showAdminLogin();
  }
}

// --- SVG Icon Library ---
const ICONS = {
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  leetcode: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125.513 5.527 5.527 0 00.062 2.362 5.83 5.83 0 00.349 1.017 5.938 5.938 0 001.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 00-1.951-.003l-2.396 2.392a3.021 3.021 0 01-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 01.066-.523 2.545 2.545 0 01.619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 00-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0013.483 0zm-2.866 12.815a1.38 1.38 0 00-1.38 1.382 1.38 1.38 0 001.38 1.382H20.79a1.38 1.38 0 001.38-1.382 1.38 1.38 0 00-1.38-1.382z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z"/></svg>',
  email: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  gmail: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
  discord: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>',
  telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
  substack: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>',
  medium: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>',
  codeforces: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 7.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 3 0V9a1.5 1.5 0 0 0-1.5-1.5zm7.5-4.5a1.5 1.5 0 0 0-1.5 1.5v15a1.5 1.5 0 0 0 3 0V4.5A1.5 1.5 0 0 0 12 3zm7.5 9a1.5 1.5 0 0 0-1.5 1.5v6a1.5 1.5 0 0 0 3 0v-6a1.5 1.5 0 0 0-1.5-1.5z"/></svg>',
  resume: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8 12h8v2H8v-2zm0 4h8v2H8v-2zm0-8h4v2H8V8z"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',
};

function getPlatformIcon(platform) {
  const key = (platform || '').toLowerCase().trim();
  if (ICONS[key]) return ICONS[key];
  if (key.includes('git')) return ICONS.github;
  if (key.includes('link')) return ICONS.linkedin;
  if (key.includes('tweet') || key.includes('twitter') || key === 'x') return ICONS.x;
  if (key.includes('insta')) return ICONS.instagram;
  if (key.includes('mail') || key.includes('gmail')) return ICONS.gmail;
  if (key.includes('leet')) return ICONS.leetcode;
  if (key.includes('codeforce')) return ICONS.codeforces;
  if (key.includes('sub')) return ICONS.substack;
  if (key.includes('medium')) return ICONS.medium;
  if (key.includes('discord')) return ICONS.discord;
  if (key.includes('tele')) return ICONS.telegram;
  if (key.includes('tube') || key.includes('video')) return ICONS.youtube;
  if (key.includes('resume') || key.includes('cv')) return ICONS.resume;
  return ICONS.link;
}

// --- SPA Client Router ---
async function navigate(path, pushState = true) {
  try {
    const appContent = document.getElementById('app-content');
    if (appContent) appContent.style.opacity = '0.3';

    const response = await fetch(path);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const htmlText = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    document.title = doc.title;
    const nextDescription = doc.querySelector('meta[name="description"]')?.content;
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (nextDescription) {
      if (!descriptionMeta) {
        descriptionMeta = document.createElement('meta');
        descriptionMeta.name = 'description';
        document.head.appendChild(descriptionMeta);
      }
      descriptionMeta.content = nextDescription;
    } else {
      descriptionMeta?.remove();
    }

    const newContent = doc.getElementById('app-content');
    if (appContent && newContent) {
      appContent.innerHTML = newContent.innerHTML;
      appContent.style.opacity = '1';
    }

    updateActiveNav(path);

    if (pushState) {
      history.pushState({ path }, '', path);
    }

    const initFunc = routes[path];
    if (initFunc) initFunc();

    // Re-attach admin trigger listener if it changed
    setupAdminTrigger();
  } catch (error) {
    console.error('Navigation failed:', error);
    if (pushState) window.location.href = path;
  }
}

function updateActiveNav(path) {
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === path);
  });
}

// Intercept internal clicks
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link) {
    const href = link.getAttribute('href');
    if (href && routes[href]) {
      e.preventDefault();
      if (window.location.pathname !== href) {
        navigate(href);
      }
    }
  }
});

window.addEventListener('popstate', () => {
  navigate(window.location.pathname, false);
});

// =============================================
// Page Content Initializers
// =============================================

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function safeHref(value) {
  const href = String(value ?? '').trim();
  if (!href) return null;

  try {
    const protocol = new URL(href, window.location.origin).protocol;
    return ['http:', 'https:', 'mailto:'].includes(protocol) ? href : null;
  } catch {
    return null;
  }
}

const PROJECT_DETAILS = {
  'V-NEURON': {
    category: 'URBAN MOBILITY',
    summary: 'A multimodal routing console for Nagpur, bringing roads, metro, and walking legs into one journey.',
    initials: 'VN',
    image: '/vneuron/preview.webp',
    imageAlt: 'V-NEURON route planner showing transit markers across Nagpur',
    href: '/vneuron',
    action: 'Explore the live map'
  },
  'Project Sun': {
    category: 'EDGE SOFTWARE',
    summary: 'A personal publishing system built on Cloudflare Workers and D1, with a private content console.',
    initials: 'PS',
    action: 'Visit the live site'
  },
  'CodeAudit AI': {
    category: 'DEVELOPER TOOLS',
    summary: 'An exploration of AI-assisted code review, combining language models with structure-aware analysis.',
    initials: 'CA'
  },
  'LoadMaster RL': {
    category: 'REINFORCEMENT LEARNING',
    summary: 'A reinforcement-learning project exploring adaptive load management and decision-making.',
    initials: 'LM'
  }
};

function initLandingPage() {
  initSiteNavigation();
  loadProfileSettings();
  initPortfolio();
  initPersonal();
  initHub();
}

async function loadProfileSettings() {
  try {
    const response = await fetch('/api/settings');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const settings = await response.json();
    const nameParts = String(settings.display_name || 'Suraj Dhere').trim().split(/\s+/);
    const firstName = nameParts.shift() || 'Suraj';
    const lastName = nameParts.join(' ');

    const trigger = document.getElementById('admin-trigger');
    if (trigger) trigger.textContent = settings.display_name || 'Suraj Dhere';

    const footerName = document.getElementById('footer-author-name');
    if (footerName) footerName.textContent = settings.display_name || 'Suraj Dhere';

    const firstNameEl = document.getElementById('profile-name-first');
    if (firstNameEl) firstNameEl.textContent = firstName;

    const lastNameEl = document.getElementById('profile-name-last');
    if (lastNameEl) lastNameEl.textContent = lastName ? `${lastName}.` : '';

    const roleEl = document.getElementById('profile-role');
    if (roleEl) roleEl.textContent = settings.role || '';

    const introEl = document.getElementById('profile-intro');
    if (introEl) introEl.textContent = settings.intro || '';

    const locationEl = document.getElementById('profile-location');
    if (locationEl) locationEl.textContent = String(settings.location || '').toUpperCase();

    const footerLocEl = document.getElementById('footer-location-text');
    if (footerLocEl) footerLocEl.textContent = settings.location || 'Nagpur';

    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) currentYearEl.textContent = String(new Date().getFullYear());

    const aboutStmtEl = document.getElementById('profile-about-statement');
    if (aboutStmtEl && settings.about_statement) aboutStmtEl.textContent = settings.about_statement;

    const aboutDetailEl = document.getElementById('profile-about-detail');
    if (aboutDetailEl && settings.about_detail) aboutDetailEl.textContent = settings.about_detail;

    const skillsContainer = document.getElementById('profile-skills');
    if (skillsContainer && settings.skills) {
      const skills = settings.skills.split(',').map(s => s.trim()).filter(Boolean);
      if (skills.length > 0) {
        skillsContainer.innerHTML = skills.map(s => `<span>${escapeHTML(s)}</span>`).join('');
      }
    }

    const curiositiesContainer = document.getElementById('profile-curiosities');
    if (curiositiesContainer && settings.curiosities) {
      const items = settings.curiosities.split(',').map(s => s.trim()).filter(Boolean);
      if (items.length > 0) {
        curiositiesContainer.innerHTML = items.map(s => `<span>${escapeHTML(s)}</span>`).join('');
      }
    }

    const coordinateEl = document.getElementById('profile-contact-coordinate');
    if (coordinateEl && settings.contact_coordinate) coordinateEl.textContent = settings.contact_coordinate;

    const email = settings.contact_email || 'surajdhere8300@gmail.com';
    const emailButton = document.getElementById('contact-email-button');
    if (emailButton) emailButton.href = `mailto:${email}`;

    const introEmailLink = document.getElementById('intro-email-link');
    if (introEmailLink) introEmailLink.href = `mailto:${email}`;
  } catch (error) {
    console.warn('Profile settings are not available:', error);
  }
}

function initSiteNavigation() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav || toggle.dataset.ready) return;

  toggle.dataset.ready = 'true';
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.querySelector('span').textContent = isOpen ? '−' : '+';
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelector('span').textContent = '+';
    });
  });
}

// --- Hub Page ---
async function initHub() {
  const container = document.getElementById('socials-list');
  if (!container) return;

  container.innerHTML = '<div class="loading-spinner"></div>';

  try {
    const response = await fetch('/api/links');
    if (!response.ok) throw new Error('Failed to fetch links');
    const links = await response.json();

    container.innerHTML = '';
    const socialLinks = links.filter(l => ['social', 'contact'].includes(l.category));

    if (socialLinks.length === 0) {
      container.innerHTML = '<div class="empty-state">No contact links configured.</div>';
      return;
    }

    socialLinks.forEach(link => {
      const href = safeHref(link.url);
      if (!href) return;

      const icon = getPlatformIcon(link.platform);
      const isExternal = /^https?:/i.test(href) && new URL(href, window.location.origin).origin !== window.location.origin;

      const a = document.createElement('a');
      a.href = href;
      a.className = 'social-link';
      if (isExternal) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      a.innerHTML = `${icon}<span>${escapeHTML(link.platform)}</span>`;
      container.appendChild(a);
    });
  } catch (error) {
    console.error('Error loading socials:', error);
    container.innerHTML = `<div class="empty-state">Error: ${escapeHTML(error.message)}</div>`;
  }
}

// --- Portfolio Page ---
async function initPortfolio() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  container.innerHTML = '<div class="loading-spinner"></div>';

  try {
    const response = await fetch('/api/projects');
    if (!response.ok) throw new Error('Failed to fetch projects');
    const projects = await response.json();

    container.innerHTML = '';

    if (projects.length === 0) {
      container.innerHTML = '<div class="empty-state">No projects yet.</div>';
      return;
    }

    projects.forEach((project, index) => {
      const detail = PROJECT_DETAILS[project.name] || {};
      const category = project.category || detail.category || 'INDEPENDENT PROJECT';
      const summary = project.summary || detail.summary || 'An ongoing project exploring practical software and applied problem-solving.';
      const imageUrl = project.image_url || detail.image || '';
      const actionLabel = project.action_label || detail.action || (project.live_url ? 'Explore project' : 'View on GitHub');
      const actionUrl = safeHref(project.action_url || detail.href || project.live_url);
      const repoUrl = safeHref(project.live_url);

      const card = document.createElement('article');
      card.className = 'project-card work-card';
      if (imageUrl) card.classList.add('work-card-featured');
      if (project.pinned) {
        card.classList.add('pinned');
      }

      const status = project.status || 'Active';
      const statusKey = status.toLowerCase().replace(/\s+/g, '-');
      const tags = (project.tech_tags || '')
        .split(',')
        .filter(t => t.trim())
        .map(t => `<span class="tag">${escapeHTML(t.trim())}</span>`)
        .join('');
      const title = escapeHTML(project.name || 'Untitled project');

      const words = (project.name || '').trim().split(/\s+/);
      const defaultInitials = words.length > 1
        ? (words[0][0] + words[1][0]).toUpperCase()
        : (project.name || 'SD').slice(0, 2).toUpperCase();
      const initials = detail.initials || defaultInitials;

      const visual = imageUrl
        ? `<div class="work-card-visual"><img src="${escapeHTML(imageUrl)}" alt="${escapeHTML(detail.imageAlt || title)}" loading="lazy" /></div>`
        : `<div class="work-card-visual"><div class="work-card-placeholder"><strong>${escapeHTML(initials)}</strong><span>${escapeHTML(category)}</span></div></div>`;

      const primaryExternal = actionUrl && /^https?:/i.test(actionUrl) && new URL(actionUrl, window.location.origin).origin !== window.location.origin;
      const primaryAction = actionUrl
        ? `<a href="${escapeHTML(actionUrl)}"${primaryExternal ? ' target="_blank" rel="noopener noreferrer"' : ''}>${escapeHTML(actionLabel)} <span aria-hidden="true">↗</span></a>`
        : '';

      const showRepoAction = repoUrl && actionUrl !== repoUrl;
      const repoAction = showRepoAction
        ? `<a href="${escapeHTML(repoUrl)}" target="_blank" rel="noopener noreferrer">Repository <span aria-hidden="true">↗</span></a>`
        : '';

      const pinBadge = project.pinned ? '<span class="project-pin-badge">PINNED</span>' : '';

      card.innerHTML = `
        ${visual}
        ${pinBadge}
        <div class="work-card-body">
          <div class="work-card-overline">
            <span>${String(index + 1).padStart(2, '0')} / ${escapeHTML(category)}</span>
            <span class="project-status"><span class="status-dot ${escapeHTML(statusKey)}"></span>${escapeHTML(status)}</span>
          </div>
          <h3 class="work-card-title">${title}</h3>
          <p class="work-card-description">${escapeHTML(summary)}</p>
          <div class="work-card-tags">${tags}</div>
          <div class="work-card-actions">${primaryAction}${repoAction}</div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading projects:', error);
    container.innerHTML = `<div class="empty-state">Error: ${escapeHTML(error.message)}</div>`;
  }
}

// --- Personal Page ---
async function initPersonal() {
  const container = document.getElementById('posts-feed');
  if (!container) return;

  container.innerHTML = '<div class="loading-spinner"></div>';

  try {
    const response = await fetch('/api/posts');
    if (!response.ok) throw new Error('Failed to fetch posts');
    const posts = await response.json();

    container.innerHTML = '';

    if (posts.length === 0) {
      container.innerHTML = '<div class="empty-state">No posts yet. Check back soon.</div>';
      return;
    }

    posts.forEach(post => {
      const card = document.createElement('article');
      card.className = 'post-card';

      const date = post.created_at
        ? new Date(post.created_at).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
          })
        : '';

      const typeClass = (post.type || 'blog').toLowerCase();
      const fullText = post.content || '';
      const hasMedia = /!\[(image|video|audio)\]\((.*?)\)/.test(fullText);
      const isLong = fullText.length > 180 || hasMedia;

      card.innerHTML = `
        <div class="post-meta">
          <span class="post-type ${escapeHTML(typeClass)}">${escapeHTML(post.type)}</span>
          <span class="post-date">${date}</span>
        </div>
        <h3 class="post-title">${escapeHTML(post.title)}</h3>
        <div class="post-content-wrapper"></div>
      `;

      const wrapper = card.querySelector('.post-content-wrapper');

      if (isLong) {
        card.classList.add('collapsible');
        let expanded = false;

        const updateView = () => {
          if (expanded) {
            wrapper.innerHTML = `
              <div class="post-content">${renderPostContent(fullText)}</div>
              <div class="post-expand-btn">Collapse ▴</div>
            `;
          } else {
            wrapper.innerHTML = `
              <div class="post-content">${escapeHTML(getSnippet(fullText))}</div>
              <div class="post-expand-btn">Read More ▾</div>
            `;
          }
        };

        updateView();

        card.addEventListener('click', (e) => {
          if (e.target.closest('video') || e.target.closest('audio') || e.target.closest('a')) {
            return;
          }
          expanded = !expanded;
          updateView();
        });
      } else {
        wrapper.innerHTML = `
          <div class="post-content">${renderPostContent(fullText)}</div>
        `;
      }

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading posts:', error);
    container.innerHTML = `<div class="empty-state">Error: ${escapeHTML(error.message)}</div>`;
  }
}

function renderPostContent(text) {
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // 1. Markdown media tags
  html = html.replace(/!\[image\]\((.*?)\)/g, '<img class="post-media" src="$1" loading="lazy" />');
  html = html.replace(/!\[video\]\((.*?)\)/g, '<video class="post-media" src="$1" controls></video>');
  html = html.replace(/!\[audio\]\((.*?)\)/g, '<audio class="post-audio" src="$1" controls></audio>');

  // 2. Markdown links: [text](url)
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1 ↗</a>');

  // 3. Bold & Italic
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // 4. Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // 5. Direct media URL lines auto-parser
  const lines = html.split('\n');
  const parsedLines = lines.map(line => {
    const trimmed = line.trim();
    if (/^https?:\/\/[^\s]+$/i.test(trimmed)) {
      if (/\.(jpeg|jpg|png|gif|webp|svg)(\?.*)?$/i.test(trimmed)) {
        return `<img class="post-media" src="${trimmed}" loading="lazy" />`;
      }
      if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(trimmed)) {
        return `<video class="post-media" src="${trimmed}" controls></video>`;
      }
      if (/\.(mp3|wav|aac|m4a|ogg)(\?.*)?$/i.test(trimmed)) {
        return `<audio class="post-audio" src="${trimmed}" controls></audio>`;
      }
    }
    return line;
  });

  return parsedLines.join('<br>');
}

function getSnippet(text) {
  let cleanText = text.replace(/!\[(image|video|audio)\]\((.*?)\)/g, '');
  const lines = cleanText.split('\n');
  const filteredLines = lines.filter(line => {
    const trimmed = line.trim();
    if (/^https?:\/\/[^\s]+$/i.test(trimmed)) {
      if (/\.(jpeg|jpg|png|gif|webp|svg|mp4|webm|mp3|wav|aac|m4a|ogg)(\?.*)?$/i.test(trimmed)) {
        return false;
      }
    }
    return true;
  });
  cleanText = filteredLines.join('\n');
  if (cleanText.length <= 180) {
    return cleanText;
  }
  return cleanText.substring(0, 180).trim() + '...';
}

// =============================================
// Admin Control Panel Integration
// =============================================

// =============================================
// Admin Control Panel Integration
// =============================================

let adminTriggerCount = 0;
let adminTriggerTimeout = null;
let currentAdminTab = 'profile';
let editingItemId = null;
let postFilterType = 'all';
let postSearchQuery = '';

function getAuthHeader() {
  const token = localStorage.getItem('admin_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

function showAdminToast(message, type = 'info') {
  let toast = document.getElementById('admin-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'admin-toast';
    toast.className = 'admin-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `admin-toast visible ${type}`;
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 3200);
}

function handleUnauthorized() {
  localStorage.removeItem('admin_token');
  closeAdminDrawer();
  const fab = document.getElementById('admin-fab');
  if (fab) fab.classList.add('hidden');
  showAdminToast('Session expired or invalid key. Please log in again.', 'error');
  showAdminLogin();
}

// Setup hidden and direct triggers
function setupAdminTrigger() {
  const trigger = document.getElementById('admin-trigger');
  if (trigger) {
    trigger.replaceWith(trigger.cloneNode(true));
    const newTrigger = document.getElementById('admin-trigger');
    newTrigger.addEventListener('click', () => {
      adminTriggerCount++;
      clearTimeout(adminTriggerTimeout);
      adminTriggerTimeout = setTimeout(() => {
        adminTriggerCount = 0;
      }, 2000);

      if (adminTriggerCount >= 5) {
        adminTriggerCount = 0;
        if (localStorage.getItem('admin_token')) {
          openAdminDrawer();
        } else {
          showAdminLogin();
        }
      }
    });
  }

  const footerBtn = document.getElementById('footer-admin-btn');
  if (footerBtn) {
    footerBtn.replaceWith(footerBtn.cloneNode(true));
    const newFooterBtn = document.getElementById('footer-admin-btn');
    newFooterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (localStorage.getItem('admin_token')) {
        openAdminDrawer();
      } else {
        showAdminLogin();
      }
    });
  }
}

function showAdminLogin() {
  if (localStorage.getItem('admin_token')) {
    openAdminDrawer();
    return;
  }

  let overlay = document.getElementById('admin-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'admin-overlay';
    overlay.className = 'admin-overlay';
    overlay.innerHTML = `
      <div class="admin-login">
        <h3>Site Editor Authentication</h3>
        <p style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-muted); margin-bottom:14px;">Enter your admin key to edit projects, profile, notes and links.</p>
        <input type="password" id="admin-pass-input" placeholder="Enter ADMIN_KEY..." autocomplete="current-password" />
        <button id="admin-login-btn">Authenticate</button>
        <div id="admin-login-error" class="error-msg hidden"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.add('hidden');
      }
    });

    document.getElementById('admin-login-btn').addEventListener('click', handleAdminLoginSubmit);
    document.getElementById('admin-pass-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleAdminLoginSubmit();
    });
  }

  overlay.classList.remove('hidden');
  const input = document.getElementById('admin-pass-input');
  input.value = '';
  document.getElementById('admin-login-error').classList.add('hidden');
  input.focus();
}

async function handleAdminLoginSubmit() {
  const passInput = document.getElementById('admin-pass-input');
  const errorDiv = document.getElementById('admin-login-error');
  const password = passInput.value.trim();

  if (!password) {
    errorDiv.textContent = 'Please enter your admin key';
    errorDiv.classList.remove('hidden');
    return;
  }

  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    const data = await res.json();

    if (res.ok && data.authenticated) {
      localStorage.setItem('admin_token', password);
      document.getElementById('admin-overlay').classList.add('hidden');
      initAdminPanel();
      openAdminDrawer();
      showAdminToast('Authenticated successfully', 'success');
    } else {
      errorDiv.textContent = data.error || 'Authentication failed';
      errorDiv.classList.remove('hidden');
    }
  } catch (err) {
    errorDiv.textContent = 'Server error during auth';
    errorDiv.classList.remove('hidden');
  }
}

// Initialise Admin panel elements (FAB + Drawer)
function initAdminPanel() {
  if (!localStorage.getItem('admin_token')) return;

  // 1. FAB
  let fab = document.getElementById('admin-fab');
  if (!fab) {
    fab = document.createElement('button');
    fab.id = 'admin-fab';
    fab.className = 'admin-fab';
    fab.title = 'Open Site Editor';
    fab.innerHTML = '⚙️';
    document.body.appendChild(fab);
    fab.addEventListener('click', toggleAdminDrawer);
  }
  fab.classList.remove('hidden');

  // 2. Drawer
  let drawer = document.getElementById('admin-drawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'admin-drawer';
    drawer.className = 'admin-drawer';
    drawer.innerHTML = `
      <div class="admin-header">
        <div>
          <h3>Site Editor</h3>
          <a class="admin-site-link" href="/#top">View live page ↗</a>
        </div>
        <button class="admin-close" id="admin-close-btn" aria-label="Close site editor">&times;</button>
      </div>
      <div style="padding: 10px 20px 0;">
        <div class="admin-stats-bar" id="admin-stats-summary">
          <span class="admin-stats-dot"></span>
          <span>Connecting to SUNDB...</span>
        </div>
      </div>
      <div class="admin-tabs">
        <button class="admin-tab active" data-tab="profile">Profile</button>
        <button class="admin-tab" data-tab="projects">Projects</button>
        <button class="admin-tab" data-tab="posts">Posts</button>
        <button class="admin-tab" data-tab="links">Links</button>
      </div>
      <div class="admin-content" id="admin-content-pane">
        <!-- Rendered Dynamically -->
      </div>
    `;
    document.body.appendChild(drawer);

    document.getElementById('admin-close-btn').addEventListener('click', closeAdminDrawer);

    drawer.querySelectorAll('.admin-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        drawer.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentAdminTab = tab.dataset.tab;
        editingItemId = null;
        renderAdminTab();
      });
    });
  }
}

function toggleAdminDrawer() {
  const drawer = document.getElementById('admin-drawer');
  if (drawer) {
    drawer.classList.toggle('open');
    if (drawer.classList.contains('open')) {
      renderAdminTab();
    }
  }
}

function openAdminDrawer() {
  initAdminPanel();
  const drawer = document.getElementById('admin-drawer');
  if (drawer) {
    drawer.classList.add('open');
    renderAdminTab();
  }
}

function closeAdminDrawer() {
  const drawer = document.getElementById('admin-drawer');
  if (drawer) {
    drawer.classList.remove('open');
  }
}

async function updateAdminHeaderStats() {
  const statsEl = document.getElementById('admin-stats-summary');
  if (!statsEl) return;
  try {
    const res = await fetch('/api/admin/stats', { headers: getAuthHeader() });
    if (res.status === 401) {
      handleUnauthorized();
      return;
    }
    if (res.ok) {
      const stats = await res.json();
      statsEl.innerHTML = `
        <span class="admin-stats-dot"></span>
        <span>D1 SUNDB: <strong>${stats.projects}</strong> projects (${stats.pinned_projects} pinned) • <strong>${stats.posts}</strong> notes • <strong>${stats.links}</strong> links</span>
      `;
    }
  } catch {
    statsEl.innerHTML = '<span class="admin-stats-dot" style="background:#f59e0b"></span><span>D1 SUNDB Active</span>';
  }
}

// Render active tab inside drawer
async function renderAdminTab() {
  const pane = document.getElementById('admin-content-pane');
  if (!pane) return;

  updateAdminHeaderStats();
  pane.innerHTML = '<div class="loading-spinner"></div>';

  try {
    if (currentAdminTab === 'projects') {
      const res = await fetch('/api/projects');
      if (res.status === 401) { handleUnauthorized(); return; }
      const projects = await res.json();
      renderProjectsTab(pane, projects);
    } else if (currentAdminTab === 'profile') {
      const res = await fetch('/api/settings');
      if (res.status === 401) { handleUnauthorized(); return; }
      if (!res.ok) throw new Error('Could not load profile settings');
      renderProfileTab(pane, await res.json());
    } else if (currentAdminTab === 'posts') {
      const res = await fetch('/api/posts');
      if (res.status === 401) { handleUnauthorized(); return; }
      const posts = await res.json();
      renderPostsTab(pane, posts);
    } else if (currentAdminTab === 'links') {
      const res = await fetch('/api/links');
      if (res.status === 401) { handleUnauthorized(); return; }
      const links = await res.json();
      renderLinksTab(pane, links);
    }
  } catch (err) {
    pane.innerHTML = `<div class="empty-state">Failed to load: ${escapeHTML(err.message)}</div>`;
  }
}

// --- Tab Specific Renderers ---

function renderProfileTab(pane, settings) {
  pane.innerHTML = `
    <form class="admin-form" id="profile-form">
      <div class="admin-section-divider">// 01: Hero & Identity</div>
      <label for="profile-display-name">Display Name</label>
      <input id="profile-display-name" type="text" maxlength="80" required placeholder="e.g. Suraj Dhere" />

      <label for="profile-role-input">Role Title</label>
      <input id="profile-role-input" type="text" maxlength="100" required placeholder="e.g. Software engineer & AI developer" />

      <label for="profile-location-input">Location</label>
      <input id="profile-location-input" type="text" maxlength="100" required placeholder="e.g. Nagpur, India" />

      <label for="profile-intro-input">Introduction Bio</label>
      <textarea id="profile-intro-input" rows="3" maxlength="320" required placeholder="Short intro displayed in the hero section..."></textarea>

      <div class="admin-section-divider">// 02: Signal Strip</div>
      <label for="profile-curiosities-input">Current Curiosities (Comma separated)</label>
      <input id="profile-curiosities-input" type="text" maxlength="200" placeholder="e.g. Machine learning, Cloud architecture, Useful interfaces" />

      <div class="admin-section-divider">// 03: About Me Section</div>
      <label for="profile-about-statement-input">Statement Quote</label>
      <textarea id="profile-about-statement-input" rows="2" maxlength="300" placeholder="Highlighted quote in About section..."></textarea>

      <label for="profile-about-detail-input">Detailed Story</label>
      <textarea id="profile-about-detail-input" rows="4" maxlength="800" placeholder="Full about description..."></textarea>

      <label for="profile-skills-input">Tools I Reach For (Comma separated)</label>
      <input id="profile-skills-input" type="text" maxlength="300" placeholder="e.g. Python, C++, TypeScript, Machine learning, Cloudflare Workers, D1 / SQLite, React, Leaflet" />

      <div class="admin-section-divider">// 04: Contact Info</div>
      <label for="profile-contact-email-input">Contact Email Address</label>
      <input id="profile-contact-email-input" type="email" maxlength="120" placeholder="e.g. surajdhere8300@gmail.com" />

      <label for="profile-contact-coordinate-input">Coordinates Stamp</label>
      <input id="profile-contact-coordinate-input" type="text" maxlength="80" placeholder="e.g. 21.1458° N / 79.0882° E" />

      <div class="admin-form-actions">
        <button type="submit" class="admin-btn primary" id="save-profile-btn">Save Profile</button>
      </div>
    </form>
    <button class="admin-logout-btn" id="admin-logout">Logout / Lock Panel</button>
  `;

  document.getElementById('profile-display-name').value = settings.display_name || '';
  document.getElementById('profile-role-input').value = settings.role || '';
  document.getElementById('profile-location-input').value = settings.location || '';
  document.getElementById('profile-intro-input').value = settings.intro || '';
  document.getElementById('profile-curiosities-input').value = settings.curiosities || '';
  document.getElementById('profile-about-statement-input').value = settings.about_statement || '';
  document.getElementById('profile-about-detail-input').value = settings.about_detail || '';
  document.getElementById('profile-skills-input').value = settings.skills || '';
  document.getElementById('profile-contact-email-input').value = settings.contact_email || '';
  document.getElementById('profile-contact-coordinate-input').value = settings.contact_coordinate || '';

  document.getElementById('profile-form').addEventListener('submit', handleProfileSubmit);
  attachAdminLogout();
}

function renderProjectsTab(pane, items) {
  pane.innerHTML = `
    <form class="admin-form" id="project-form">
      <h4 style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent); margin-bottom:12px;">
        ${editingItemId ? `Edit Project #${editingItemId}` : 'Create New Project'}
      </h4>

      <label>Project Name *</label>
      <input type="text" id="proj-name" required placeholder="e.g. V-NEURON" />

      <label>Status *</label>
      <select id="proj-status">
        <option value="Active">Active</option>
        <option value="Shipped">Shipped</option>
        <option value="In-Progress">In-Progress</option>
        <option value="Archived">Archived</option>
      </select>

      <label>Category Label</label>
      <input type="text" id="proj-category" placeholder="e.g. URBAN MOBILITY, EDGE SOFTWARE, DEVELOPER TOOLS" />

      <label>Summary / Description</label>
      <textarea id="proj-summary" rows="3" placeholder="Clear summary of what this project does and why it matters..."></textarea>

      <label>Tech Tags (Comma separated)</label>
      <input type="text" id="proj-tags" placeholder="e.g. Python, LLM, AST, Static Analysis" />

      <label>Primary Action Label</label>
      <input type="text" id="proj-action-label" placeholder="e.g. Explore the live map, Visit live site, View on GitHub" />

      <label>Primary Action URL</label>
      <input type="text" id="proj-action-url" placeholder="e.g. /vneuron or https://..." />

      <label>Repository / Secondary Live URL</label>
      <input type="url" id="proj-url" placeholder="https://github.com/..." />

      <label>Preview Image URL</label>
      <input type="text" id="proj-image" placeholder="e.g. /vneuron/preview.webp or https://..." />

      <label style="display: flex; align-items: center; gap: 8px; margin-top: 12px; margin-bottom: 15px; cursor: pointer; user-select: none;">
        <input type="checkbox" id="proj-pinned" style="width: auto; margin: 0;" />
        <span>Pin project to top of list 📌</span>
      </label>

      <div class="admin-form-actions">
        <button type="submit" class="admin-btn primary">${editingItemId ? 'Update Project' : 'Add Project'}</button>
        ${editingItemId ? '<button type="button" class="admin-btn cancel" id="proj-cancel">Cancel</button>' : ''}
      </div>
    </form>

    <div class="admin-list">
      <div class="section-label" style="margin-top:20px;">// existing projects (drag or use ⬆️ ⬇️ to reorder)</div>
      ${items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        return `
          <div class="admin-item draggable-project" draggable="true" data-id="${item.id}">
            <div class="admin-item-info">
              <div class="admin-item-name" style="display: flex; align-items: center; gap: 6px;">
                ${item.pinned ? '📌 ' : ''}${escapeHTML(item.name)}
              </div>
              <div class="admin-item-meta">${escapeHTML(item.category || 'INDEPENDENT')} | ${escapeHTML(item.status)} | ${escapeHTML(item.tech_tags || 'No tags')}</div>
            </div>
            <div class="admin-item-actions">
              <button class="admin-icon-btn move-btn move-up" data-id="${item.id}" ${isFirst ? 'disabled style="opacity:0.3; cursor:default;"' : ''} title="Move Up">⬆️</button>
              <button class="admin-icon-btn move-btn move-down" data-id="${item.id}" ${isLast ? 'disabled style="opacity:0.3; cursor:default;"' : ''} title="Move Down">⬇️</button>
              <button class="admin-icon-btn pin-item" data-id="${item.id}" title="${item.pinned ? 'Unpin project' : 'Pin project'}">
                ${item.pinned ? '📌' : '📍'}
              </button>
              <button class="admin-icon-btn edit-item" data-id="${item.id}" title="Edit Project">✏️</button>
              <button class="admin-icon-btn delete delete-item" data-id="${item.id}" title="Delete Project">🗑️</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <button class="admin-logout-btn" id="admin-logout">Logout / Lock Panel</button>
  `;

  // Pre-fill if editing
  if (editingItemId) {
    const item = items.find(i => i.id == editingItemId);
    if (item) {
      document.getElementById('proj-name').value = item.name || '';
      document.getElementById('proj-status').value = item.status || 'Active';
      document.getElementById('proj-category').value = item.category || '';
      document.getElementById('proj-summary').value = item.summary || '';
      document.getElementById('proj-tags').value = item.tech_tags || '';
      document.getElementById('proj-action-label').value = item.action_label || '';
      document.getElementById('proj-action-url').value = item.action_url || '';
      document.getElementById('proj-url').value = item.live_url || '';
      document.getElementById('proj-image').value = item.image_url || '';
      document.getElementById('proj-pinned').checked = !!item.pinned;
    }
  }

  // Event handlers
  document.getElementById('project-form').addEventListener('submit', handleProjectSubmit);
  if (editingItemId) {
    document.getElementById('proj-cancel').addEventListener('click', () => {
      editingItemId = null;
      renderAdminTab();
    });
  }

  // Move up/down handlers
  pane.querySelectorAll('.move-up:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => moveProject(btn.dataset.id, -1, items));
  });
  pane.querySelectorAll('.move-down:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => moveProject(btn.dataset.id, 1, items));
  });

  attachListListeners('projects', items);
  initDragAndDrop();
}

async function moveProject(id, delta, items) {
  const currentIndex = items.findIndex(i => String(i.id) === String(id));
  if (currentIndex === -1) return;
  const targetIndex = currentIndex + delta;
  if (targetIndex < 0 || targetIndex >= items.length) return;

  const newItems = [...items];
  const [moved] = newItems.splice(currentIndex, 1);
  newItems.splice(targetIndex, 0, moved);

  const ids = newItems.map(item => Number(item.id));
  try {
    const res = await fetch('/api/projects/reorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ ids })
    });

    if (res.status === 401) { handleUnauthorized(); return; }
    if (res.ok) {
      showAdminToast('Project order updated', 'success');
      renderAdminTab();
      refreshMainSiteContent();
    } else {
      showAdminToast('Failed to update project order', 'error');
    }
  } catch {
    showAdminToast('Network error reordering projects', 'error');
  }
}

function renderPostsTab(pane, items) {
  const blogCount = items.filter(i => i.type === 'blog').length;
  const logCount = items.filter(i => i.type === 'log').length;
  const photoCount = items.filter(i => i.type === 'photo').length;

  let filteredItems = items;
  if (postFilterType !== 'all') {
    filteredItems = filteredItems.filter(i => i.type === postFilterType);
  }
  if (postSearchQuery.trim()) {
    const query = postSearchQuery.toLowerCase();
    filteredItems = filteredItems.filter(i =>
      (i.title || '').toLowerCase().includes(query) ||
      (i.content || '').toLowerCase().includes(query)
    );
  }

  pane.innerHTML = `
    <form class="admin-form" id="post-form">
      <h4 style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent); margin-bottom:12px;">
        ${editingItemId ? `Edit Post #${editingItemId}` : 'Create New Note / Post'}
      </h4>

      <label>Post Title *</label>
      <input type="text" id="post-title" required placeholder="e.g. Systems Architecture Deep-Dive" />

      <label>Type *</label>
      <select id="post-type">
        <option value="blog">blog</option>
        <option value="log">log</option>
        <option value="photo">photo</option>
      </select>

      <label>Content *</label>
      <div class="media-toolbar" style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px;">
        <button type="button" class="toolbar-btn add-media-btn" data-type="image" style="background:none; border:1px dashed var(--border); border-radius:4px; padding:4px 8px; font-family:var(--font-mono); font-size:0.68rem; color:var(--text-muted); cursor:pointer;">📷 Image</button>
        <button type="button" class="toolbar-btn add-media-btn" data-type="video" style="background:none; border:1px dashed var(--border); border-radius:4px; padding:4px 8px; font-family:var(--font-mono); font-size:0.68rem; color:var(--text-muted); cursor:pointer;">🎥 Video</button>
        <button type="button" class="toolbar-btn add-media-btn" data-type="audio" style="background:none; border:1px dashed var(--border); border-radius:4px; padding:4px 8px; font-family:var(--font-mono); font-size:0.68rem; color:var(--text-muted); cursor:pointer;">🎵 Audio</button>
        <button type="button" class="toolbar-btn insert-link-btn" style="background:none; border:1px dashed var(--border); border-radius:4px; padding:4px 8px; font-family:var(--font-mono); font-size:0.68rem; color:var(--text-muted); cursor:pointer;">🔗 Link</button>
      </div>
      <textarea id="post-content" rows="5" required placeholder="Write your note or thoughts here (supports markdown links, bold, code)..."></textarea>
      <div style="font-family:var(--font-mono); font-size:0.65rem; color:var(--text-muted); text-align:right; margin-top:4px;" id="char-count">0 characters</div>

      <div class="admin-form-actions">
        <button type="submit" class="admin-btn primary">${editingItemId ? 'Update Post' : 'Publish Note'}</button>
        ${editingItemId ? '<button type="button" class="admin-btn cancel" id="post-cancel">Cancel</button>' : ''}
      </div>
    </form>

    <div class="admin-list">
      <div class="section-label" style="margin-top:20px;">// existing posts (${items.length} total)</div>
      <div class="admin-filter-bar">
        <button type="button" class="admin-filter-btn ${postFilterType === 'all' ? 'active' : ''}" data-type="all">All (${items.length})</button>
        <button type="button" class="admin-filter-btn ${postFilterType === 'blog' ? 'active' : ''}" data-type="blog">Blog (${blogCount})</button>
        <button type="button" class="admin-filter-btn ${postFilterType === 'log' ? 'active' : ''}" data-type="log">Log (${logCount})</button>
        <button type="button" class="admin-filter-btn ${postFilterType === 'photo' ? 'active' : ''}" data-type="photo">Photo (${photoCount})</button>
      </div>

      <input type="text" class="admin-search-input" id="post-search" placeholder="Search notes..." value="${escapeHTML(postSearchQuery)}" />

      ${filteredItems.length === 0 ? '<div class="empty-state" style="padding:12px; font-size:0.75rem;">No matching posts found.</div>' : ''}

      ${filteredItems.map(item => `
        <div class="admin-item">
          <div class="admin-item-info">
            <div class="admin-item-name">${escapeHTML(item.title)}</div>
            <div class="admin-item-meta">${escapeHTML(item.type)} | ${escapeHTML(new Date(item.created_at).toLocaleDateString())}</div>
          </div>
          <div class="admin-item-actions">
            <button class="admin-icon-btn edit-item" data-id="${item.id}" title="Edit Note">✏️</button>
            <button class="admin-icon-btn delete delete-item" data-id="${item.id}" title="Delete Note">🗑️</button>
          </div>
        </div>
      `).join('')}
    </div>

    <button class="admin-logout-btn" id="admin-logout">Logout / Lock Panel</button>
  `;

  const textarea = document.getElementById('post-content');
  const charCount = document.getElementById('char-count');
  textarea.addEventListener('input', () => {
    charCount.textContent = `${textarea.value.length} characters`;
  });

  if (editingItemId) {
    const item = items.find(i => i.id == editingItemId);
    if (item) {
      document.getElementById('post-title').value = item.title || '';
      document.getElementById('post-type').value = item.type || 'blog';
      textarea.value = item.content || '';
      charCount.textContent = `${textarea.value.length} characters`;
    }
  }

  // Filter bar clicks
  pane.querySelectorAll('.admin-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      postFilterType = btn.dataset.type;
      renderPostsTab(pane, items);
    });
  });

  // Search input
  const searchInput = document.getElementById('post-search');
  searchInput.addEventListener('input', (e) => {
    postSearchQuery = e.target.value;
    renderPostsTab(pane, items);
    const updatedSearch = document.getElementById('post-search');
    if (updatedSearch) {
      updatedSearch.focus();
      updatedSearch.selectionStart = updatedSearch.selectionEnd = updatedSearch.value.length;
    }
  });

  // Toolbar media insertions
  pane.querySelectorAll('.add-media-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type');
      const url = prompt(`Enter ${type} URL:`);
      if (!url) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const tag = `\n![${type}](${url.trim()})\n`;
      textarea.value = text.substring(0, start) + tag + text.substring(end);
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + tag.length;
      charCount.textContent = `${textarea.value.length} characters`;
    });
  });

  pane.querySelector('.insert-link-btn')?.addEventListener('click', () => {
    const url = prompt('Enter URL:');
    if (!url) return;
    const label = prompt('Enter link text:', 'Link') || 'Link';
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const tag = `[${label}](${url.trim()})`;
    textarea.value = text.substring(0, start) + tag + text.substring(end);
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = start + tag.length;
    charCount.textContent = `${textarea.value.length} characters`;
  });

  document.getElementById('post-form').addEventListener('submit', handlePostSubmit);
  if (editingItemId) {
    document.getElementById('post-cancel').addEventListener('click', () => {
      editingItemId = null;
      renderAdminTab();
    });
  }
  attachListListeners('posts', items);
}

function renderLinksTab(pane, items) {
  pane.innerHTML = `
    <form class="admin-form" id="link-form">
      <h4 style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent); margin-bottom:12px;">
        ${editingItemId ? `Edit Link #${editingItemId}` : 'Create New Link'}
      </h4>

      <label>Platform Name *</label>
      <div style="display:flex; align-items:center; gap:8px;">
        <input type="text" id="link-platform" required placeholder="e.g. GitHub, LinkedIn, X, Substack, YouTube" />
        <div id="link-preview-icon" style="width:28px; height:28px; display:flex; align-items:center; justify-content:center; color:var(--accent); flex-shrink:0;"></div>
      </div>

      <label>URL *</label>
      <input type="text" id="link-url" required placeholder="e.g. https://github.com/... or mailto:..." />

      <label>Category *</label>
      <select id="link-category">
        <option value="social">social (visible on home/contact)</option>
        <option value="contact">contact (visible in contact)</option>
        <option value="internal">internal (internal navigation)</option>
      </select>

      <div class="admin-form-actions">
        <button type="submit" class="admin-btn primary">${editingItemId ? 'Update Link' : 'Add Link'}</button>
        ${editingItemId ? '<button type="button" class="admin-btn cancel" id="link-cancel">Cancel</button>' : ''}
      </div>
    </form>

    <div class="admin-list">
      <div class="section-label" style="margin-top:20px;">// existing links (${items.length})</div>
      ${items.map(item => {
        const iconSvg = getPlatformIcon(item.platform);
        return `
          <div class="admin-item">
            <div class="admin-item-info" style="display:flex; align-items:center; gap:10px;">
              <span style="width:20px; height:20px; display:inline-flex; align-items:center; justify-content:center; color:var(--accent); flex-shrink:0;">
                ${iconSvg}
              </span>
              <div style="min-width:0;">
                <div class="admin-item-name">${escapeHTML(item.platform)}</div>
                <div class="admin-item-meta">${escapeHTML(item.category)} | ${escapeHTML(item.url)}</div>
              </div>
            </div>
            <div class="admin-item-actions">
              <button class="admin-icon-btn edit-item" data-id="${item.id}" title="Edit Link">✏️</button>
              <button class="admin-icon-btn delete delete-item" data-id="${item.id}" title="Delete Link">🗑️</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <button class="admin-logout-btn" id="admin-logout">Logout / Lock Panel</button>
  `;

  const platformInput = document.getElementById('link-platform');
  const previewIcon = document.getElementById('link-preview-icon');
  const updateIconPreview = () => {
    previewIcon.innerHTML = getPlatformIcon(platformInput.value);
  };
  platformInput.addEventListener('input', updateIconPreview);
  updateIconPreview();

  if (editingItemId) {
    const item = items.find(i => i.id == editingItemId);
    if (item) {
      platformInput.value = item.platform || '';
      document.getElementById('link-url').value = item.url || '';
      document.getElementById('link-category').value = item.category || 'social';
      updateIconPreview();
    }
  }

  document.getElementById('link-form').addEventListener('submit', handleLinkSubmit);
  if (editingItemId) {
    document.getElementById('link-cancel').addEventListener('click', () => {
      editingItemId = null;
      renderAdminTab();
    });
  }
  attachListListeners('links', items);
}

// Attach listeners to list buttons (edit/delete/logout)
function attachListListeners(type, items) {
  document.querySelectorAll('.edit-item').forEach(btn => {
    btn.addEventListener('click', () => {
      editingItemId = btn.dataset.id;
      renderAdminTab();
    });
  });

  document.querySelectorAll('.delete-item').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      if (!confirm('Are you sure you want to delete this item?')) return;

      try {
        const res = await fetch(`/api/${type}/${id}`, {
          method: 'DELETE',
          headers: getAuthHeader()
        });

        if (res.status === 401) { handleUnauthorized(); return; }

        if (res.ok) {
          editingItemId = null;
          showAdminToast('Item deleted successfully', 'success');
          renderAdminTab();
          refreshMainSiteContent();
        } else {
          showAdminToast('Failed to delete item', 'error');
        }
      } catch {
        showAdminToast('Server error while deleting', 'error');
      }
    });
  });

  if (type === 'projects') {
    document.querySelectorAll('.pin-item').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        const item = items.find(i => i.id == id);
        if (!item) return;

        const newPinned = item.pinned ? 0 : 1;

        try {
          const res = await fetch(`/api/projects/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              ...getAuthHeader()
            },
            body: JSON.stringify({
              name: item.name,
              status: item.status,
              category: item.category,
              summary: item.summary,
              tech_tags: item.tech_tags,
              live_url: item.live_url,
              image_url: item.image_url,
              action_label: item.action_label,
              action_url: item.action_url,
              sort_order: item.sort_order,
              pinned: newPinned
            })
          });

          if (res.status === 401) { handleUnauthorized(); return; }

          if (res.ok) {
            showAdminToast(newPinned ? 'Project pinned to top' : 'Project unpinned', 'success');
            renderAdminTab();
            refreshMainSiteContent();
          } else {
            showAdminToast('Failed to update pin status', 'error');
          }
        } catch {
          showAdminToast('Server error updating pin', 'error');
        }
      });
    });
  }

  attachAdminLogout();
}

function attachAdminLogout() {
  document.getElementById('admin-logout')?.addEventListener('click', () => {
    localStorage.removeItem('admin_token');
    closeAdminDrawer();
    const fab = document.getElementById('admin-fab');
    if (fab) fab.classList.add('hidden');
    showAdminToast('Logged out of admin panel', 'info');
  });
}

// --- Submit Handlers ---

async function handleProfileSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('save-profile-btn');
  if (btn) btn.disabled = true;

  const body = {
    display_name: document.getElementById('profile-display-name').value.trim(),
    role: document.getElementById('profile-role-input').value.trim(),
    location: document.getElementById('profile-location-input').value.trim(),
    intro: document.getElementById('profile-intro-input').value.trim(),
    curiosities: document.getElementById('profile-curiosities-input').value.trim(),
    about_statement: document.getElementById('profile-about-statement-input').value.trim(),
    about_detail: document.getElementById('profile-about-detail-input').value.trim(),
    skills: document.getElementById('profile-skills-input').value.trim(),
    contact_email: document.getElementById('profile-contact-email-input').value.trim(),
    contact_coordinate: document.getElementById('profile-contact-coordinate-input').value.trim()
  };

  try {
    const response = await fetch('/api/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(body)
    });

    if (response.status === 401) { handleUnauthorized(); return; }

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.error || 'Could not save profile');
    }

    showAdminToast('Profile settings saved successfully!', 'success');
    refreshMainSiteContent();
    renderAdminTab();
  } catch (error) {
    showAdminToast(error.message || 'Could not save profile', 'error');
  } finally {
    if (btn) btn.disabled = false;
  }
}

async function handleProjectSubmit(e) {
  e.preventDefault();
  const body = {
    name: document.getElementById('proj-name').value.trim(),
    status: document.getElementById('proj-status').value,
    category: document.getElementById('proj-category').value.trim(),
    summary: document.getElementById('proj-summary').value.trim(),
    tech_tags: document.getElementById('proj-tags').value.trim(),
    action_label: document.getElementById('proj-action-label').value.trim(),
    action_url: document.getElementById('proj-action-url').value.trim(),
    live_url: document.getElementById('proj-url').value.trim(),
    image_url: document.getElementById('proj-image').value.trim(),
    pinned: document.getElementById('proj-pinned').checked ? 1 : 0
  };

  const url = editingItemId ? `/api/projects/${editingItemId}` : '/api/projects';
  const method = editingItemId ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(body)
    });

    if (res.status === 401) { handleUnauthorized(); return; }

    if (res.ok) {
      showAdminToast(editingItemId ? 'Project updated!' : 'Project created!', 'success');
      editingItemId = null;
      renderAdminTab();
      refreshMainSiteContent();
    } else {
      const errData = await res.json();
      showAdminToast(`Error saving: ${errData.error || 'Rejected by server'}`, 'error');
    }
  } catch {
    showAdminToast('Network error saving project', 'error');
  }
}

// HTML5 Drag & Drop handlers for Project Sort Sequence
function initDragAndDrop() {
  const list = document.querySelector('.admin-list');
  if (!list) return;

  const draggables = list.querySelectorAll('.draggable-project');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
      draggable.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
      saveNewOrder();
    });
  });

  list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggable = document.querySelector('.dragging');
    if (!draggable) return;
    const afterElement = getDragAfterElement(list, e.clientY);
    if (afterElement == null) {
      list.appendChild(draggable);
    } else {
      list.insertBefore(draggable, afterElement);
    }
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable-project:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

async function saveNewOrder() {
  const draggables = [...document.querySelectorAll('.draggable-project')];
  const ids = draggables.map(el => parseInt(el.dataset.id, 10));

  try {
    const res = await fetch('/api/projects/reorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ ids })
    });

    if (res.status === 401) { handleUnauthorized(); return; }

    if (res.ok) {
      showAdminToast('Project order saved', 'success');
      refreshMainSiteContent();
    } else {
      showAdminToast('Failed to save project order', 'error');
    }
  } catch (err) {
    showAdminToast('Error saving project order', 'error');
  }
}

async function handlePostSubmit(e) {
  e.preventDefault();
  const body = {
    title: document.getElementById('post-title').value.trim(),
    type: document.getElementById('post-type').value,
    content: document.getElementById('post-content').value.trim()
  };

  const url = editingItemId ? `/api/posts/${editingItemId}` : '/api/posts';
  const method = editingItemId ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(body)
    });

    if (res.status === 401) { handleUnauthorized(); return; }

    if (res.ok) {
      showAdminToast(editingItemId ? 'Post updated!' : 'Post published!', 'success');
      editingItemId = null;
      renderAdminTab();
      refreshMainSiteContent();
    } else {
      const errData = await res.json();
      showAdminToast(`Error saving: ${errData.error || 'Server rejected request'}`, 'error');
    }
  } catch {
    showAdminToast('Network error saving post', 'error');
  }
}

async function handleLinkSubmit(e) {
  e.preventDefault();
  const body = {
    platform: document.getElementById('link-platform').value.trim(),
    url: document.getElementById('link-url').value.trim(),
    category: document.getElementById('link-category').value
  };

  const url = editingItemId ? `/api/links/${editingItemId}` : '/api/links';
  const method = editingItemId ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(body)
    });

    if (res.status === 401) { handleUnauthorized(); return; }

    if (res.ok) {
      showAdminToast(editingItemId ? 'Link updated!' : 'Link created!', 'success');
      editingItemId = null;
      renderAdminTab();
      refreshMainSiteContent();
    } else {
      const errData = await res.json();
      showAdminToast(`Error saving: ${errData.error || 'Server rejected request'}`, 'error');
    }
  } catch {
    showAdminToast('Network error saving link', 'error');
  }
}

// Refresh the background page content immediately if present
function refreshMainSiteContent() {
  const path = window.location.pathname;
  const initFunc = routes[path] || routes['/'];
  if (initFunc) initFunc();
}

function checkUrlForAdmin() {
  const path = window.location.pathname;
  if (path === '/admin') return; // Handled by routes['/admin']
  const search = window.location.search;
  const hash = window.location.hash;
  if (search.includes('admin') || hash === '#admin') {
    if (localStorage.getItem('admin_token')) {
      openAdminDrawer();
    } else {
      showAdminLogin();
    }
  }
}

// DOM Setup
window.addEventListener('DOMContentLoaded', () => {
  setupAdminTrigger();
  if (localStorage.getItem('admin_token')) {
    initAdminPanel();
  }

  const path = window.location.pathname;
  const initFunc = routes[path];
  if (initFunc) {
    initFunc();
  }

  checkUrlForAdmin();
});

// --- Interactive Electric Spark Mouse Trail ---
(() => {
  if (document.body.classList.contains('portfolio-site')) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'electric-canvas';
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: '99999'
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const maxParticles = 65;

  class Spark {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      // Slanted explosion direction
      this.vx = (Math.random() - 0.5) * 7;
      this.vy = (Math.random() - 0.5) * 7 - 1.5;
      this.life = 0;
      this.maxLife = 20 + Math.random() * 20;
      // High energy color palette matching the neon brutalist accent scheme
      const colors = ['#818cf8', '#34d399', '#f472b6', '#a78bfa', '#ffffff'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.history = [{ x: this.x, y: this.y }];
    }

    update() {
      this.life++;

      // Jagged bolt wiggle
      this.vx += (Math.random() - 0.5) * 3;
      this.vy += (Math.random() - 0.5) * 3;

      // Decay speed
      this.vx *= 0.94;
      this.vy *= 0.94;

      this.x += this.vx;
      this.y += this.vy;

      this.history.push({ x: this.x, y: this.y });
      if (this.history.length > 5) {
        this.history.shift();
      }
    }

    draw() {
      if (this.history.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(this.history[0].x, this.history[0].y);

      for (let i = 1; i < this.history.length; i++) {
        const offsetLimit = 3 * (1 - this.life / this.maxLife);
        const ox = (Math.random() - 0.5) * offsetLimit;
        const oy = (Math.random() - 0.5) * offsetLimit;
        ctx.lineTo(this.history[i].x + ox, this.history[i].y + oy);
      }

      const opacity = 1 - this.life / this.maxLife;
      ctx.strokeStyle = this.color;
      ctx.lineWidth = (1 + Math.random() * 1.5) * opacity;
      ctx.shadowBlur = 8 * opacity;
      ctx.shadowColor = this.color;
      ctx.stroke();
    }
  }

  let animationFrameId = null;
  let mouseX = 0;
  let mouseY = 0;
  let mouseActive = false;

  function loop() {
    ctx.clearRect(0, 0, width, height);
    ctx.shadowBlur = 0;

    // Steady, slow electric leak when the mouse is at rest
    if (mouseActive) {
      if (Math.random() < 0.25) { // 25% chance per frame to spark at rest
        spawnSparks(mouseX, mouseY, 1);
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw();
      if (p.life >= p.maxLife) {
        particles.splice(i, 1);
      }
    }

    if (particles.length > 0 || mouseActive) {
      animationFrameId = requestAnimationFrame(loop);
    } else {
      animationFrameId = null;
    }
  }

  function spawnSparks(x, y, count) {
    for (let i = 0; i < count; i++) {
      if (particles.length < maxParticles) {
        particles.push(new Spark(x, y));
      }
    }
    if (!animationFrameId) {
      loop();
    }
  }

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mouseActive = true;

    if (!animationFrameId) {
      loop();
    }

    // Spawn 1-2 extra sparks on movement
    spawnSparks(mouseX, mouseY, Math.floor(Math.random() * 2) + 1);

    // Bounding box grounding trigger
    const targetElement = e.target.closest(
      '.panel, .project-card, .post-card, .nav-link, .social-link, .skill-item, #admin-trigger'
    );

    if (targetElement && !targetElement.classList.contains('charged')) {
      targetElement.classList.add('charged');
      setTimeout(() => {
        targetElement.classList.remove('charged');
      }, 400);

      // Generate localized border sparks to simulate a grounding lightning strike
      const rect = targetElement.getBoundingClientRect();
      const sparkCount = 3 + Math.floor(Math.random() * 3);

      for (let i = 0; i < sparkCount; i++) {
        const side = Math.floor(Math.random() * 4);
        let sx = rect.left, sy = rect.top;

        if (side === 0) { // Top edge
          sx = rect.left + Math.random() * rect.width;
          sy = rect.top;
        } else if (side === 1) { // Right edge
          sx = rect.right;
          sy = rect.top + Math.random() * rect.height;
        } else if (side === 2) { // Bottom edge
          sx = rect.left + Math.random() * rect.width;
          sy = rect.bottom;
        } else { // Left edge
          sx = rect.left;
          sy = rect.top + Math.random() * rect.height;
        }

        spawnSparks(sx, sy, 1);
      }
    }
  });

  window.addEventListener('mouseenter', () => {
    mouseActive = true;
    if (!animationFrameId) {
      loop();
    }
  });

  window.addEventListener('mouseleave', () => {
    mouseActive = false;
  });
})();
