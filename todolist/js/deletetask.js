/*По итогу все три функциональности (добавление, переключение и удаление) мутируют массив tasks (мутабельный подход), что подойдет для растущего списка задач и для производительности.
findIndex переберет массив с задачами на соответствие айдишников. Если задача не добавлялась или просто нет соответствия, то и удалять нечего будет (taskIndex === -1).-1 является стандартом для отсутствия найденного, когда касается индексов. Если соответствие найдено, то сохранится номер позиции в taskIndex и tasks.splice(taskIndex, 1) — находит в массиве элемент под номером taskIndex и вырезает его (1 штуку). При этом массив tasks становится короче. const [removedTask] — это дестракчеринг. Она сразу достает этот единственный объект из массива и кладет его в переменную removedTask;(одно удаление за один вызов)
*/

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
