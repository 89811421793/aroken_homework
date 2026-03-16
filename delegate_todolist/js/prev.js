/*1)При помощи метода querySelector получаем элементы .form, .input и .todos
  2)Создаем функцию createTodoElement(text), которая будет создавать todo в виде разметки
  3)Создаем функцию handleCreateTodo(todos, text), которая будет вызывать createTodo и createTodoElement
*/

/* Отмена действия браузера по умолчанию и e.preventDefault() чтобы избежать автоматического рефреша страницы при submit: https://learn.javascript.ru/default-browser-action*/

/*Разница между defer и async скриптами: https://learn.javascript.ru/script-async-defer; вместо defer можно использовать и type='module'; внутри модулей и классов режим 'use strict' встроен изначально и сам модуль работает через live server только*/

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

  task[taskKeys.isCompleted] ? "выполнена" : "не выполнена";

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

// ______________________________________________________________________________________________________

// 1) получение элементов методом DHTML (если "getElements" вместо 'getElement', то возвращается упорядоченная коллекция(массив) и нужно использовать первый индекс [0])

// const form = document.getElementsByClassName("form")[0];
// const input = document.getElementsByClassName("input")[0];
// const todosList = document.getElementsByClassName("todos")[0];

const form = document.querySelector(".form");
const input = document.querySelector(".input");
const todosList = document.querySelector(".todos");

// 2) createTodoElement(text) - элемент неупорядоченного ul-списка (один li - одна задача); используем шаблонную строку, т.к. text - это переменная
function createTodoElement(text) {
  const li = document.createElement("li");
  li.classList.add("todo");

  li.innerHTML = `
    <div class="todo-text">${text}</div>
    <div class="todo-actions">
      <button class="button-complete button">&#10004;</button>
      <button class="button-delete button">&#10006;</button>
    </div>
  `;

  return li;
}

// 3) создание задачи и добавление элемента в DOM; связь массива задач с визуальным отображением на странице (DOM), перенос с Command Line Interface(CLI) в графический(пользовательский) интерфейс. Вместо todos у меня массив tasks, вместо createTodo у меня addTask-функция.
function handleCreateTodo(tasks, text) {
  const newTask = addTask(tasks, text);

  const todoElement = createTodoElement(newTask[taskKeys.text]);

  todosList.append(todoElement);

  console.log("Добавлена новая задача:", newTask);
  console.log("Текущий список задач в моем списке:", tasks);
}

// Слушатель события отправки формы. submit перезагружает страницу по умолчанию - отменим это. Методом trim убираем пробелы,переносы и табы слева и справа(если пользователь введет). После ввода задачи, инпут стоит очистить автоматически после сабмита.
form.addEventListener("submit", e => {
  e.preventDefault();
  const text = input.value.trim();

  if (text) {
    handleCreateTodo(tasks, text);
    input.value = "";
  }

  // или

  // if (!text) return;

  // handleCreateTodo(tasks, text);
  //   input.value = "";
});
