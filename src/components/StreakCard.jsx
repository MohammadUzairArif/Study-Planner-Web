import React from "react";

export default function StreakCard({ tasks }) {
  const completedDates = tasks.filter(t=>t.completed).map(t => new Date(t.createdAt).toDateString());
  const uniqueDays = Array.from(new Set(completedDates)).sort((a,b)=> new Date(b)-new Date(a));

  let streak = 0;
  for (let i=0; i<uniqueDays.length; i++){
    const expected = new Date(); expected.setDate(new Date().getDate() - streak);
    if (uniqueDays.includes(expected.toDateString())) streak++;
    else break;
  }

  if (streak === 0 && uniqueDays.length > 0) streak = 1;

  return (
    <div className="bg-slate-800 p-4 rounded-2xl shadow">
      <h4 className="font-semibold text-white">Study Streak</h4>
      <p className="text-2xl font-bold mt-2 text-white">{streak} days</p>
      <p className="text-xs text-slate-400 mt-1">Keep the streak going — do at least one task per day!</p>
    </div>
  );
}
