import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onEdit }) {
  if (!tasks || tasks.length === 0) {
    return <div className="text-center p-6 text-slate-400">No tasks yet — add your first study task!</div>;
  }

  const sorted = [...tasks].sort((a,b) => {
    if (a.dueDate && b.dueDate) return new Date(a.dueDate) - new Date(b.dueDate);
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="space-y-3">
      {sorted.map(t=> <TaskItem key={t.id} task={t} onEdit={onEdit} />)}
    </div>
  );
}
