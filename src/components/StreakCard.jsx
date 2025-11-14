// src/components/StreakCard.jsx
import React from "react";

export default function StreakCard({ tasks }) {
  // simple streak: count days in a row with >=1 completed task, based on createdAt or completed date.
  const completedDates = tasks.filter(t=>t.completed).map(t => new Date(t.createdAt).toDateString());
  const uniqueDays = Array.from(new Set(completedDates)).sort((a,b)=> new Date(b)-new Date(a));
  let streak = 0;
  let cursor = new Date();
  for (let i=0; i<uniqueDays.length; i++){
    const ds = new Date().toDateString();
    const expected = new Date(); expected.setDate(new Date().getDate() - streak);
    if (uniqueDays.includes(expected.toDateString())) {
      streak++;
    } else {
      break;
    }
  }
  if (streak === 0 && uniqueDays.length > 0) streak = 1; // minimum 1 if any
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow">
      <h4 className="font-semibold">Study Streak</h4>
      <p className="text-2xl font-bold mt-2">{streak} days</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Keep the streak going — do at least one task per day!</p>
    </div>
  );
}
