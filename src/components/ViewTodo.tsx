import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../shared/utils/hooks";
import TodoCard from "./TodoCard";
import { TodoObject } from "./TodoCardTypes";
import {
  finishEdit,
  clearInputs,
  startEditingTodo,
} from "../features/todoForm/todoFormSlice";
import React from "react";
import { todosAPI } from "../services/todos-service";
import { TodoT } from "../types/TodoT";

const ViewTodo = () => {
  const { todoId } = useParams();
  // const { todos } = useAppSelector((state) => state.todoContainer);
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState<TodoObject | null>(null);
  const {
    data: todos,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = todosAPI.useFetchAllTodosQuery(null, {});

  useEffect(() => {
    const newTodo =
      todos && todos.find((todo) => todo.id.toString() === todoId);
    setTodo(newTodo as TodoObject);
  }, [todos, todoId]);

  useEffect(() => {
    dispatch(finishEdit());
    dispatch(clearInputs());
    // ternary operator below because I haven't found a better solution for how to wait for "todo" to be set by "setTodo"
    todo
      ? dispatch(startEditingTodo(todo))
      : dispatch(
          startEditingTodo(
            todos && todos.find((todo) => todo.id.toString() === todoId)
          )
        );
  }, [todoId]);

  return (
    <div className='todo-container'>{todo && <TodoCard todo={todo} />}</div>
  );
};
export default ViewTodo;
