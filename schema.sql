-- =============================================
-- project-sun D1 Schema
-- "Digital Empire" — Full Schema + Seed Data
-- =============================================

-- Projects Table
DROP TABLE IF EXISTS projects;
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  status TEXT NOT NULL,
  category TEXT DEFAULT '',
  summary TEXT DEFAULT '',
  tech_tags TEXT DEFAULT '',
  live_url TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  action_label TEXT DEFAULT '',
  action_url TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  pinned INTEGER DEFAULT 0
);

-- Seed: Projects
INSERT INTO projects (name, status, category, summary, tech_tags, live_url, image_url, action_label, action_url, sort_order, pinned) VALUES
  ('V-NEURON', 'Shipped', 'URBAN MOBILITY', 'A multimodal routing console for Nagpur, bringing roads, metro, and walking legs into one journey.', 'React,Node.js,Leaflet,Multimodal Routing', 'https://github.com/Suraj-8300', '/vneuron/preview.webp', 'Explore the live map', '/vneuron', 0, 1),
  ('Project Sun', 'Active', 'EDGE SOFTWARE', 'A personal publishing system built on Cloudflare Workers and D1, with a private content console.', 'Cloudflare Workers,D1,TypeScript,Edge Computing', 'https://suraj.shinelikesun.workers.dev', '', 'Visit the live site', 'https://suraj.shinelikesun.workers.dev', 1, 0),
  ('CodeAudit AI', 'Active', 'DEVELOPER TOOLS', 'An exploration of AI-assisted code review, combining language models with structure-aware analysis.', 'Python,LLM,AST,Static Analysis', 'https://github.com/Suraj-8300', '', 'View on GitHub', 'https://github.com/Suraj-8300', 2, 0),
  ('LoadMaster RL', 'In-Progress', 'REINFORCEMENT LEARNING', 'A reinforcement-learning project exploring adaptive load management and decision-making.', 'Python,OpenAI Gym,Reinforcement Learning,Docker', 'https://github.com/Suraj-8300', '', 'View on GitHub', 'https://github.com/Suraj-8300', 3, 0);

-- Links Table
DROP TABLE IF EXISTS links;
CREATE TABLE links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT NOT NULL
);

-- Seed: Links
INSERT INTO links (platform, url, category) VALUES
  ('GitHub', 'https://github.com/Suraj-8300', 'social'),
  ('LinkedIn', 'https://linkedin.com/in/surajdhere8300', 'social'),
  ('LeetCode', 'https://leetcode.com/u/495WgJjGMt/', 'social'),
  ('X', 'https://x.com/SURAJDHERE144', 'social'),
  ('Instagram', '/instagram', 'social'),
  ('Gmail', 'mailto:surajdhere8300@gmail.com', 'social'),
  ('Portfolio', '/portfolio', 'internal'),
  ('Personal', '/personal', 'internal');

-- Posts Table
DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed: Posts
INSERT INTO posts (title, content, type, created_at) VALUES
  ('Welcome to my Personal Hub!',
   'This hub is built on Cloudflare Workers, TypeScript, and D1. Everything is served from the edge — globally distributed, lightning-fast, zero cold starts.',
   'blog', '2026-06-28 10:00:00'),
  ('Systems Programming Deep-Dive',
   'Exploring Rust, assembly, and low-level optimization. Building performant applications on WebAssembly and serverless runtimes. The edge is the new frontier.',
   'blog', '2026-06-29 14:30:00'),
  ('Day 1: Shipped the Empire',
   'Finally deployed project-sun. The neo-brutalist aesthetic is alive. Art student energy meets terminal precision. Feeling good about this one.',
   'log', '2026-06-30 09:00:00'),
  ('CodeAudit AI Architecture',
   'An overview of CodeAudit AI — leveraging LLMs and AST parsing to perform static analysis and detect bugs automatically. The future of code review is automated.',
   'blog', '2026-06-27 16:00:00'),
  ('Building D1 on the Edge',
   'A deep dive into D1 database patterns — read replicas, parameterized queries, and caching strategies for ultra low latency data access at the edge.',
   'blog', '2026-06-26 11:00:00');

-- Site profile settings
DROP TABLE IF EXISTS site_settings;
CREATE TABLE site_settings (
  setting_key TEXT PRIMARY KEY,
  setting_value TEXT NOT NULL
);

INSERT INTO site_settings (setting_key, setting_value) VALUES
  ('display_name', 'Suraj Dhere'),
  ('role', 'Software engineer & AI developer'),
  ('intro', 'I build practical machine-learning tools and thoughtful software, from low-level foundations to systems running at the edge.'),
  ('location', 'Nagpur, India'),
  ('about_statement', 'I like taking a complicated idea, finding its useful shape, and building the system that makes it real.'),
  ('about_detail', 'I’m a software engineer and AI developer based in Nagpur. My work moves between machine learning, backend architecture, and interfaces people can actually use. I care about clear trade-offs, resilient foundations, and shipping work that keeps improving.'),
  ('skills', 'Python, C++, TypeScript, Machine learning, Cloudflare Workers, D1 / SQLite, React, Leaflet'),
  ('curiosities', 'Machine learning, Cloud architecture, Useful interfaces'),
  ('contact_email', 'surajdhere8300@gmail.com'),
  ('contact_coordinate', '21.1458° N / 79.0882° E');
