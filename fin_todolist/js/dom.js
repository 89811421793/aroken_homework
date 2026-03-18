import {taskKeys} from "./constants.js";
import {addTask, toggleTask, removeTask} from "./service.js";
import {setTodosToLocalStorage} from "./storage.js";

const form = document.querySelector(".form");
const input = document.querySelector(".input");
const todosList = document.querySelector(".todos");

function createTodoElement(task) {
  const li = document.createElement("li");
  li.classList.add("todo");

  li.dataset.id = task[taskKeys.id];

  li.innerHTML = `
    <div class="todo-text">${task[taskKeys.text]}</div>
    <div class="todo-actions">
      <button class="button-complete button">&#10004;</button>
      <button class="button-delete button">&#10006;</button>
    </div>
  `;

  return li;
}

export const renderTodos = tasks => {
  todosList.innerHTML = "";
  tasks.forEach(task => {
    const todoElement = createTodoElement(task);
    if (task[taskKeys.isCompleted]) {
      todoElement.classList.add("completed");
    }
    todosList.append(todoElement);
  });
};

function handleCreateTodo(tasks, text) {
  const newTask = addTask(tasks, text);

  const todoElement = createTodoElement(newTask);

  setTodosToLocalStorage(tasks);

  todosList.append(todoElement);
}

export const initTodoHandlers = tasks => {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const text = input.value.trim();

    if (text) {
      handleCreateTodo(tasks, text);
      input.value = "";
    }
  });

  todosList.addEventListener("click", ({target}) => {
    const todoElement = target.closest(".todo");
    if (!todoElement) return;

    const id = +todoElement.dataset.id;

    if (target.matches(".button-complete")) {
      const updatedTask = toggleTask(tasks, id);
      setTodosToLocalStorage(tasks);
      if (updatedTask) todoElement.classList.toggle("completed");
    }

    if (target.matches(".button-delete")) {
      const removed = removeTask(tasks, id);
      setTodosToLocalStorage(tasks);
      if (removed) todoElement.remove();
    }
  });
};
