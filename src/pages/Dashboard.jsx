// src/pages/Dashboard.jsx
import React from "react";
import { useApp } from "../contexts/AppContext";
import ProgressBar from "../components/ProgressBar";
import QuoteCard from "../components/QuoteCard";
import StreakCard from "../components/StreakCard";
import CalendarView from "../components/CalendarView";

export default function Dashboard(){
  const { tasks } = useApp();

  // upcoming deadlines (next 7 days)
  const upcoming = tasks.filter(t => t.dueDate).map(t=> ({...t, d:new Date(t.dueDate)})).filter(t=> (t.d - new Date()) >=0).sort((a,b)=>a.d-b.d).slice(0,5);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 grid grid-cols-1 gap-4">
          <ProgressBar tasks={tasks} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <QuoteCard />
            <StreakCard tasks={tasks} />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow">
            <h4 className="font-semibold">Upcoming Deadlines</h4>
            <div className="mt-3 space-y-2">
              {upcoming.length === 0 ? <div className="text-sm text-slate-500 dark:text-slate-400">No upcoming deadlines</div> :
                upcoming.map(u => (
                  <div key={u.id} className="p-2 border rounded">
                    <div className="font-medium">{u.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{new Date(u.dueDate).toLocaleString()}</div>
                    <div className="text-xs mt-1 text-slate-400">{u.subject || "General"}</div>
                  </div>
                ))
              }
            </div>
          </div>

          <CalendarView tasks={tasks} />
        </aside>
      </div>
    </div>
  );
}
