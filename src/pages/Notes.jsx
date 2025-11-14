// src/pages/Notes.jsx
import React, { useState } from "react";
import { useApp } from "../contexts/AppContext";
import NotesEditor from "../components/NotesEditor";

export default function NotesPage(){
  const { notes } = useApp();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Notes</h2>
        <button onClick={()=> { setEdit(null); setOpen(true); }} className="px-3 py-2 bg-primary text-white rounded">+ New Note</button>
      </div>

      {open && <div className="mb-4"><NotesEditor noteId={edit} onClose={()=>setOpen(false)} /></div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {notes.length === 0 ? <div className="text-slate-500 dark:text-slate-400">No notes yet.</div> :
          notes.map(n => (
            <div key={n.id} className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{n.title}</h4>
                  <div className="text-xs text-slate-400">{new Date(n.updatedAt || n.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>{ setEdit(n.id); setOpen(true); }} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-xs">Edit</button>
                </div>
              </div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{n.content}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
