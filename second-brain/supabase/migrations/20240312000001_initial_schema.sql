-- Initial schema for Second Brain
-- Run this in Supabase SQL Editor or via: supabase db push

-- Enums
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high');
CREATE TYPE task_status AS ENUM ('todo', 'done');
CREATE TYPE project_status AS ENUM ('planning', 'ongoing', 'done');
CREATE TYPE reference_type AS ENUM ('link', 'file', 'quote');
CREATE TYPE book_status AS ENUM ('to_read', 'reading', 'done');
CREATE TYPE book_note_type AS ENUM ('chapter', 'page', 'umum');
CREATE TYPE link_target_type AS ENUM ('task', 'project', 'reference', 'book');

-- Projects (parent for tasks, has user_id)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status project_status NOT NULL DEFAULT 'planning',
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tasks
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  priority task_priority NOT NULL DEFAULT 'medium',
  status task_status NOT NULL DEFAULT 'todo',
  recurring TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Project notes
CREATE TABLE project_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Reference items (avoid reserved word "references")
CREATE TABLE reference_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type reference_type NOT NULL,
  url TEXT,
  file_path TEXT,
  quote_text TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Books
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  penulis TEXT,
  status_baca book_status NOT NULL DEFAULT 'to_read',
  rating SMALLINT CHECK (rating >= 1 AND rating <= 5),
  finished_at DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Book notes
CREATE TABLE book_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  jenis book_note_type NOT NULL DEFAULT 'umum',
  ref TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Book quotes
CREATE TABLE book_quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  teks_kutipan TEXT NOT NULL,
  halaman TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tags (global per user)
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  UNIQUE(user_id, name)
);

-- Tag assignments (polymorphic)
CREATE TABLE tag_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  target_type link_target_type NOT NULL,
  target_id UUID NOT NULL,
  UNIQUE(tag_id, target_type, target_id)
);

-- Links between entities
CREATE TABLE links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  source_type link_target_type NOT NULL,
  source_id UUID NOT NULL,
  target_type link_target_type NOT NULL,
  target_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (source_type != target_type OR source_id != target_id)
);

-- Indexes for search and filters
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_reference_items_user_id ON reference_items(user_id);
CREATE INDEX idx_reference_items_type ON reference_items(type);
CREATE INDEX idx_books_user_id ON books(user_id);
CREATE INDEX idx_books_status_baca ON books(status_baca);
CREATE INDEX idx_tags_user_id ON tags(user_id);
CREATE INDEX idx_tag_assignments_target ON tag_assignments(target_type, target_id);
CREATE INDEX idx_links_user_source ON links(user_id, source_type, source_id);
CREATE INDEX idx_links_user_target ON links(user_id, target_type, target_id);
