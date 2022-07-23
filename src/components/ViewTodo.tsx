import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../shared/utils/hooks";
import { selectTodo } from "../features/viewTodo/viewTodoSlice";
import TodoCard from "./TodoCard";
import { TodoObject } from "./TodoCardTypes";
import { finishEdit, clearInputs } from "../features/todoForm/todoFormSlice";
import React from "react";

const ViewTodo = () => {
  const { todoId } = useParams();
  const { todos } = useAppSelector((state) => state.todoContainer);
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState<TodoObject | null>(null);

  useEffect(() => {
    dispatch(finishEdit());
    dispatch(clearInputs());
    dispatch(selectTodo(todoId));
  }, [todoId]);

  useEffect(() => {
    const newTodo = todos.find((todo) => todo.id.toString() === todoId);
    setTodo(newTodo as TodoObject);
  }, [todos, todoId]);

  return (
    <div className='todo-container'>{todo && <TodoCard todo={todo} />}</div>
  );
};
export default ViewTodo;
