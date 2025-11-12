// src/pages/Home.jsx
import React, { useState } from "react";
import TaskForm from "../components/Taskform";
import { useTasks } from "../contexts/TaskContext";
import TaskList from "../components/TaskList";

export default function Home() {
  const { tasks } = useTasks();
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (task) => {
    setEditing(task);
    setShowForm(true);
  };

  const onClose = () => {
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Study Tasks</h2>
          <div>
            <button onClick={() => { setShowForm(!showForm); setEditing(null); }} className="px-4 py-2 bg-indigo-600 text-white rounded">+ New Task</button>
          </div>
        </div>

        {showForm && <TaskForm editTask={editing} onClose={onClose} />}

        <TaskList tasks={tasks} onEdit={handleEdit} />
      </div>

      <aside className="space-y-4">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold">Quick tips</h3>
          <ul className="text-sm text-slate-600 mt-2 space-y-1">
            <li>Use short actionable titles (e.g., "Solve 10 calculus problems").</li>
            <li>Set realistic due dates and group by subject.</li>
            <li>Mark tasks complete to track progress.</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold">Why design matters</h3>
          <p className="text-sm text-slate-600 mt-2">A clean, simple interface reduces cognitive load and helps you focus. This app uses progressive disclosure to keep the UI minimal.</p>
        </div>
      </aside>
    </div>
  );
}
