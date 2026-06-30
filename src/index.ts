export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // GET: List all projects
    if (request.method === 'GET' && url.pathname === '/api/projects') {
      const { results } = await env.SUNDB.prepare('SELECT * FROM projects').all();
      return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } });
    }

    // POST: Add a new project
    if (request.method === 'POST' && url.pathname === '/api/projects') {
      const newProject = await request.json(); // Read the JSON from the browser
      await env.SUNDB.prepare('INSERT INTO projects (name, status) VALUES (?, ?)')
        .bind(newProject.name, newProject.status)
        .run();
      
      return new Response(JSON.stringify({ success: true }), { status: 201 });
    }

    return new Response('Not Found', { status: 404 });
  },
} satisfies ExportedHandler<Env>;