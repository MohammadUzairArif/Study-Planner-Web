import React from "react";
import { useApp } from "../contexts/AppContext";

function prettyDate(iso) {
  if (!iso) return "No due date";
  const d = new Date(iso);
  return d.toLocaleDateString();
}

export default function TaskItem({ task, onEdit }) {
  const { deleteTask, toggleComplete } = useApp();
  const priorityStyle = task.priority === "high" ? "bg-red-700 text-white" : task.priority === "medium" ? "bg-yellow-600 text-white" : "bg-green-700 text-white";

  return (
    <div className={`p-3 rounded-lg border flex flex-col sm:flex-row sm:items-start justify-between gap-3 bg-slate-800`}>
      <div className="flex items-start gap-3 flex-1">
        <input type="checkbox" checked={task.completed} onChange={()=>toggleComplete(task.id)} className="mt-1" />
        <div className="flex-1">
          <h3 className={`font-semibold ${task.completed ? "line-through text-slate-400" : "text-white"}`}>{task.title}</h3>
          <p className="text-xs text-slate-400">{task.subject || "General"} · {prettyDate(task.dueDate)}</p>
          {task.tags && task.tags.length>0 && <div className="mt-2 flex flex-wrap gap-2">
            {task.tags.map(t => <span key={t} className="text-xs px-2 py-1 bg-slate-700 rounded">{t}</span>)}
          </div>}
          <div className="text-xs mt-2 inline-flex items-center gap-2 flex-wrap">
            <span className={`px-2 py-1 rounded ${priorityStyle}`}>{task.priority}</span>
            <span className="text-slate-400">Added: {new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2 sm:mt-0">
        <button onClick={()=>onEdit(task)} className="px-3 py-1 rounded bg-slate-700 text-white text-sm">Edit</button>
        <button onClick={()=>deleteTask(task.id)} className="px-3 py-1 rounded bg-red-600 text-white text-sm">Delete</button>
      </div>
    </div>
  );
}
