import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ProjectForm } from "./project-form";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;

  let query = supabase
    .from("projects")
    .select("id, title, description, status, start_date, end_date, created_at")
    .order("updated_at", { ascending: false });

  if (params.status) query = query.eq("status", params.status);

  const { data: projects } = await query;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Projects
        </h1>
        <ProjectForm />
      </div>
      <div className="flex gap-2 mb-4">
        <Link
          href="/projects"
          className={`px-3 py-1.5 rounded-lg text-sm ${
            !params.status
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
          }`}
        >
          All
        </Link>
        <Link
          href="/projects?status=planning"
          className={`px-3 py-1.5 rounded-lg text-sm ${
            params.status === "planning"
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
          }`}
        >
          Planning
        </Link>
        <Link
          href="/projects?status=ongoing"
          className={`px-3 py-1.5 rounded-lg text-sm ${
            params.status === "ongoing"
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
          }`}
        >
          Ongoing
        </Link>
        <Link
          href="/projects?status=done"
          className={`px-3 py-1.5 rounded-lg text-sm ${
            params.status === "done"
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
          }`}
        >
          Done
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="block p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <h2 className="font-medium text-zinc-900 dark:text-zinc-100">
              {project.title}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
              {project.description || "No description"}
            </p>
            <div className="mt-2 flex gap-2">
              <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">
                {project.status}
              </span>
              {project.start_date && (
                <span className="text-xs text-zinc-500">{project.start_date}</span>
              )}
              {project.end_date && (
                <span className="text-xs text-zinc-500">→ {project.end_date}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
      {(!projects || projects.length === 0) && (
        <p className="text-zinc-500 dark:text-zinc-400 py-8 text-center">
          No projects yet. Create one to get started.
        </p>
      )}
    </div>
  );
}
