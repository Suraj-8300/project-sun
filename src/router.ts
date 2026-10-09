// src/router.ts — Request Router
// Evaluates method + pathname and delegates to the appropriate handler

import {
  authenticate,
  getProjects, createProject, updateProject, deleteProject, reorderProjects,
  getPosts, createPost, updatePost, deletePost,
  getLinks, createLink, updateLink, deleteLink,
  getSiteSettings, updateSiteSettings,
  getAdminStats,
} from './api';

const PAGE_ROUTES: Record<string, string> = {
  '/': '/index.html',
  '/admin': '/index.html',
  '/portfolio': '/portfolio.html',
  '/personal': '/personal.html',
  '/instagram': '/instagram.html',
  '/vneuron': '/projects/vneuron/index.html',
  '/projects/vneuron': '/projects/vneuron/index.html',
};

// Extract ID from paths like /api/projects/5
function extractId(pathname: string, base: string): string | null {
  if (!pathname.startsWith(base + '/')) return null;
  const id = pathname.slice(base.length + 1);
  return /^\d+$/.test(id) ? id : null;
}

export async function handleRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const { pathname } = url;
  const method = request.method;

  // CORS preflight
  if (method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      },
    });
  }

  // --- AUTH & STATS ---
  if (pathname === '/api/auth' && method === 'POST') {
    return authenticate(request, env);
  }

  if (pathname === '/api/admin/stats' && method === 'GET') {
    return getAdminStats(request, env);
  }

  if (pathname === '/api/settings') {
    if (method === 'GET') return getSiteSettings(env);
    if (method === 'PUT') return updateSiteSettings(request, env);
  }

  // --- PROJECTS ---
  if (pathname === '/api/projects/reorder' && method === 'POST') {
    return reorderProjects(request, env);
  }
  if (pathname === '/api/projects') {
    if (method === 'GET') return getProjects(env);
    if (method === 'POST') return createProject(request, env);
  }
  const projectId = extractId(pathname, '/api/projects');
  if (projectId) {
    if (method === 'PUT') return updateProject(request, env, projectId);
    if (method === 'DELETE') return deleteProject(env, projectId, request);
  }

  // --- POSTS ---
  if (pathname === '/api/posts') {
    if (method === 'GET') return getPosts(url, env);
    if (method === 'POST') return createPost(request, env);
  }
  const postId = extractId(pathname, '/api/posts');
  if (postId) {
    if (method === 'PUT') return updatePost(request, env, postId);
    if (method === 'DELETE') return deletePost(env, postId, request);
  }

  // --- LINKS ---
  if (pathname === '/api/links') {
    if (method === 'GET') return getLinks(env);
    if (method === 'POST') return createLink(request, env);
  }
  const linkId = extractId(pathname, '/api/links');
  if (linkId) {
    if (method === 'PUT') return updateLink(request, env, linkId);
    if (method === 'DELETE') return deleteLink(env, linkId, request);
  }

  // --- HTML PAGE ROUTING ---
  if (method === 'GET') {
    const assetPath = PAGE_ROUTES[pathname];
    if (assetPath) {
      return env.ASSETS.fetch(new URL(assetPath, request.url).toString());
    }

    // Dynamic project route match: /projects/:slug -> /projects/:slug/index.html
    const projectMatch = pathname.match(/^\/projects\/([a-zA-Z0-9_-]+)\/?$/);
    if (projectMatch) {
      return env.ASSETS.fetch(new URL(`/projects/${projectMatch[1]}/index.html`, request.url).toString());
    }
  }

  // --- STATIC ASSETS ---
  const assetResponse = await env.ASSETS.fetch(request);
  if (assetResponse.status !== 404) return assetResponse;

  return new Response('Not Found', { status: 404 });
}
