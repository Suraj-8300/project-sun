export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // --- API ROUTES ---

    // GET /api/projects
    if (request.method === 'GET' && url.pathname === '/api/projects') {
      try {
        const { results } = await env.SUNDB.prepare('SELECT * FROM projects').all();
        return new Response(JSON.stringify(results), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // POST /api/projects
    if (request.method === 'POST' && url.pathname === '/api/projects') {
      try {
        const newProject = (await request.json()) as { name: string; status: string };
        if (!newProject.name || !newProject.status) {
          return new Response(JSON.stringify({ error: 'Missing name or status' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        await env.SUNDB.prepare('INSERT INTO projects (name, status) VALUES (?, ?)')
          .bind(newProject.name, newProject.status)
          .run();
        return new Response(JSON.stringify({ success: true }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // GET /api/links
    if (request.method === 'GET' && url.pathname === '/api/links') {
      try {
        const { results } = await env.SUNDB.prepare('SELECT * FROM links').all();
        return new Response(JSON.stringify(results), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // GET /api/posts
    if (request.method === 'GET' && url.pathname === '/api/posts') {
      try {
        const type = url.searchParams.get('type');
        let query = 'SELECT * FROM posts';
        const params: any[] = [];
        if (type) {
          query += ' WHERE type = ?';
          params.push(type);
        }
        const { results } = await env.SUNDB.prepare(query).bind(...params).all();
        return new Response(JSON.stringify(results), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // --- HTML / PAGE ROUTING ---

    // Serve HTML assets on direct page hits
    if (request.method === 'GET') {
      if (url.pathname === '/') {
        return env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
      }
      if (url.pathname === '/portfolio') {
        return env.ASSETS.fetch(new Request(new URL('/portfolio.html', request.url), request));
      }
      if (url.pathname === '/personal') {
        return env.ASSETS.fetch(new Request(new URL('/personal.html', request.url), request));
      }
    }

    // --- STATIC ASSETS PASS-THROUGH ---
    // Fetch and return the static assets from the asset binding (e.g. style.css, script files)
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) {
      return response;
    }

    return new Response('Not Found', { status: 404 });
  },
} satisfies ExportedHandler<Env>;