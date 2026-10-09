-- =============================================
-- Migration 0004: Inquiries Table for Contact Messages
-- =============================================

CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  attachment_name TEXT DEFAULT '',
  attachment_type TEXT DEFAULT '',
  attachment_size INTEGER DEFAULT 0,
  attachment_data TEXT DEFAULT '',
  status TEXT DEFAULT 'unread',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
