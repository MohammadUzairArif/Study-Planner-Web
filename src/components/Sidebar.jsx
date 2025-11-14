import React from "react";
import { NavLink } from "react-router-dom";
import { Home, List, Calendar, Clock, FileText } from "lucide-react";

const NavItem = ({to, label, Icon}) => (
  <NavLink to={to} className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg ${isActive ? "bg-primary text-white" : "hover:bg-slate-700 text-slate-300"}`}>
    <Icon size={16} />
    <div className="font-medium">{label}</div>
  </NavLink>
);

export default function Sidebar(){
  return (
    <aside className="w-full lg:w-64 hidden lg:block">
      <div className="space-y-3 sticky top-6">
        <div className="bg-slate-800 p-3 rounded-2xl shadow">
          <h3 className="font-bold text-white">Menu</h3>
          <p className="text-xs text-slate-400">Navigate</p>
        </div>

        <div className="bg-slate-800 p-3 rounded-2xl shadow space-y-1">
          <NavItem to="/dashboard" label="Dashboard" Icon={Home} />
          <NavItem to="/tasks" label="Tasks" Icon={List} />
          <NavItem to="/calendar" label="Calendar" Icon={Calendar} />
          <NavItem to="/focus" label="Focus (Pomodoro)" Icon={Clock} />
          <NavItem to="/notes" label="Notes" Icon={FileText} />
        </div>

        <div className="bg-slate-800 p-3 rounded-2xl shadow">
          <h4 className="text-sm font-semibold text-white">Tip</h4>
          <p className="text-xs text-slate-400 mt-2">Use the pomodoro timer to track focus sessions — complete sessions earn badges.</p>
        </div>
      </div>
    </aside>
  );
}
