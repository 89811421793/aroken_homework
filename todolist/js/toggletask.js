/*toggletask - переключатель статуса с невыполненого на выполненный; метод find ищет совпадание задач по id в массиве tasks (среди ДОБАВЛЕННЫХ задач). если нет в списке, то вернет null, а у добавленных задач меняется невыполнен на выполнено, но только если в переключатель передан ОПРЕДЕЛЕННЫЙ id. Например, помимо массива передан id=2, если в массиве есть такой, то он станет выполнен, если нет то null и сообщение в консоли `Ошибка: Задача с id 2 не найдена или не была добавлена`*/

"use strict";

let tasks = [];

let lastId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;

function addTask(tasks, text) {
  const newTask = {
    id: ++lastId,
    text: text,
    isCompleted: false,
  };

  tasks.push(newTask);

  console.log(`Задача ${newTask.id} добавлена в список`);

  return newTask;
}

function toggleTask(tasks, id) {
  const task = tasks.find(t => t.id === id);

  if (!task) {
    console.error(`Ошибка: Задача с id ${id} не найдена или не была добавлена`);
    return null;
  }

  task.isCompleted = !task.isCompleted;

  const status = task.isCompleted ? "выполнена" : "не выполнена";
  console.log(`Статус задачи ${id} изменен на: "${status}"`);

  return task;
}

//  ТЕСТЫ
/*addTask(tasks, "Купить хлеб");
addTask(tasks, "Выучить JS");
console.log(tasks);
toggleTask(tasks, 1);
console.log(tasks[0].isCompleted);
console.log(tasks[1].isCompleted);
*/
