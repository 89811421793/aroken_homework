import {taskKeys} from "./constants.js";

export function addTask(tasks, text) {
  let lastId =
    tasks.length > 0 ? Math.max(...tasks.map(t => t[taskKeys.id])) : 0;

  const newTask = {
    [taskKeys.id]: ++lastId,
    [taskKeys.text]: text,
    [taskKeys.isCompleted]: false,
  };

  tasks.push(newTask);

  return newTask;
}

export function toggleTask(tasks, id) {
  const task = tasks.find(t => t[taskKeys.id] === id);

  if (!task) return null;

  task[taskKeys.isCompleted] = !task[taskKeys.isCompleted];

  return task;
}

export function removeTask(tasks, id) {
  const taskIndex = tasks.findIndex(t => t[taskKeys.id] === id);

  if (taskIndex === -1) return null;

  const [removedTask] = tasks.splice(taskIndex, 1);

  return removedTask;
}
