// src/router.ts — Request Router
// Evaluates method + pathname and delegates to the appropriate handler

import { getProjects, createProject, getLinks, getPosts, createPost } from './api';

// Page routes map clean URLs to static HTML assets
const PAGE_ROUTES: Record<string, string> = {
  '/': '/index.html',
  '/portfolio': '/portfolio.html',
  '/personal': '/personal.html',
  '/instagram': '/instagram.html',
};

export async function handleRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const { pathname } = url;
  const method = request.method;

  // --- API ROUTES ---

  if (pathname === '/api/projects') {
    if (method === 'GET') return getProjects(env);
    if (method === 'POST') return createProject(request, env);
  }

  if (pathname === '/api/links' && method === 'GET') {
    return getLinks(env);
  }

  if (pathname === '/api/posts') {
    if (method === 'GET') return getPosts(url, env);
    if (method === 'POST') return createPost(request, env);
  }

  // --- HTML PAGE ROUTING ---

  if (method === 'GET') {
    const assetPath = PAGE_ROUTES[pathname];
    if (assetPath) {
      return env.ASSETS.fetch(new URL(assetPath, request.url).toString());
    }
  }

  // --- STATIC ASSETS PASS-THROUGH ---
  // Let the ASSETS binding handle CSS, JS, images, etc.
  const assetResponse = await env.ASSETS.fetch(request);
  if (assetResponse.status !== 404) {
    return assetResponse;
  }

  return new Response('Not Found', { status: 404 });
}
