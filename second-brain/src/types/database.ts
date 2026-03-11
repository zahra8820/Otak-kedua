export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "done";
export type ProjectStatus = "planning" | "ongoing" | "done";
export type ReferenceType = "link" | "file" | "quote";
export type BookStatus = "to_read" | "reading" | "done";
export type BookNoteType = "chapter" | "page" | "umum";
export type LinkTargetType = "task" | "project" | "reference" | "book";

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: ProjectStatus;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  project_id: string | null;
  title: string;
  description: string | null;
  due_date: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  recurring: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectNote {
  id: string;
  project_id: string;
  content: string;
  created_at: string;
}

export interface ReferenceItem {
  id: string;
  user_id: string;
  title: string;
  type: ReferenceType;
  url: string | null;
  file_path: string | null;
  quote_text: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Book {
  id: string;
  user_id: string;
  title: string;
  penulis: string | null;
  status_baca: BookStatus;
  rating: number | null;
  finished_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BookNote {
  id: string;
  book_id: string;
  jenis: BookNoteType;
  ref: string | null;
  content: string;
  created_at: string;
}

export interface BookQuote {
  id: string;
  book_id: string;
  teks_kutipan: string;
  halaman: string | null;
  created_at: string;
}

export interface Tag {
  id: string;
  user_id: string;
  name: string;
}

export interface TagAssignment {
  id: string;
  tag_id: string;
  target_type: LinkTargetType;
  target_id: string;
}

export interface Link {
  id: string;
  user_id: string;
  source_type: LinkTargetType;
  source_id: string;
  target_type: LinkTargetType;
  target_id: string;
  created_at: string;
}
