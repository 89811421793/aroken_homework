export const getTodosFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("tasks"));
};

export const setTodosToLocalStorage = tasks => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
