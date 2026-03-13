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

  console.log(`Задача ${newTask[taskKeys.id]} добавлена в список`);

  return newTask;
}

function toggleTask(tasks, id) {
  const task = tasks.find(t => t[taskKeys.id] === id);

  if (!task) {
    console.error(`Ошибка: Задача с id ${id} не найдена или не была добавлена`);
    return null;
  }

  task[taskKeys.isCompleted] = !task[taskKeys.isCompleted];

  const status = task[taskKeys.isCompleted] ? "выполнена" : "не выполнена";
  console.log(`Статус задачи ${id} изменен на: "${status}"`);

  return task;
}

function removeTask(tasks, id) {
  const taskIndex = tasks.findIndex(t => t[taskKeys.id] === id);

  if (taskIndex === -1) {
    console.error(
      `Ошибка: Задача с id ${id} не найдена для удаления или не была добавлена ранее`,
    );
    return null;
  }

  const [removedTask] = tasks.splice(taskIndex, 1);

  console.log(`Задача ${id} успешно удалена`);

  return removedTask;
}

// ДЛЯ ТЕСТОВ В КОНСОЛИ:
/*addTask(tasks, "Купить хлеб");
addTask(tasks, "Выучить JS");
addTask(tasks, "Сготовить");
console.log(tasks);
toggleTask(tasks, 1);
console.log(tasks[0].isCompleted);
console.log(tasks[1].isCompleted);
removeTask(tasks, 2);
console.log(tasks);
*/
