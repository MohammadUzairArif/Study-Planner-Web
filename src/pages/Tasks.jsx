// src/pages/Tasks.jsx
import React, { useState, useMemo } from "react";
import { useApp } from "../contexts/AppContext";
import TaskForm from "../components/Taskform";
import TaskList from "../components/TaskList";

export default function TasksPage(){
  const { tasks } = useApp();
  const [query, setQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const subjects = useMemo(()=> Array.from(new Set(tasks.map(t=> t.subject).filter(Boolean))), [tasks]);

  const filtered = tasks.filter(t => {
    if (query && !t.title.toLowerCase().includes(query.toLowerCase()) && !(t.tags||[]).some(tag=>tag.toLowerCase().includes(query.toLowerCase()))) return false;
    if (subjectFilter && t.subject !== subjectFilter) return false;
    return true;
  });

  const handleEdit = (task) => { setEditing(task); setShowForm(true); };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <div className="flex items-center gap-2">
          <input aria-label="Search tasks" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search title or tags..." className="border rounded p-2 bg-transparent" />
          <select aria-label="Filter by subject" value={subjectFilter} onChange={e=>setSubjectFilter(e.target.value)} className="border rounded p-2 bg-transparent">
            <option value="">All subjects</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={()=>{ setEditing(null); setShowForm(s=>!s); }} className="px-3 py-2 bg-primary text-white rounded">+ New</button>
        </div>
      </div>

      {showForm && <div className="mb-4"><TaskForm editTask={editing} onClose={()=>{ setShowForm(false); setEditing(null); }} /></div>}

      <TaskList tasks={filtered} onEdit={handleEdit} />
    </div>
  );
}
