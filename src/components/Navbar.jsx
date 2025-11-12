// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold">
            SP
          </div>
          <div>
            <h1 className="text-lg font-semibold">Smart Study Planner</h1>
            <p className="text-xs text-slate-500">Plan · Track · Focus</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md ${location.pathname === "/" ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-100"}`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`px-3 py-2 rounded-md ${location.pathname === "/dashboard" ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-100"}`}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
