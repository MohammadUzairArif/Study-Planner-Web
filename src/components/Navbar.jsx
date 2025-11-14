import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar(){
  const location = useLocation();

  return (
    <header className="bg-slate-800 shadow sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold">SP</div>
            <div>
              <h1 className="text-lg font-semibold text-white">Smart Study Planner</h1>
              <p className="text-xs text-slate-300">Plan · Focus · Improve</p>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          <Link to="/dashboard" className={`px-3 py-2 rounded ${location.pathname==="/dashboard" ? "bg-primary text-white" : "text-slate-300 hover:bg-slate-700"}`}>Dashboard</Link>
          <Link to="/tasks" className={`px-3 py-2 rounded ${location.pathname==="/tasks" ? "bg-primary text-white" : "text-slate-300 hover:bg-slate-700"}`}>Tasks</Link>
          <Link to="/calendar" className={`px-3 py-2 rounded ${location.pathname==="/calendar" ? "bg-primary text-white" : "text-slate-300 hover:bg-slate-700"}`}>Calendar</Link>
        </nav>
      </div>
    </header>
  );
}
