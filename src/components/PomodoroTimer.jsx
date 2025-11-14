import React, { useEffect, useRef, useState } from "react";
import { useApp } from "../contexts/AppContext";
import toast from "react-hot-toast";

export default function PomodoroTimer({ workMinutes = 25, breakMinutes = 5 }) {
  const { addPomodoro, addAchievement } = useApp();
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("work");
  const timerRef = useRef(null);

  useEffect(()=> {
    if (running) {
      timerRef.current = setInterval(()=> setSecondsLeft(s => s - 1), 1000);
    } else clearInterval(timerRef.current);
    return ()=> clearInterval(timerRef.current);
  }, [running]);

  useEffect(()=> {
    if (secondsLeft <= 0) {
      const session = { mode, duration: mode==="work"? workMinutes*60 : breakMinutes*60, finishedAt: new Date().toISOString() };
      addPomodoro(session);
      if (mode === "work") {
        addAchievement({ title: "Completed Pomodoro", createdAt: new Date().toISOString() });
        toast.success("Pomodoro completed! Good job.");
      } else toast("Break finished");

      if (mode === "work") {
        setMode("break");
        setSecondsLeft(breakMinutes * 60);
        setRunning(false);
      } else {
        setMode("work");
        setSecondsLeft(workMinutes * 60);
        setRunning(false);
      }
    }
  }, [secondsLeft]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => { setRunning(false); setMode("work"); setSecondsLeft(workMinutes*60); };

  const mm = String(Math.floor(secondsLeft/60)).padStart(2,"0");
  const ss = String(secondsLeft%60).padStart(2,"0");

  return (
    <div className="bg-slate-800 p-4 rounded-2xl shadow text-center">
      <h4 className="font-semibold text-white">{mode === "work" ? "Focus Time" : "Break Time"}</h4>
      <div className="text-4xl font-bold mt-2 text-white">{mm}:{ss}</div>
      <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
        {!running ? <button onClick={start} className="px-4 py-2 bg-primary text-white rounded">Start</button> :
          <button onClick={pause} className="px-4 py-2 bg-yellow-500 rounded">Pause</button>}
        <button onClick={reset} className="px-4 py-2 bg-slate-700 rounded text-white">Reset</button>
      </div>
      <p className="text-xs text-slate-400 mt-2">Work {workMinutes}m • Break {breakMinutes}m</p>
    </div>
  );
}
