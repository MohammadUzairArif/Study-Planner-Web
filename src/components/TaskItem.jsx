// src/components/TaskItem.jsx
import React from "react";
import { useTasks } from "../contexts/TaskContext";

function prettyDate(iso) {
  if (!iso) return "No due date";
  const d = new Date(iso);
  return d.toLocaleDateString();
}

export default function TaskItem({ task, onEdit }) {
  const { deleteTask, toggleComplete } = useTasks();

  return (
    <div className={`p-3 rounded-lg border flex items-start justify-between gap-3 ${task.completed ? "bg-slate-50 opacity-80" : "bg-white"}`}>
      <div className="flex items-start gap-3">
        <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} className="mt-1" />
        <div>
          <h3 className={`font-semibold ${task.completed ? "line-through text-slate-500" : ""}`}>{task.title}</h3>
          <p className="text-xs text-slate-500">{task.subject || "General"} · {prettyDate(task.dueDate)}</p>
          {task.notes && <p className="text-sm mt-1 text-slate-600">{task.notes}</p>}
          <div className="text-xs mt-2 inline-flex items-center gap-2">
            <span className={`px-2 py-1 rounded ${task.priority==="high" ? "bg-red-100 text-red-700" : task.priority==="medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
              {task.priority}
            </span>
            <span className="text-slate-400">Added: {new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button onClick={() => onEdit(task)} className="px-3 py-1 rounded bg-slate-100 text-sm">Edit</button>
        <button onClick={() => deleteTask(task.id)} className="px-3 py-1 rounded bg-red-500 text-white text-sm">Delete</button>
      </div>
    </div>
  );
}
