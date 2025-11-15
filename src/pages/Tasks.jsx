// src/pages/Tasks.jsx
import React, { useState, useMemo } from "react";
import { useApp } from "../contexts/AppContext";
import TaskForm from "../components/Taskform";
import TaskList from "../components/TaskList";

export default function TasksPage() {
  const { tasks } = useApp();
  const [query, setQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const subjects = useMemo(
    () => Array.from(new Set(tasks.map((t) => t.subject).filter(Boolean))),
    [tasks]
  );

  const filtered = tasks.filter((t) => {
    if (
      query &&
      !t.title.toLowerCase().includes(query.toLowerCase()) &&
      !(t.tags || []).some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    )
      return false;
    if (subjectFilter && t.subject !== subjectFilter) return false;
    return true;
  });

  const handleEdit = (task) => {
    setEditing(task);
    setShowForm(true);
  };

  return (
    <div className="space-y-4">
      {/* Header + Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-2xl font-bold text-slate-200">Tasks</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <input
            aria-label="Search tasks"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title or tags..."
            className="flex-1 border rounded p-2 bg-slate-800 text-slate-200 placeholder-slate-400"
          />
          <select
            aria-label="Filter by subject"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="border rounded p-2 bg-slate-800 text-slate-200"
          >
            <option value="">All subjects</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setEditing(null);
              setShowForm((s) => !s);
            }}
            className="px-3 py-2 bg-primary text-white rounded"
          >
            + New
          </button>
        </div>
      </div>

      {/* Task Form */}
      {showForm && (
        <div className="mb-4">
          <TaskForm
            editTask={editing}
            onClose={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        </div>
      )}

      {/* Task List */}
      <TaskList tasks={filtered} onEdit={handleEdit} />
    </div>
  );
}
