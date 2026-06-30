// src/api.ts — D1 Database Controllers
// All SQL operations against env.SUNDB with parameterized queries

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function error(message: string, status = 500): Response {
  return json({ error: message }, status);
}

// GET /api/projects
export async function getProjects(env: Env): Promise<Response> {
  try {
    const { results } = await env.SUNDB.prepare(
      'SELECT * FROM projects ORDER BY id DESC'
    ).all();
    return json(results);
  } catch (e: any) {
    return error(e.message);
  }
}

// POST /api/projects
export async function createProject(request: Request, env: Env): Promise<Response> {
  try {
    const body = (await request.json()) as {
      name: string;
      status: string;
      tech_tags?: string;
      live_url?: string;
    };
    if (!body.name || !body.status) {
      return error('Missing required fields: name, status', 400);
    }
    await env.SUNDB.prepare(
      'INSERT INTO projects (name, status, tech_tags, live_url) VALUES (?, ?, ?, ?)'
    )
      .bind(body.name, body.status, body.tech_tags || '', body.live_url || '')
      .run();
    return json({ success: true }, 201);
  } catch (e: any) {
    return error(e.message);
  }
}

// GET /api/links
export async function getLinks(env: Env): Promise<Response> {
  try {
    const { results } = await env.SUNDB.prepare(
      'SELECT * FROM links ORDER BY id ASC'
    ).all();
    return json(results);
  } catch (e: any) {
    return error(e.message);
  }
}

// GET /api/posts — optional ?type= filter
export async function getPosts(url: URL, env: Env): Promise<Response> {
  try {
    const type = url.searchParams.get('type');
    let query = 'SELECT * FROM posts';
    const params: string[] = [];
    if (type) {
      query += ' WHERE type = ?';
      params.push(type);
    }
    query += ' ORDER BY created_at DESC';
    const { results } = await env.SUNDB.prepare(query).bind(...params).all();
    return json(results);
  } catch (e: any) {
    return error(e.message);
  }
}

// POST /api/posts
export async function createPost(request: Request, env: Env): Promise<Response> {
  try {
    const body = (await request.json()) as {
      title: string;
      content: string;
      type: string;
    };
    if (!body.title || !body.content || !body.type) {
      return error('Missing required fields: title, content, type', 400);
    }
    await env.SUNDB.prepare(
      'INSERT INTO posts (title, content, type) VALUES (?, ?, ?)'
    )
      .bind(body.title, body.content, body.type)
      .run();
    return json({ success: true }, 201);
  } catch (e: any) {
    return error(e.message);
  }
}
