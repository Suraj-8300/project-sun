-- Projects Table (Existing)
DROP TABLE IF EXISTS projects;
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  status TEXT NOT NULL
);

-- Pre-fill projects
INSERT INTO projects (name, status) VALUES ('CodeAudit AI', 'Active');
INSERT INTO projects (name, status) VALUES ('V-NEURON', 'In-Progress');
INSERT INTO projects (name, status) VALUES ('Antigravity', 'Active');

-- Links Table
DROP TABLE IF EXISTS links;
CREATE TABLE links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT NOT NULL
);

-- Pre-fill links
INSERT INTO links (platform, url, category) VALUES ('GitHub', 'https://github.com/Suraj-8300', 'social');
INSERT INTO links (platform, url, category) VALUES ('LinkedIn', 'https://linkedin.com/in/suraj', 'social');
INSERT INTO links (platform, url, category) VALUES ('Twitter', 'https://twitter.com', 'social');
INSERT INTO links (platform, url, category) VALUES ('Email', 'mailto:suraj@example.com', 'contact');
INSERT INTO links (platform, url, category) VALUES ('Portfolio', '/portfolio', 'internal');
INSERT INTO links (platform, url, category) VALUES ('Personal Blog', '/personal', 'internal');

-- Posts Table
DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL
);

-- Pre-fill posts
INSERT INTO posts (title, content, type) VALUES ('Welcome to my Personal Hub!', 'This Hub is built using Cloudflare Workers, TypeScript, and a D1 database. Everything is served from the edge with lightning-fast performance.', 'personal');
INSERT INTO posts (title, content, type) VALUES ('My Journey into Systems Programming', 'Exploring Rust, assembly, and low-level optimization. Building performant applications on top of WebAssembly and serverless runtimes.', 'personal');
INSERT INTO posts (title, content, type) VALUES ('Building scalable database layers', 'A deep dive into how I set up D1, read replicas, and caching strategies for ultra low latency database access on the edge.', 'work');
INSERT INTO posts (title, content, type) VALUES ('CodeAudit AI Architecture', 'An overview of CodeAudit AI - how we leverage LLMs and AST parsing to perform static analysis and detect bugs automatically.', 'work');
