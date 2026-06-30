// =============================================
// Project Sun — Client-Side SPA Router & Admin Panel
// "Art Student Meets Core Dev"
// =============================================

// Route → page initializer map
const routes = {
  '/': initHub,
  '/portfolio': initPortfolio,
  '/personal': initPersonal,
  '/instagram': () => {}
};

// --- SVG Icon Library ---
const ICONS = {
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  leetcode: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125.513 5.527 5.527 0 00.062 2.362 5.83 5.83 0 00.349 1.017 5.938 5.938 0 001.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 00-1.951-.003l-2.396 2.392a3.021 3.021 0 01-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 01.066-.523 2.545 2.545 0 01.619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 00-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0013.483 0zm-2.866 12.815a1.38 1.38 0 00-1.38 1.382 1.38 1.38 0 001.38 1.382H20.79a1.38 1.38 0 001.38-1.382 1.38 1.38 0 00-1.38-1.382z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z"/></svg>',
};

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
    if (href && href.startsWith('/') && !href.startsWith('/api')) {
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
    const socialLinks = links.filter(l => l.category === 'social');

    if (socialLinks.length === 0) {
      container.innerHTML = '<div class="empty-state">No social links configured.</div>';
      return;
    }

    socialLinks.forEach(link => {
      const key = link.platform.toLowerCase();
      const icon = ICONS[key] || '';
      const isExternal = link.url.startsWith('http');

      const a = document.createElement('a');
      a.href = link.url;
      a.className = 'social-link';
      if (isExternal) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      a.innerHTML = `${icon}<span>${link.platform}</span>`;
      container.appendChild(a);
    });
  } catch (error) {
    console.error('Error loading socials:', error);
    container.innerHTML = `<div class="empty-state">Error: ${error.message}</div>`;
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

    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';

      const statusKey = project.status.toLowerCase().replace(/\s+/g, '-');
      const tags = (project.tech_tags || '')
        .split(',')
        .filter(t => t.trim())
        .map(t => `<span class="tag">${t.trim()}</span>`)
        .join('');

      const linkHtml = project.live_url
        ? `<a href="${project.live_url}" class="project-link" target="_blank" rel="noopener noreferrer">View →</a>`
        : '';

      card.innerHTML = `
        <div class="project-name">${project.name}</div>
        <div class="project-status">
          <span class="status-dot ${statusKey}"></span>
          ${project.status}
        </div>
        <div class="project-tags">${tags}</div>
        ${linkHtml}
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading projects:', error);
    container.innerHTML = `<div class="empty-state">Error: ${error.message}</div>`;
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
          <span class="post-type ${typeClass}">${post.type}</span>
          <span class="post-date">${date}</span>
        </div>
        <h3 class="post-title">${post.title}</h3>
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
              <div class="post-content">${getSnippet(fullText)}</div>
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
    container.innerHTML = `<div class="empty-state">Error: ${error.message}</div>`;
  }
}

function renderPostContent(text) {
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  html = html.replace(/!\[image\]\((.*?)\)/g, '<img class="post-media" src="$1" loading="lazy" />');
  html = html.replace(/!\[video\]\((.*?)\)/g, '<video class="post-media" src="$1" controls></video>');
  html = html.replace(/!\[audio\]\((.*?)\)/g, '<audio class="post-audio" src="$1" controls></audio>');

  return html.split('\n').join('<br>');
}

function getSnippet(text) {
  let cleanText = text.replace(/!\[(image|video|audio)\]\((.*?)\)/g, '');
  if (cleanText.length <= 180) {
    return cleanText;
  }
  return cleanText.substring(0, 180).trim() + '...';
}

// =============================================
// Admin Control Panel Integration
// =============================================

let adminTriggerCount = 0;
let adminTriggerTimeout = null;
let currentAdminTab = 'projects';
let editingItemId = null; // Stored if editing an item

function getAuthHeader() {
  const token = localStorage.getItem('admin_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// Setup 5-click hidden trigger
function setupAdminTrigger() {
  const trigger = document.getElementById('admin-trigger');
  if (!trigger) return;

  // Prevent multiple bindings
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
      showAdminLogin();
    }
  });
}

function showAdminLogin() {
  if (localStorage.getItem('admin_token')) {
    openAdminDrawer();
    return;
  }

  // Create overlay if not present
  let overlay = document.getElementById('admin-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'admin-overlay';
    overlay.className = 'admin-overlay';
    overlay.innerHTML = `
      <div class="admin-login">
        <h3>Admin Authentication</h3>
        <input type="password" id="admin-pass-input" placeholder="Enter key..." />
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
  document.getElementById('admin-pass-input').value = '';
  document.getElementById('admin-login-error').classList.add('hidden');
  document.getElementById('admin-pass-input').focus();
}

