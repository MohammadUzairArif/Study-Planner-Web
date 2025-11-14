import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/Tasks";
import CalendarPage from "./pages/Calendar";
import FocusPage from "./pages/Focus";
import NotesPage from "./pages/Notes";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useApp } from "./contexts/AppContext";

export default function App() {
  const { settings } = useApp();

  React.useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 transition-colors duration-300">
      <BrowserRouter>
        <Navbar />
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <Sidebar />
          </div>
          <div className="lg:col-span-9">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/focus" element={<FocusPage />} />
              <Route path="/notes" element={<NotesPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
