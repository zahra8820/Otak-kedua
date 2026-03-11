import { createClient } from "@/lib/supabase/server";
import { TasksList } from "./tasks-list";
import { TaskForm } from "./task-form";

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string; tag?: string; priority?: string; status?: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;

  let query = supabase
    .from("tasks")
    .select("*, projects(title)")
    .order("due_date", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (params.project) query = query.eq("project_id", params.project);
  if (params.priority) query = query.eq("priority", params.priority);
  if (params.status) query = query.eq("status", params.status);

  const { data: tasks } = await query;

  const { data: projects } = await supabase
    .from("projects")
    .select("id, title")
    .order("title");

  const { data: tags } = await supabase
    .from("tags")
    .select("id, name")
    .order("name");

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Tasks
        </h1>
        <TaskForm projects={projects ?? []} />
      </div>
      <TasksList
        tasks={tasks ?? []}
        projects={projects ?? []}
        tags={tags ?? []}
        filters={params}
      />
    </div>
  );
}
