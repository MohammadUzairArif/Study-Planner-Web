// src/contexts/TaskContext.jsx
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { loadTasks, saveTasks } from "../utils/storage";

const TaskContext = createContext();

const initialState = {
  tasks: loadTasks(), // load from localStorage
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === action.payload.id ? action.payload : t)),
      };
    case "DELETE_TASK":
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.payload) };
    case "TOGGLE_COMPLETE":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
}

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    saveTasks(state.tasks);
  }, [state.tasks]);

  const addTask = (task) => dispatch({ type: "ADD_TASK", payload: task });
  const updateTask = (task) => dispatch({ type: "UPDATE_TASK", payload: task });
  const deleteTask = (id) => dispatch({ type: "DELETE_TASK", payload: id });
  const toggleComplete = (id) => dispatch({ type: "TOGGLE_COMPLETE", payload: id });

  return (
    <TaskContext.Provider value={{ tasks: state.tasks, addTask, updateTask, deleteTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
