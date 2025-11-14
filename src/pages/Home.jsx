// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home(){
  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-slate-200">Welcome to Smart Study Planner</h2>
        <p className="text-slate-300 mt-2">Plan your study sessions, focus with pomodoro, and track progress — designed with HCI in mind.</p>
        <div className="mt-4">
          <Link to="/dashboard" className="px-4 py-2 bg-primary text-white rounded">Go to Dashboard</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/tasks" className="bg-slate-800 p-4 rounded-2xl shadow text-slate-200">Tasks</Link>
        <Link to="/focus" className="bg-slate-800 p-4 rounded-2xl shadow text-slate-200">Focus</Link>
        <Link to="/notes" className="bg-slate-800 p-4 rounded-2xl shadow text-slate-200">Notes</Link>
      </div>
    </div>
  );
}
