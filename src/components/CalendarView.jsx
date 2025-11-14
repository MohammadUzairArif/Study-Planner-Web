import React from "react";

function keyFromIso(iso) {
  if (!iso) return "No due date";
  return new Date(iso).toDateString();
}

export default function CalendarView({ tasks }) {
  const groups = {};
  tasks.forEach(t => {
    const k = keyFromIso(t.dueDate);
    if (!groups[k]) groups[k] = [];
    groups[k].push(t);
  });

  const keys = Object.keys(groups).sort((a,b)=> {
    if (a==="No due date") return 1;
    if (b==="No due date") return -1;
    return new Date(a) - new Date(b);
  });

  return (
    <div className="bg-slate-800 p-4 rounded-2xl shadow">
      <h4 className="font-semibold text-white mb-3">Calendar overview</h4>
      {keys.length===0 ? <div className="text-sm text-slate-400">No tasks</div> : (
        <div className="space-y-3">
          {keys.map(k=>(
            <div key={k} className="p-2 border border-slate-700 rounded">
              <div className="font-medium text-white">{k}</div>
              <div className="mt-2 space-y-1 text-sm text-slate-300">
                {groups[k].map(t => (
                  <div key={t.id} className="flex items-center justify-between">
                    <div>{t.title} <span className="text-xs text-slate-400">({t.subject || 'General'})</span></div>
                    <div className="text-xs">{t.priority}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