async function handleAdminLoginSubmit() {
  const passInput = document.getElementById('admin-pass-input');
  const errorDiv = document.getElementById('admin-login-error');
  const password = passInput.value.trim();

  if (!password) return;

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
        <h3>Admin Console</h3>
        <button class="admin-close" id="admin-close-btn">&times;</button>
      </div>
      <div class="admin-tabs">
        <button class="admin-tab active" data-tab="projects">Projects</button>
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
      tab.addEventListener('click', (e) => {
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

// Render active tab inside drawer
async function renderAdminTab() {
  const pane = document.getElementById('admin-content-pane');
  if (!pane) return;

  pane.innerHTML = '<div class="loading-spinner"></div>';

  try {
    if (currentAdminTab === 'projects') {
      const res = await fetch('/api/projects');
      const projects = await res.json();
      renderProjectsTab(pane, projects);
    } else if (currentAdminTab === 'posts') {
      const res = await fetch('/api/posts');
      const posts = await res.json();
      renderPostsTab(pane, posts);
    } else if (currentAdminTab === 'links') {
      const res = await fetch('/api/links');
      const links = await res.json();
      renderLinksTab(pane, links);
    }
  } catch (err) {
    pane.innerHTML = `<div class="empty-state">Failed to load: ${err.message}</div>`;
  }
}

// --- Tab Specific Renderers ---

function renderProjectsTab(pane, items) {
  pane.innerHTML = `
    <form class="admin-form" id="project-form">
      <h4 style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent); margin-bottom:12px;">
        ${editingItemId ? 'Edit Project' : 'Create Project'}
      </h4>
      
      <label>Project Name</label>
      <input type="text" id="proj-name" required placeholder="e.g. V-NEURON" />

      <label>Status</label>
      <select id="proj-status">
        <option value="Active">Active</option>
        <option value="Shipped">Shipped</option>
        <option value="In-Progress">In-Progress</option>
      </select>

      <label>Tech Tags (Comma separated)</label>
      <input type="text" id="proj-tags" placeholder="e.g. React, Node.js" />

      <label>Live/GitHub URL</label>
      <input type="url" id="proj-url" placeholder="https://..." />

      <div class="admin-form-actions">
        <button type="submit" class="admin-btn primary">Save</button>
        ${editingItemId ? '<button type="button" class="admin-btn cancel" id="proj-cancel">Cancel</button>' : ''}
      </div>
    </form>

    <div class="admin-list">
      <div class="section-label" style="margin-top:20px;">// existing projects</div>
      ${items.map(item => `
        <div class="admin-item">
          <div class="admin-item-info">
            <div class="admin-item-name">${item.name}</div>
            <div class="admin-item-meta">${item.status} | ${item.tech_tags || 'No tags'}</div>
          </div>
          <div class="admin-item-actions">
            <button class="admin-icon-btn edit-item" data-id="${item.id}">✏️</button>
            <button class="admin-icon-btn delete delete-item" data-id="${item.id}">🗑️</button>
          </div>
        </div>
      `).join('')}
    </div>

    <button class="admin-logout-btn" id="admin-logout">Logout / Lock Panel</button>
  `;

  // Pre-fill if editing
  if (editingItemId) {
    const item = items.find(i => i.id == editingItemId);
    if (item) {
      document.getElementById('proj-name').value = item.name || '';
      document.getElementById('proj-status').value = item.status || 'Active';
      document.getElementById('proj-tags').value = item.tech_tags || '';
      document.getElementById('proj-url').value = item.live_url || '';
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
  attachListListeners('projects', items);
}

function renderPostsTab(pane, items) {
  pane.innerHTML = `
    <form class="admin-form" id="post-form">
      <h4 style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent); margin-bottom:12px;">
        ${editingItemId ? 'Edit Post' : 'Create Post'}
      </h4>

      <label>Post Title</label>
      <input type="text" id="post-title" required placeholder="e.g. Systems Deep-Dive" />

      <label>Type</label>
      <select id="post-type">
        <option value="blog">blog</option>
        <option value="log">log</option>
        <option value="photo">photo</option>
      </select>

      <label>Content</label>
      <textarea id="post-content" rows="4" required placeholder="Write content..."></textarea>

      <div class="admin-form-actions">
        <button type="submit" class="admin-btn primary">Save</button>
        ${editingItemId ? '<button type="button" class="admin-btn cancel" id="post-cancel">Cancel</button>' : ''}
      </div>
    </form>

    <div class="admin-list">
      <div class="section-label" style="margin-top:20px;">// existing posts</div>
      ${items.map(item => `
        <div class="admin-item">
          <div class="admin-item-info">
            <div class="admin-item-name">${item.title}</div>
            <div class="admin-item-meta">${item.type} | ${new Date(item.created_at).toLocaleDateString()}</div>
          </div>
          <div class="admin-item-actions">
            <button class="admin-icon-btn edit-item" data-id="${item.id}">✏️</button>
            <button class="admin-icon-btn delete delete-item" data-id="${item.id}">🗑️</button>
          </div>
        </div>
      `).join('')}
    </div>

    <button class="admin-logout-btn" id="admin-logout">Logout / Lock Panel</button>
  `;

  if (editingItemId) {
    const item = items.find(i => i.id == editingItemId);
    if (item) {
      document.getElementById('post-title').value = item.title || '';
      document.getElementById('post-type').value = item.type || 'blog';
      document.getElementById('post-content').value = item.content || '';
    }
  }

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
        ${editingItemId ? 'Edit Link' : 'Create Link'}
      </h4>

      <label>Platform Name</label>
      <input type="text" id="link-platform" required placeholder="e.g. GitHub" />

      <label>URL</label>
      <input type="text" id="link-url" required placeholder="e.g. https://github.com/..." />

      <label>Category</label>
      <select id="link-category">
        <option value="social">social</option>
        <option value="internal">internal</option>
      </select>

      <div class="admin-form-actions">
        <button type="submit" class="admin-btn primary">Save</button>
        ${editingItemId ? '<button type="button" class="admin-btn cancel" id="link-cancel">Cancel</button>' : ''}
      </div>
    </form>

    <div class="admin-list">
      <div class="section-label" style="margin-top:20px;">// existing links</div>
      ${items.map(item => `
        <div class="admin-item">
          <div class="admin-item-info">
            <div class="admin-item-name">${item.platform}</div>
            <div class="admin-item-meta">${item.category} | ${item.url}</div>
          </div>
          <div class="admin-item-actions">
            <button class="admin-icon-btn edit-item" data-id="${item.id}">✏️</button>
            <button class="admin-icon-btn delete delete-item" data-id="${item.id}">🗑️</button>
          </div>
        </div>
      `).join('')}
    </div>

    <button class="admin-logout-btn" id="admin-logout">Logout / Lock Panel</button>
  `;

  if (editingItemId) {
    const item = items.find(i => i.id == editingItemId);
    if (item) {
      document.getElementById('link-platform').value = item.platform || '';
      document.getElementById('link-url').value = item.url || '';
      document.getElementById('link-category').value = item.category || 'social';
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

        if (res.ok) {
          editingItemId = null;
          renderAdminTab();
          refreshMainSiteContent();
        } else {
          alert('Failed to delete item.');
        }
      } catch (err) {
        alert('Server error.');
      }
    });
  });

  document.getElementById('admin-logout').addEventListener('click', () => {
    localStorage.removeItem('admin_token');
    closeAdminDrawer();
    const fab = document.getElementById('admin-fab');
    if (fab) fab.classList.add('hidden');
  });
}

// --- Submit Handlers ---

async function handleProjectSubmit(e) {
  e.preventDefault();
  const body = {
    name: document.getElementById('proj-name').value.trim(),
    status: document.getElementById('proj-status').value,
    tech_tags: document.getElementById('proj-tags').value.trim(),
    live_url: document.getElementById('proj-url').value.trim()
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

    if (res.ok) {
      editingItemId = null;
      renderAdminTab();
      refreshMainSiteContent();
    } else {
      const errData = await res.json();
      alert(`Error saving: ${errData.error || 'Server rejected request'}`);
    }
  } catch (err) {
    alert('Network error saving project.');
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

    if (res.ok) {
      editingItemId = null;
      renderAdminTab();
      refreshMainSiteContent();
    } else {
      const errData = await res.json();
      alert(`Error saving: ${errData.error || 'Server rejected request'}`);
    }
  } catch (err) {
    alert('Network error saving post.');
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

    if (res.ok) {
      editingItemId = null;
      renderAdminTab();
      refreshMainSiteContent();
    } else {
      const errData = await res.json();
      alert(`Error saving: ${errData.error || 'Server rejected request'}`);
    }
  } catch (err) {
    alert('Network error saving link.');
  }
}

// Refresh the background page content immediately if present
function refreshMainSiteContent() {
  const path = window.location.pathname;
  const initFunc = routes[path];
  if (initFunc) initFunc();
}

// DOM Setup
window.addEventListener('DOMContentLoaded', () => {
  setupAdminTrigger();
  if (localStorage.getItem('admin_token')) {
    initAdminPanel();
  }
});

// --- Interactive Electric Spark Mouse Trail ---
(() => {
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

  function loop() {
    ctx.clearRect(0, 0, width, height);
    ctx.shadowBlur = 0;

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw();
      if (p.life >= p.maxLife) {
        particles.splice(i, 1);
      }
    }

    if (particles.length > 0) {
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
    const x = e.clientX;
    const y = e.clientY;

    // Spawn 1-2 default cursor sparks
    spawnSparks(x, y, Math.floor(Math.random() * 2) + 1);

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
})();
