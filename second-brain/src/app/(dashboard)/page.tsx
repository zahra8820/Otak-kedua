import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/tasks"
          className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
        >
          <h2 className="font-medium text-zinc-900 dark:text-zinc-100">Tasks</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            View and manage your tasks
          </p>
        </Link>
        <Link
          href="/projects"
          className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
        >
          <h2 className="font-medium text-zinc-900 dark:text-zinc-100">Projects</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Organize tasks and notes
          </p>
        </Link>
        <Link
          href="/references"
          className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
        >
          <h2 className="font-medium text-zinc-900 dark:text-zinc-100">References</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Links, files, and quotes
          </p>
        </Link>
        <Link
          href="/books"
          className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
        >
          <h2 className="font-medium text-zinc-900 dark:text-zinc-100">Books</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Reading list and notes
          </p>
        </Link>
      </div>
    </div>
  );
}
