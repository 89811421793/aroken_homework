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

  if (!task) {
    return null;
  }

  task[taskKeys.isCompleted] = !task[taskKeys.isCompleted];

  return task;
}

function removeTask(tasks, id) {
  const taskIndex = tasks.findIndex(t => t[taskKeys.id] === id);

  if (taskIndex === -1) {
    return null;
  }

  const [removedTask] = tasks.splice(taskIndex, 1);

  return removedTask;
}

const form = document.querySelector(".form");
const input = document.querySelector(".input");
const todosList = document.querySelector(".todos");

// Добавил передачу объекта задачи, чтобы взять ID для dataset (createTodoElement теперь принимает объект задачи целиком и устанавливает li.dataset.id). Теперь в каждый li записывается уникальный номер задачи: li.dataset.id = task.id. dataset — это именно хранилище ID внутри HTML-элемента, способ передать ID из мира JavaScript (массива) в мир HTML (страницы).
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
  // Передаем весь объект newTask
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

  /* или

  if (!text) return;

     handleCreateTodo(tasks, text);
     input.value = "";
  */
});

// Логика делегирования событий(добавлен один слушатель на весь список -"<ul class="todos"></ul>", вместо использования обработчика клика на каждую кнопку. Он определяет, на какую кнопку нажали, достает ID из dataset родительского элемента и вызывает соответствующие функции (toggleTask или removeTask). Теперь при клике на "галочке" или "крестике" данные меняются и в массиве tasks, и в DOM).

// target.closest(".todo") - при клике  по галочке или крестику, прога поднимается вверх до родительского элемента li, забирает оттуда тот самый id и выполняет действия.

// Использована деструктуризация, чтобы получить event.target или e.target (вместо задания переменной или константы const target=e.target)

todosList.addEventListener("click", ({target}) => {
  const todoElement = target.closest(".todo");
  if (!todoElement) return;

  const id = +todoElement.dataset.id; // или const id = Number(todoElement.dataset.id), айдишник только числовой;

  // Обработка завершения(целевой объект(кнопка) соответствует этому классу завершения?)
  if (target.matches(".button-complete")) {
    const updatedTask = toggleTask(tasks, id);
    if (updatedTask) {
      todoElement.classList.toggle("completed"); //зачеркнуть выполненную и убрать зачеркивание при повторном клике

      // для тестового вывода в терминале
      const status = todoElement.classList.contains("completed")
        ? "выполнена"
        : "возобновлена";
      console.log(`Задача ${id} ${status}.`);
    }
  }

  // Обработка удаления (целевой объект(кнопка) соответствует этому классу удаления?)
  if (target.matches(".button-delete")) {
    const removed = removeTask(tasks, id);
    if (removed) {
      todoElement.remove();

      // для тестового вывода в терминале
      console.warn(`Задача ${id} была удалена.`);
    }
  }
});
