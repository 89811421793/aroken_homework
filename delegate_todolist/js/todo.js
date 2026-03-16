"use strict";

const taskKeys = {
  id: "id",
  text: "text",
  isCompleted: "isCompleted",
};

let tasks = [];

let lastId = tasks.length > 0 ? Math.max(...tasks.map(t => t[taskKeys.id])) : 0;

function addTask(tasks, text) {
  const newTask = {
    [taskKeys.id]: ++lastId,
    [taskKeys.text]: text,
    [taskKeys.isCompleted]: false,
  };

  tasks.push(newTask);

  return newTask;
}

function toggleTask(tasks, id) {
  const task = tasks.find(t => t[taskKeys.id] === id);

  if (!task) return null;

  task[taskKeys.isCompleted] = !task[taskKeys.isCompleted];

  return task;
}

function removeTask(tasks, id) {
  const taskIndex = tasks.findIndex(t => t[taskKeys.id] === id);

  if (taskIndex === -1) return null;

  const [removedTask] = tasks.splice(taskIndex, 1);

  return removedTask;
}

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

function handleCreateTodo(tasks, text) {
  const newTask = addTask(tasks, text);

  const todoElement = createTodoElement(newTask);

  todosList.append(todoElement);
}

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
    if (updatedTask) todoElement.classList.toggle("completed");
  }

  if (target.matches(".button-delete")) {
    const removed = removeTask(tasks, id);
    if (removed) todoElement.remove();
  }
});
