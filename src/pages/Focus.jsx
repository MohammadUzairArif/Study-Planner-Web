// src/pages/Focus.jsx
import React from "react";
import PomodoroTimer from "../components/PomodoroTimer";
import { useApp } from "../contexts/AppContext";

export default function FocusPage(){
  const { achievements } = useApp();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Focus</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PomodoroTimer />
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow">
          <h4 className="font-semibold">Achievements</h4>
          {achievements.length === 0 ? <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">No achievements yet — finish pomodoros to earn badges.</div> :
            <div className="mt-3 space-y-2">{achievements.map(a => <div key={a.id} className="p-2 border rounded flex items-center justify-between"><div><div className="font-medium">{a.title}</div><div className="text-xs text-slate-400">{new Date(a.date || a.createdAt).toLocaleDateString()}</div></div><div>🏆</div></div>)}</div>}
        </div>
      </div>
    </div>
  );
}
