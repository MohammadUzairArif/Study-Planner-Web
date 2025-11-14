// src/contexts/AppContext.jsx
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { loadData, saveData } from "../utils/storage";

const AppContext = createContext();

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const initial = {
  tasks: loadData("tasks", []),
  notes: loadData("notes", []),
  pomodoroSessions: loadData("pomodoroSessions", []),
  achievements: loadData("achievements", []),
  settings: loadData("settings", { darkMode: false, onboardingSeen: false }),
  stats: loadData("stats", { weeklyCompleted: [] }),
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK": return { ...state, tasks: [action.payload, ...state.tasks] };
    case "UPDATE_TASK": return { ...state, tasks: state.tasks.map(t=> t.id===action.payload.id ? action.payload : t) };
    case "DELETE_TASK": return { ...state, tasks: state.tasks.filter(t=> t.id !== action.payload) };
    case "TOGGLE_COMPLETE":
      return { ...state, tasks: state.tasks.map(t => t.id === action.payload ? {...t, completed: !t.completed } : t) };
    case "ADD_NOTE": return { ...state, notes: [action.payload, ...state.notes] };
    case "UPDATE_NOTE": return { ...state, notes: state.notes.map(n => n.id === action.payload.id ? action.payload : n) };
    case "ADD_POMODORO": return { ...state, pomodoroSessions: [action.payload, ...state.pomodoroSessions] };
    case "ADD_ACHIEVEMENT": return { ...state, achievements: [action.payload, ...state.achievements] };
    case "SET_SETTING": return { ...state, settings: {...state.settings, ...action.payload } };
    case "SET_STATS": return { ...state, stats: action.payload };
    default: return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    // persist all key datasets
    saveData("tasks", state.tasks);
    saveData("notes", state.notes);
    saveData("pomodoroSessions", state.pomodoroSessions);
    saveData("achievements", state.achievements);
    saveData("settings", state.settings);
    saveData("stats", state.stats);
  }, [state]);

  // helpers
  const addTask = (task) => dispatch({ type: "ADD_TASK", payload: { ...task, id: task.id || uid() } });
  const updateTask = (task) => dispatch({ type: "UPDATE_TASK", payload: task });
  const deleteTask = (id) => dispatch({ type: "DELETE_TASK", payload: id });
  const toggleComplete = (id) => dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  const addNote = (note) => dispatch({ type: "ADD_NOTE", payload: { ...note, id: note.id || uid(), updatedAt: note.updatedAt || new Date().toISOString() } });
  const updateNote = (note) => dispatch({ type: "UPDATE_NOTE", payload: { ...note, updatedAt: new Date().toISOString() } });
  const addPomodoro = (s) => dispatch({ type: "ADD_POMODORO", payload: { ...s, id: uid() } });
  const addAchievement = (a) => dispatch({ type: "ADD_ACHIEVEMENT", payload: { ...a, id: uid(), date: a.date || new Date().toISOString() } });
  const setSetting = (s) => dispatch({ type: "SET_SETTING", payload: s });
  const setStats = (st) => dispatch({ type: "SET_STATS", payload: st });

  return (
    <AppContext.Provider value={{
      ...state,
      addTask, updateTask, deleteTask, toggleComplete,
      addNote, updateNote, addPomodoro, addAchievement, setSetting, setStats
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
