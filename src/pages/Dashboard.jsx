// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { useTasks } from "../contexts/TaskContext";
import ProgressBar from "../components/ProgressBar";
import CalendarView from "../components/CalendarView";
import TaskList from "../components/TaskList";
import TaskForm from "../components/Taskform";

export default function Dashboard() {
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
        <h2 className="text-2xl font-bold">Dashboard</h2>

        <ProgressBar tasks={tasks} />

        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">All Tasks</h3>
            <button onClick={() => { setShowForm(s => !s); setEditing(null); }} className="px-3 py-1 rounded bg-indigo-600 text-white">+ Task</button>
          </div>

          {showForm && <div className="mt-3"><TaskForm editTask={editing} onClose={onClose}/></div>}

          <div className="mt-3">
            <TaskList tasks={tasks} onEdit={handleEdit} />
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <CalendarView tasks={tasks} />
      </aside>
    </div>
  );
}
