// src/components/CalendarView.jsx
import React from "react";

function getDateKey(iso) {
  if (!iso) return null;
  return new Date(iso).toDateString();
}

export default function CalendarView({ tasks }) {
  // group tasks by day (simple grouping)
  const groups = {};
  tasks.forEach(t => {
    const key = getDateKey(t.dueDate) || "No due date";
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
  });

  const keys = Object.keys(groups).sort((a,b)=> a==="No due date"?1: (b==="No due date"? -1 : new Date(a)-new Date(b)));

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h4 className="font-semibold mb-3">Calendar overview</h4>
      <div className="space-y-3">
        {keys.map(k => (
          <div key={k} className="p-2 border rounded">
            <div className="text-sm font-medium">{k}</div>
            <div className="mt-2 text-sm text-slate-600">
              {groups[k].map(t => (
                <div key={t.id} className="flex items-center gap-2">
                  <div className="text-sm">{t.title} <span className="text-xs text-slate-400">({t.subject || "General"})</span></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
