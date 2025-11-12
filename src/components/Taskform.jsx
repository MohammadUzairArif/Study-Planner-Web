// src/components/TaskForm.jsx
import React, { useState, useEffect } from "react";
import { useTasks } from "../contexts/TaskContext";

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

export default function TaskForm({ editTask, onClose }) {
  const { addTask, updateTask } = useTasks();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title || "");
      setSubject(editTask.subject || "");
      setDueDate(editTask.dueDate ? editTask.dueDate.split("T")[0] : "");
      setPriority(editTask.priority || "medium");
      setNotes(editTask.notes || "");
    }
  }, [editTask]);

  const reset = () => {
    setTitle("");
    setSubject("");
    setDueDate("");
    setPriority("medium");
    setNotes("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter a task title");

    const taskObj = {
      id: editTask ? editTask.id : uid(),
      title: title.trim(),
      subject: subject.trim(),
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      priority,
      notes: notes.trim(),
      completed: editTask ? editTask.completed : false,
      createdAt: editTask ? editTask.createdAt : new Date().toISOString(),
    };

    if (editTask) updateTask(taskObj);
    else addTask(taskObj);

    reset();
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 shadow">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title (e.g., Read chapter 4)"
          className="border p-2 rounded"
        />
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject (e.g., Physics)"
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border p-2 rounded">
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes (optional)"
          className="border p-2 rounded col-span-1 sm:col-span-2"
        />
      </div>

      <div className="flex items-center justify-end gap-2 mt-3">
        {onClose && (
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-slate-100">
            Cancel
          </button>
        )}
        <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white">
          {editTask ? "Save Changes" : "Add Task"}
        </button>
      </div>
    </form>
  );
}
