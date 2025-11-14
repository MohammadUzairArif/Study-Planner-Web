import React, { useEffect, useState } from "react";
import { useApp } from "../contexts/AppContext";
import toast from "react-hot-toast";

export default function NotesEditor({ noteId = null, onClose }) {
  const { notes, addNote, updateNote } = useApp();
  const existing = notes.find(n => n.id === noteId);
  const [title, setTitle] = useState(existing?.title || "");
  const [content, setContent] = useState(existing?.content || "");

  useEffect(()=> {
    if (existing) { setTitle(existing.title); setContent(existing.content); }
  }, [noteId]);

  const save = () => {
    if (!title.trim()) return toast.error("Title required");
    const note = { id: existing?.id, title: title.trim(), content: content };
    if (existing) updateNote(note); else addNote(note);
    toast.success("Note saved");
    if (onClose) onClose();
  };

  return (
    <div className="bg-slate-800 p-4 rounded-2xl shadow space-y-3">
      <input aria-label="Note title" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="border border-slate-700 rounded p-2 bg-slate-900 text-white w-full" />
      <textarea aria-label="Note content" value={content} onChange={e=>setContent(e.target.value)} placeholder="Write notes..." rows={8} className="border border-slate-700 rounded p-2 bg-slate-900 text-white w-full" />
      <div className="flex justify-end gap-2">
        {onClose && <button onClick={onClose} className="px-3 py-1 rounded bg-slate-700 text-white">Cancel</button>}
        <button onClick={save} className="px-3 py-1 rounded bg-primary text-white">Save</button>
      </div>
    </div>
  );
}
