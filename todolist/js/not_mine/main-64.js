"use strict";

// {
//   id: 1,
//   text: "Todo",
//   is_completed: false,
// }

let todos = [];

const getNewTodoId = todos =>
  todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;

const createTodo = (todos, text) => {
  const newTodo = {
    id: getNewTodoId(todos),
    text: text,
    is_completed: false,
  };
  todos.push(newTodo);
  return newTodo;
};
