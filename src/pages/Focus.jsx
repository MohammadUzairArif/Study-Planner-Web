// src/pages/Focus.jsx
import React from "react";
import PomodoroTimer from "../components/PomodoroTimer";
import { useApp } from "../contexts/AppContext";

export default function FocusPage(){
  const { achievements } = useApp();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-200 mb-4">Focus</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PomodoroTimer />
        <div className="bg-slate-800 p-4 rounded-2xl shadow">
          <h4 className="font-semibold text-slate-200">Achievements</h4>
          {achievements.length === 0 ? (
            <div className="text-sm text-slate-400 mt-2">
              No achievements yet — finish pomodoros to earn badges.
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              {achievements.map(a => (
                <div key={a.id} className="p-2 border rounded flex items-center justify-between border-slate-700">
                  <div>
                    <div className="font-medium text-slate-200">{a.title}</div>
                    <div className="text-xs text-slate-400">{new Date(a.date || a.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div>🏆</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
