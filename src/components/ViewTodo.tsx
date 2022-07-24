import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useAppSelector, useAppDispatch } from "../shared/utils/hooks";
import TodoCard from "./TodoCard";
import { TodoObject } from "./TodoCardTypes";
// import {
//   finishEdit,
//   clearInputs,
//   startEditingTodo,
// } from "../features/todoForm/todoFormSlice";
// import {
//   completeTheTodo,
//   deleteTheTodo,
// } from "../features/todoContainer/todoContainerSlice";
import React from "react";
import { useAppContext } from "../context/appContext";

const ViewTodo = () => {
  const { finishEdit, clearInputs, startEditingTodo, todos } = useAppContext();
  const { todoId } = useParams();
  // const { todos } = useAppSelector((state) => state.todoContainer);
  // const dispatch = useAppDispatch();
  const [todo, setTodo] = useState<TodoObject | null>(null);

  useEffect(() => {
    const newTodo = todos.find(
      (todo: TodoObject) => todo.id.toString() === todoId
    );
    setTodo(newTodo as TodoObject);
  }, [todos, todoId]);

  useEffect(() => {
    finishEdit();
    clearInputs();
    // ternary operator below because I haven't found a better solution for how to wait for "todo" to be set by "setTodo"
    todo
      ? startEditingTodo(todo)
      : startEditingTodo(
          todos.find((todo: TodoObject) => todo.id.toString() === todoId)
        );
  }, [todoId]);

  return (
    <div className='todo-container'>{todo && <TodoCard todo={todo} />}</div>
  );
};
export default ViewTodo;
