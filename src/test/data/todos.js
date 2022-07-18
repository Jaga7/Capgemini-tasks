import todosData from "./todos-data.json";

let todos = [...todosData];

async function remove(id) {
  todos = todos.filter((todo) => todo.id !== id);
}

async function getTodos() {
  return todos;
}

async function createATodo(newTodoTitleBodyAndIsComplete) {
  const idForNewTodo = parseInt(todos[todos.length - 1].id + 1);
  const newTodo = { ...newTodoTitleBodyAndIsComplete, id: idForNewTodo };
  todos = [...todos, newTodo];
  return newTodo;
}

async function completeTheTodo(id) {
  id = parseInt(id);
  todos = todos.map((todo) => {
    return todo.id === id
      ? {
          ...todo,
          isComplete: !todo.isComplete, // toggling the completed todo's "isComplete" flag's value
          // isComplete: !todo.isComplete, // toggling the completed todo's "isComplete" flag's value
        }
      : todo;
  });
  return todos;
}

async function editTheTodo(id, newEditedTodo) {
  id = parseInt(id);
  todos = todos.map((todo) => {
    return todo.id === id
      ? {
          ...newEditedTodo,
          id: todo.id,
          isComplete: todo.isComplete,
        }
      : todo;
  });

  return todos;
}

async function reset() {
  todos = [...todosData];
}

export { remove, getTodos, createATodo, completeTheTodo, editTheTodo, reset };
