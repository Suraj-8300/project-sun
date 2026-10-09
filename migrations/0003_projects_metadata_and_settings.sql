-- =============================================
-- Migration 0003: Project Metadata & Extended Site Settings
-- =============================================

-- Add metadata columns to projects table
ALTER TABLE projects ADD COLUMN category TEXT DEFAULT '';
ALTER TABLE projects ADD COLUMN summary TEXT DEFAULT '';
ALTER TABLE projects ADD COLUMN image_url TEXT DEFAULT '';
ALTER TABLE projects ADD COLUMN action_label TEXT DEFAULT '';
ALTER TABLE projects ADD COLUMN action_url TEXT DEFAULT '';

-- Seed metadata for existing projects
UPDATE projects SET 
  category = 'URBAN MOBILITY',
  summary = 'A multimodal routing console for Nagpur, bringing roads, metro, and walking legs into one journey.',
  image_url = '/projects/vneuron/preview.webp',
  action_label = 'Explore the live map',
  action_url = '/vneuron'
WHERE name = 'V-NEURON';

UPDATE projects SET 
  category = 'EDGE SOFTWARE',
  summary = 'A personal publishing system built on Cloudflare Workers and D1, with a private content console.',
  action_label = 'Visit the live site',
  action_url = 'https://suraj.shinelikesun.workers.dev'
WHERE name = 'Project Sun';

UPDATE projects SET 
  category = 'DEVELOPER TOOLS',
  summary = 'An exploration of AI-assisted code review, combining language models with structure-aware analysis.',
  action_label = 'View on GitHub',
  action_url = 'https://github.com/Suraj-8300'
WHERE name = 'CodeAudit AI';

UPDATE projects SET 
  category = 'REINFORCEMENT LEARNING',
  summary = 'A reinforcement-learning project exploring adaptive load management and decision-making.',
  action_label = 'View on GitHub',
  action_url = 'https://github.com/Suraj-8300'
WHERE name = 'LoadMaster RL';

-- Seed extended site profile settings
INSERT OR IGNORE INTO site_settings (setting_key, setting_value) VALUES
  ('about_statement', 'I like taking a complicated idea, finding its useful shape, and building the system that makes it real.'),
  ('about_detail', 'I’m a software engineer and AI developer based in Nagpur. My work moves between machine learning, backend architecture, and interfaces people can actually use. I care about clear trade-offs, resilient foundations, and shipping work that keeps improving.'),
  ('skills', 'Python, C++, TypeScript, Machine learning, Cloudflare Workers, D1 / SQLite, React, Leaflet'),
  ('curiosities', 'Machine learning, Cloud architecture, Useful interfaces'),
  ('contact_email', 'surajdhere8300@gmail.com'),
  ('contact_coordinate', '21.1458° N / 79.0882° E');

