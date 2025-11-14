// src/utils/storage.js
export const loadData = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(`sp:${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error("loadData error", e);
    return fallback;
  }
};

export const saveData = (key, data) => {
  try {
    localStorage.setItem(`sp:${key}`, JSON.stringify(data));
  } catch (e) {
    console.error("saveData error", e);
  }
};
