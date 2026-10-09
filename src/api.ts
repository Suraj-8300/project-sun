// src/api.ts — D1 Database Controllers
// All SQL operations with parameterized .bind() queries
// Mutation endpoints require admin authentication

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

function error(message: string, status = 500): Response {
  return json({ error: message }, status);
}

// --- Auth ---

export function checkAuth(request: Request, env: Env): boolean {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.slice(7);
  return token === env.ADMIN_KEY;
}

export async function authenticate(request: Request, env: Env): Promise<Response> {
  try {
    const body = (await request.json()) as { password: string };
    if (body.password === env.ADMIN_KEY) {
      return json({ authenticated: true });
    }
    return error('Invalid credentials', 401);
  } catch {
    return error('Invalid request body', 400);
  }
}

const DEFAULT_SITE_SETTINGS = {
  display_name: 'Suraj Dhere',
  role: 'Software engineer & AI developer',
  intro: 'I build practical machine-learning tools and thoughtful software, from low-level foundations to systems running at the edge.',
  location: 'Nagpur, India',
};

export async function getSiteSettings(env: Env): Promise<Response> {
  try {
    const { results } = await env.SUNDB.prepare(
      'SELECT setting_key, setting_value FROM site_settings'
    ).all<{ setting_key: string; setting_value: string }>();
    const settings = { ...DEFAULT_SITE_SETTINGS };

    for (const row of results) {
      if (Object.hasOwn(settings, row.setting_key)) {
        settings[row.setting_key as keyof typeof settings] = row.setting_value;
      }
    }

    return json(settings);
  } catch (e: any) {
    return error(e.message);
  }
}

export async function updateSiteSettings(request: Request, env: Env): Promise<Response> {
  if (!checkAuth(request, env)) return error('Unauthorized', 401);

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const limits: Record<keyof typeof DEFAULT_SITE_SETTINGS, number> = {
      display_name: 80,
      role: 100,
      intro: 320,
      location: 100,
    };
    const updates = Object.entries(limits).flatMap(([key, maxLength]) => {
      const value = body[key];
      if (typeof value !== 'string') return [];
      const settingValue = value.trim();
      if (!settingValue || settingValue.length > maxLength) return [];
      return [{ key, value: settingValue }];
    });

    if (updates.length !== Object.keys(DEFAULT_SITE_SETTINGS).length) {
      return error('Please provide valid values for every profile field', 400);
    }

    await env.SUNDB.batch(updates.map(({ key, value }) =>
      env.SUNDB.prepare(
        'INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON CONFLICT(setting_key) DO UPDATE SET setting_value = excluded.setting_value'
      ).bind(key, value)
    ));

    return json({ success: true });
  } catch (e: any) {
    return error(e.message);
  }
}

// --- Projects ---

export async function getProjects(env: Env): Promise<Response> {
  try {
    const { results } = await env.SUNDB.prepare('SELECT * FROM projects ORDER BY pinned DESC, sort_order ASC, id DESC').all();
    return json(results);
  } catch (e: any) {
    return error(e.message);
  }
}

export async function createProject(request: Request, env: Env): Promise<Response> {
  if (!checkAuth(request, env)) return error('Unauthorized', 401);
  try {
    const body = (await request.json()) as {
      name: string;
      status: string;
      tech_tags?: string;
      live_url?: string;
      sort_order?: number;
      pinned?: number;
    };
    if (!body.name || !body.status) return error('Missing name or status', 400);
    await env.SUNDB.prepare('INSERT INTO projects (name, status, tech_tags, live_url, sort_order, pinned) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(
        body.name,
        body.status,
        body.tech_tags || '',
        body.live_url || '',
        body.sort_order !== undefined ? body.sort_order : 0,
        body.pinned !== undefined ? body.pinned : 0
      )
      .run();
    return json({ success: true }, 201);
  } catch (e: any) {
    return error(e.message);
  }
}

export async function updateProject(request: Request, env: Env, id: string): Promise<Response> {
  if (!checkAuth(request, env)) return error('Unauthorized', 401);
  try {
    const body = (await request.json()) as {
      name: string;
      status: string;
      tech_tags?: string;
      live_url?: string;
      sort_order?: number;
      pinned?: number;
    };
    if (!body.name || !body.status) return error('Missing name or status', 400);
    await env.SUNDB.prepare('UPDATE projects SET name=?, status=?, tech_tags=?, live_url=?, sort_order=?, pinned=? WHERE id=?')
      .bind(
        body.name,
        body.status,
        body.tech_tags || '',
        body.live_url || '',
        body.sort_order !== undefined ? body.sort_order : 0,
        body.pinned !== undefined ? body.pinned : 0,
        id
      )
      .run();
    return json({ success: true });
  } catch (e: any) {
    return error(e.message);
  }
}

