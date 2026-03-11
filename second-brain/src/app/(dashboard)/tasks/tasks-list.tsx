"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TaskForm } from "./task-form";
import type { Task } from "@/types/database";

interface TasksListProps {
  tasks: (Task & { projects?: { title: string } | null })[];
  projects: { id: string; title: string }[];
  tags: { id: string; name: string }[];
  filters: { project?: string; tag?: string; priority?: string; status?: string };
}

export function TasksList({ tasks, projects, tags, filters }: TasksListProps) {
  const router = useRouter();
  const supabase = createClient();

  async function toggleStatus(task: Task) {
    const newStatus = task.status === "todo" ? "done" : "todo";
    await supabase.from("tasks").update({ status: newStatus }).eq("id", task.id);
    router.refresh();
  }

  async function deleteTask(id: string) {
    if (confirm("Delete this task?")) {
      await supabase.from("tasks").delete().eq("id", id);
      router.refresh();
    }
  }

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        <Link
          href="/tasks"
          className={`px-3 py-1.5 rounded-lg text-sm ${
            !filters.status
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
          }`}
        >
          All
        </Link>
        <Link
          href="/tasks?status=todo"
          className={`px-3 py-1.5 rounded-lg text-sm ${
            filters.status === "todo"
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
          }`}
        >
          Todo
        </Link>
        <Link
          href="/tasks?status=done"
          className={`px-3 py-1.5 rounded-lg text-sm ${
            filters.status === "done"
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
          }`}
        >
          Done
        </Link>
        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/tasks?project=${p.id}`}
            className={`px-3 py-1.5 rounded-lg text-sm ${
              filters.project === p.id
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            }`}
          >
            {p.title}
          </Link>
        ))}
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"
          >
            <button
              onClick={() => toggleStatus(task)}
              className="w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center"
            >
              {task.status === "done" ? (
                <span className="text-green-500 text-sm">✓</span>
              ) : null}
            </button>
            <div className="flex-1 min-w-0">
              <span
                className={
                  task.status === "done"
                    ? "line-through text-zinc-500 dark:text-zinc-400"
                    : "text-zinc-900 dark:text-zinc-100"
                }
              >
                {task.title}
              </span>
              {task.projects && typeof task.projects === "object" && "title" in task.projects && (
                <span className="ml-2 text-xs text-zinc-500">
                  ({task.projects.title})
                </span>
              )}
              {task.due_date && (
                <span className="ml-2 text-xs text-zinc-500">{task.due_date}</span>
              )}
              <span
                className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                  task.priority === "high"
                    ? "bg-red-100 dark:bg-red-900/30 text-red-700"
                    : task.priority === "medium"
                    ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600"
                }`}
              >
                {task.priority}
              </span>
            </div>
            <div className="flex gap-2">
              <TaskForm projects={projects} task={task} />
              <button
                onClick={() => deleteTask(task.id)}
                className="px-3 py-1 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && (
        <p className="text-zinc-500 dark:text-zinc-400 py-8 text-center">
          No tasks yet. Create one to get started.
        </p>
      )}
    </div>
  );
}
