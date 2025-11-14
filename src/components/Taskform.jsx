import React, { useEffect, useState } from "react";
import { useApp } from "../contexts/AppContext";
import toast from "react-hot-toast";

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,6);

export default function TaskForm({ editTask = null, onClose }) {
  const { addTask, updateTask } = useApp();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title || "");
      setSubject(editTask.subject || "");
      setDueDate(editTask.dueDate ? editTask.dueDate.split("T")[0] : "");
      setPriority(editTask.priority || "medium");
      setTags((editTask.tags || []).join(","));
    }
  }, [editTask]);

  const reset = () => { setTitle(""); setSubject(""); setDueDate(""); setPriority("medium"); setTags(""); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Task title is required");
    const task = {
      id: editTask?.id || uid(),
      title: title.trim(),
      subject: subject.trim(),
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      priority,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      completed: editTask?.completed || false,
      createdAt: editTask?.createdAt || new Date().toISOString()
    };
    if (editTask) updateTask(task);
    else addTask(task);
    toast.success(editTask ? "Task updated" : "Task added");
    reset();
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 p-4 rounded-2xl shadow space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input aria-label="Task title" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Task title" className="border border-slate-700 rounded p-2 bg-slate-900 text-white" />
        <input aria-label="Subject" value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Subject (e.g., Math)" className="border border-slate-700 rounded p-2 bg-slate-900 text-white" />
        <input aria-label="Due date" type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} className="border border-slate-700 rounded p-2 bg-slate-900 text-white" />
        <select aria-label="Priority" value={priority} onChange={e=>setPriority(e.target.value)} className="border border-slate-700 rounded p-2 bg-slate-900 text-white">
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <input aria-label="Tags" value={tags} onChange={e=>setTags(e.target.value)} placeholder="Tags comma separated" className="border border-slate-700 rounded p-2 bg-slate-900 text-white col-span-1 sm:col-span-2" />
      </div>

      <div className="flex justify-end gap-2">
        {onClose && <button type="button" onClick={onClose} className="px-3 py-1 rounded bg-slate-700 text-white">Cancel</button>}
        <button type="submit" className="px-4 py-2 rounded bg-primary text-white">{editTask ? "Save" : "Add Task"}</button>
      </div>
    </form>
  );
}
