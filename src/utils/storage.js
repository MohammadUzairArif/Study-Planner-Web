export const loadTasks = () => {
  try {
    const raw = localStorage.getItem("study-planner-tasks");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to load tasks", e);
    return [];
  }
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem("study-planner-tasks", JSON.stringify(tasks));
  } catch (e) {
    console.error("Failed to save tasks", e);
  }
};
