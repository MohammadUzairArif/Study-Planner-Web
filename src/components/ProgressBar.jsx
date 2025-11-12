// src/components/ProgressBar.jsx
import React from "react";

export default function ProgressBar({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">Progress</h4>
          <p className="text-sm text-slate-500">{done} of {total} tasks completed</p>
        </div>
        <div className="text-lg font-bold">{pct}%</div>
      </div>

      <div className="mt-3 w-full bg-slate-100 rounded-full h-3 overflow-hidden">
        <div className="h-3 rounded-full transition-all" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #6366f1, #06b6d4)" }} />
      </div>
    </div>
  );
}