export async function reorderProjects(request: Request, env: Env): Promise<Response> {
  if (!checkAuth(request, env)) return error('Unauthorized', 401);
  try {
    const body = (await request.json()) as { ids: number[] };
    if (!body.ids || !Array.isArray(body.ids)) return error('Missing or invalid ids list', 400);

    // Create batch statements to update sort_order for each project sequentially
    const statements = body.ids.map((id, index) => {
      return env.SUNDB.prepare('UPDATE projects SET sort_order = ? WHERE id = ?').bind(index, id);
    });

    await env.SUNDB.batch(statements);
    return json({ success: true });
  } catch (e: any) {
    return error(e.message);
  }
}

export async function deleteProject(env: Env, id: string, request: Request): Promise<Response> {
  if (!checkAuth(request, env)) return error('Unauthorized', 401);
  try {
    await env.SUNDB.prepare('DELETE FROM projects WHERE id=?').bind(id).run();
    return json({ success: true });
  } catch (e: any) {
    return error(e.message);
  }
}

// --- Posts ---

export async function getPosts(url: URL, env: Env): Promise<Response> {
  try {
    const type = url.searchParams.get('type');
    let query = 'SELECT * FROM posts';
    const params: string[] = [];
    if (type) { query += ' WHERE type = ?'; params.push(type); }
    query += ' ORDER BY created_at DESC';
    const { results } = await env.SUNDB.prepare(query).bind(...params).all();
    return json(results);
  } catch (e: any) {
    return error(e.message);
  }
}

export async function createPost(request: Request, env: Env): Promise<Response> {
  if (!checkAuth(request, env)) return error('Unauthorized', 401);
  try {
    const body = (await request.json()) as { title: string; content: string; type: string };
    if (!body.title || !body.content || !body.type) return error('Missing title, content, or type', 400);
    await env.SUNDB.prepare('INSERT INTO posts (title, content, type) VALUES (?, ?, ?)')
      .bind(body.title, body.content, body.type)
      .run();
    return json({ success: true }, 201);
  } catch (e: any) {
    return error(e.message);
  }
}

export async function updatePost(request: Request, env: Env, id: string): Promise<Response> {
  if (!checkAuth(request, env)) return error('Unauthorized', 401);
  try {
    const body = (await request.json()) as { title: string; content: string; type: string };
    if (!body.title || !body.content || !body.type) return error('Missing title, content, or type', 400);
    await env.SUNDB.prepare('UPDATE posts SET title=?, content=?, type=? WHERE id=?')
      .bind(body.title, body.content, body.type, id)
      .run();
    return json({ success: true });
  } catch (e: any) {
    return error(e.message);
  }
}

export async function deletePost(env: Env, id: string, request: Request): Promise<Response> {
  if (!checkAuth(request, env)) return error('Unauthorized', 401);
  try {
    await env.SUNDB.prepare('DELETE FROM posts WHERE id=?').bind(id).run();
    return json({ success: true });
  } catch (e: any) {
    return error(e.message);
  }
}

// --- Links ---

export async function getLinks(env: Env): Promise<Response> {
  try {
    const { results } = await env.SUNDB.prepare('SELECT * FROM links ORDER BY id ASC').all();
    return json(results);
  } catch (e: any) {
    return error(e.message);
  }
}

export async function createLink(request: Request, env: Env): Promise<Response> {
  if (!checkAuth(request, env)) return error('Unauthorized', 401);
  try {
    const body = (await request.json()) as { platform: string; url: string; category: string };
    if (!body.platform || !body.url || !body.category) return error('Missing platform, url, or category', 400);
    await env.SUNDB.prepare('INSERT INTO links (platform, url, category) VALUES (?, ?, ?)')
      .bind(body.platform, body.url, body.category)
      .run();
    return json({ success: true }, 201);
  } catch (e: any) {
    return error(e.message);
  }
}

export async function updateLink(request: Request, env: Env, id: string): Promise<Response> {
  if (!checkAuth(request, env)) return error('Unauthorized', 401);
  try {
    const body = (await request.json()) as { platform: string; url: string; category: string };
    if (!body.platform || !body.url || !body.category) return error('Missing platform, url, or category', 400);
    await env.SUNDB.prepare('UPDATE links SET platform=?, url=?, category=? WHERE id=?')
      .bind(body.platform, body.url, body.category, id)
      .run();
    return json({ success: true });
  } catch (e: any) {
    return error(e.message);
  }
}

export async function deleteLink(env: Env, id: string, request: Request): Promise<Response> {
  if (!checkAuth(request, env)) return error('Unauthorized', 401);
  try {
    await env.SUNDB.prepare('DELETE FROM links WHERE id=?').bind(id).run();
    return json({ success: true });
  } catch (e: any) {
    return error(e.message);
  }
}
