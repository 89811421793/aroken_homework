/*На этом этапе введу динамические свойства(вычисляемые свойства объекта в нотации квадратных скобок) - аналог тех, что на https://learn.javascript.ru/object. Словарь ключей taskKeys - структура данных, которая хранит пары ключ/значение или поля и позволяет менять названия свойств в одном месте(значения справа, как я понял), чтобы не приходилось их заменять во всем коде. Нотация вычисляемых свойств удобна для доступа к словарю. Аналог root-селектора для переменных в CSS.
В консоли веб инспектора можно ввести тесты, которые внизу - результат должен совпасть с тем, что в toggletask.js*/

"use strict";

//dictionary
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

//  ТЕСТЫ
/*addTask(tasks, "Купить хлеб");
addTask(tasks, "Выучить JS");
console.log(tasks);
toggleTask(tasks, 1);
console.log(tasks[0].isCompleted);
console.log(tasks[1].isCompleted);
*/
