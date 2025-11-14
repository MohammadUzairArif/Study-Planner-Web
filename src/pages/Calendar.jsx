// src/pages/Calendar.jsx
import React from "react";
import { useApp } from "../contexts/AppContext";
import CalendarView from "../components/CalendarView";

export default function CalendarPage(){
  const { tasks } = useApp();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Calendar</h2>
      <CalendarView tasks={tasks} />
    </div>
  );
}
