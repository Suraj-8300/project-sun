DROP TABLE IF EXISTS projects;
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  status TEXT NOT NULL
);

-- Pre-fill it with your projects
INSERT INTO projects (name, status) VALUES ('CodeAudit AI', 'Active');
INSERT INTO projects (name, status) VALUES ('V-NEURON', 'In-Progress');
