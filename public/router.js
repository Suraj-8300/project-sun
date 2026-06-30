// Router configuration and page initializers
const routes = {
  '/': initHub,
  '/portfolio': initPortfolio,
  '/personal': initPersonal
};

// Global navigation function
async function navigate(path, pushState = true) {
  try {
    const appContent = document.getElementById('app-content');
    if (appContent) {
      appContent.style.opacity = '0.3';
    }

    const response = await fetch(path);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const htmlText = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    // Update document title
    document.title = doc.title;

    // Replace main content container
    const newContent = doc.getElementById('app-content');
    if (appContent && newContent) {
      appContent.innerHTML = newContent.innerHTML;
      appContent.style.opacity = '1';
    }

    // Update navigation active states
    updateActiveNav(path);

    // Push new history state
    if (pushState) {
      history.pushState({ path }, '', path);
    }

    // Run page specific setup
    const initFunc = routes[path];
    if (initFunc) {
      initFunc();
    }
  } catch (error) {
    console.error('Routing navigation failed:', error);
    // Fallback to direct page reload if route fails
    if (pushState) {
      window.location.href = path;
    }
  }
}

// Update the navbar link state
function updateActiveNav(path) {
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Intercept page links clicks
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link) {
    const href = link.getAttribute('href');
    // Intercept internal routes and prevent default reload behavior
    if (href && href.startsWith('/') && !href.startsWith('/api')) {
      e.preventDefault();
      if (window.location.pathname !== href) {
        navigate(href);
      }
    }
  }
});

// Listen for browser forward/back buttons
window.addEventListener('popstate', (e) => {
  const path = window.location.pathname;
  navigate(path, false);
});

// Initialize active page on first load
window.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  updateActiveNav(path);
  const initFunc = routes[path];
  if (initFunc) {
    initFunc();
  }
});

// --- Page Specific Logic ---

// 1. Hub / Linktree-style page initializer
async function initHub() {
  const container = document.getElementById('links-list');
  if (!container) return;

  container.innerHTML = '<div class="loading-spinner"></div>';

  try {
    const response = await fetch('/api/links');
    if (!response.ok) throw new Error('Failed to load links');
    const links = await response.json();

    container.innerHTML = '';

    if (links.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No links found.</p>';
      return;
    }

    // Platform emojis/icons lookup
    const icons = {
      github: '🐙',
      linkedin: '💼',
      twitter: '🐦',
      email: '✉️',
      portfolio: '✨',
      personal: '✍️',
      blog: '📝'
    };

    links.forEach(link => {
      const platformKey = link.platform.toLowerCase();
      const icon = icons[platformKey] || '🔗';

      const a = document.createElement('a');
      a.href = link.url;
      a.className = 'link-card';
      // If it's an external link, open in new tab
      if (link.url.startsWith('http')) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }

      a.innerHTML = `
        <div class="link-content">
          <span class="link-icon">${icon}</span>
          <span class="link-title">${link.platform}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="link-badge">${link.category}</span>
          <span class="link-arrow">→</span>
        </div>
      `;
      container.appendChild(a);
    });
  } catch (error) {
    console.error('Error fetching links:', error);
    container.innerHTML = `<p style="text-align: center; color: #ef4444;">Error loading links: ${error.message}</p>`;
  }
}

// 2. Portfolio page initializer
async function initPortfolio() {
  loadProjects();
  loadWorkPosts();

  // Setup form submission listener if form exists in DOM
  const form = document.getElementById('project-form');
  if (form) {
    // Remove duplicate listeners if navigating multiple times
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    newForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = newForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const newProject = {
        name: document.getElementById('name').value,
        status: document.getElementById('status').value
      };

      try {
        const response = await fetch('/api/projects', {
          method: 'POST',
          body: JSON.stringify(newProject),
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error('Failed to create project');
        
        newForm.reset();
        loadProjects(); // Reload project grid
      } catch (error) {
        console.error('Error adding project:', error);
        alert('Could not add project: ' + error.message);
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
}

async function loadProjects() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  container.innerHTML = '<div class="loading-spinner"></div>';

  try {
    const response = await fetch('/api/projects');
    if (!response.ok) throw new Error('Failed to load projects');
    const projects = await response.json();

    container.innerHTML = '';

    if (projects.length === 0) {
      container.innerHTML = '<p style="color: var(--text-muted); grid-column: span 2; text-align: center;">No projects yet.</p>';
      return;
    }

    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      const statusClass = project.status.toLowerCase() === 'active' ? 'active' : 'in-progress';
      
      card.innerHTML = `
        <div class="project-name">${project.name}</div>
        <div class="project-status">
          <span class="status-dot ${statusClass}"></span>
          <span style="color: var(--text-muted);">${project.status}</span>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    container.innerHTML = `<p style="color: #ef4444; grid-column: span 2;">Error: ${error.message}</p>`;
  }
}

async function loadWorkPosts() {
  const container = document.getElementById('work-posts-list');
  if (!container) return;

  container.innerHTML = '<div class="loading-spinner"></div>';

  try {
    const response = await fetch('/api/posts?type=work');
    if (!response.ok) throw new Error('Failed to load work posts');
    const posts = await response.json();

    container.innerHTML = '';

    if (posts.length === 0) {
      container.innerHTML = '<p style="color: var(--text-muted);">No posts matching category.</p>';
      return;
    }

    posts.forEach(post => {
      const card = document.createElement('article');
      card.className = 'post-card';
      card.innerHTML = `
        <h3 class="post-title">${post.title}</h3>
        <p class="post-content">${post.content}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching work posts:', error);
    container.innerHTML = `<p style="color: #ef4444;">Error: ${error.message}</p>`;
  }
}

// 3. Personal Blog page initializer
async function initPersonal() {
  const container = document.getElementById('personal-posts-list');
  if (!container) return;

  container.innerHTML = '<div class="loading-spinner"></div>';

  try {
    const response = await fetch('/api/posts?type=personal');
    if (!response.ok) throw new Error('Failed to load posts');
    const posts = await response.json();

    container.innerHTML = '';

    if (posts.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No personal posts written yet.</p>';
      return;
    }

    posts.forEach(post => {
      const card = document.createElement('article');
      card.className = 'post-card';
      card.innerHTML = `
        <h3 class="post-title">${post.title}</h3>
        <p class="post-content">${post.content}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching personal posts:', error);
    container.innerHTML = `<p style="text-align: center; color: #ef4444;">Error loading posts: ${error.message}</p>`;
  }
}
