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
  tech_tags TEXT DEFAULT '',
  live_url TEXT DEFAULT ''
);

-- Seed: Projects
INSERT INTO projects (name, status, tech_tags, live_url) VALUES
  ('CodeAudit AI', 'Active', 'Python,LLM,AST,Static Analysis', 'https://github.com/Suraj-8300'),
  ('V-NEURON', 'Shipped', 'React,Node.js,Leaflet,Multimodal Routing', 'https://github.com/Suraj-8300'),
  ('Project Sun', 'Active', 'Cloudflare Workers,D1,TypeScript,Edge Computing', 'https://suraj.shinelikesun.workers.dev'),
  ('LoadMaster RL', 'In-Progress', 'Python,OpenAI Gym,Reinforcement Learning,Docker', 'https://github.com/Suraj-8300');

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
