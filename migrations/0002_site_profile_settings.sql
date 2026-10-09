CREATE TABLE IF NOT EXISTS site_settings (
  setting_key TEXT PRIMARY KEY,
  setting_value TEXT NOT NULL
);

INSERT OR IGNORE INTO site_settings (setting_key, setting_value) VALUES
  ('display_name', 'Suraj Dhere'),
  ('role', 'Software engineer & AI developer'),
  ('intro', 'I build practical machine-learning tools and thoughtful software, from low-level foundations to systems running at the edge.'),
  ('location', 'Nagpur, India');