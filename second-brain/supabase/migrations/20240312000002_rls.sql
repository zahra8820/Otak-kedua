-- Row Level Security for Second Brain

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reference_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE tag_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- Projects: user owns
CREATE POLICY "Users can CRUD own projects" ON projects
  FOR ALL USING (auth.uid() = user_id);

-- Tasks: user owns
CREATE POLICY "Users can CRUD own tasks" ON tasks
  FOR ALL USING (auth.uid() = user_id);

-- Project notes: via project ownership
CREATE POLICY "Users can CRUD project notes for own projects" ON project_notes
  FOR ALL USING (
    EXISTS (SELECT 1 FROM projects WHERE projects.id = project_notes.project_id AND projects.user_id = auth.uid())
  );

-- Reference items: user owns
CREATE POLICY "Users can CRUD own reference_items" ON reference_items
  FOR ALL USING (auth.uid() = user_id);

-- Books: user owns
CREATE POLICY "Users can CRUD own books" ON books
  FOR ALL USING (auth.uid() = user_id);

-- Book notes: via book ownership
CREATE POLICY "Users can CRUD book notes for own books" ON book_notes
  FOR ALL USING (
    EXISTS (SELECT 1 FROM books WHERE books.id = book_notes.book_id AND books.user_id = auth.uid())
  );

-- Book quotes: via book ownership
CREATE POLICY "Users can CRUD book quotes for own books" ON book_quotes
  FOR ALL USING (
    EXISTS (SELECT 1 FROM books WHERE books.id = book_quotes.book_id AND books.user_id = auth.uid())
  );

-- Tags: user owns
CREATE POLICY "Users can CRUD own tags" ON tags
  FOR ALL USING (auth.uid() = user_id);

-- Tag assignments: via tag ownership
CREATE POLICY "Users can CRUD tag assignments for own tags" ON tag_assignments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM tags WHERE tags.id = tag_assignments.tag_id AND tags.user_id = auth.uid())
  );

-- Links: user owns
CREATE POLICY "Users can CRUD own links" ON links
  FOR ALL USING (auth.uid() = user_id);
