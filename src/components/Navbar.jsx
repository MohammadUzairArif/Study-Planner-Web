// src/components/Navbar.jsx
import React from "react";
import { useApp } from "../contexts/AppContext";
import { Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar(){
  const { settings, setSetting } = useApp();
  const location = useLocation();

  const toggleDark = () => setSetting({ darkMode: !settings.darkMode });

  return (
    <header className="bg-white dark:bg-slate-800 shadow sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold">SP</div>
            <div>
              <h1 className="text-lg font-semibold">Smart Study Planner</h1>
              <p className="text-xs text-slate-500 dark:text-slate-300">Plan · Focus · Improve</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <nav className="hidden md:flex items-center gap-2">
            <Link to="/dashboard" className={`px-3 py-2 rounded ${location.pathname==="/dashboard" ? "bg-primary text-white" : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"}`}>Dashboard</Link>
            <Link to="/tasks" className={`px-3 py-2 rounded ${location.pathname==="/tasks" ? "bg-primary text-white" : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"}`}>Tasks</Link>
            <Link to="/calendar" className={`px-3 py-2 rounded ${location.pathname==="/calendar" ? "bg-primary text-white" : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"}`}>Calendar</Link>
          </nav>

          {/* <button onClick={toggleDark} aria-label="Toggle dark mode" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700">
            {settings.darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button> */}
        </div>
      </div>
    </header>
  );
}
