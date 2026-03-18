import {getTodosFromLocalStorage} from "./storage.js";
import {renderTodos, initTodoHandlers} from "./dom.js";

const tasks = getTodosFromLocalStorage() || [];

document.addEventListener("DOMContentLoaded", () => {
  renderTodos(tasks);
  initTodoHandlers(tasks);
});
