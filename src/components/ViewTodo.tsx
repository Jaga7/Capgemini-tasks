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
import {
  completeTheTodo,
  deleteTheTodo,
} from "../features/todoContainer/todoContainerSlice";
import React from "react";

const ViewTodo = () => {
  const { todoId } = useParams();
  const { todos } = useAppSelector((state) => state.todoContainer);
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState<TodoObject | null>(null);

  useEffect(() => {
    const newTodo = todos.find((todo) => todo.id.toString() === todoId);
    setTodo(newTodo as TodoObject);
  }, [todos, todoId]);

  useEffect(() => {
    dispatch(finishEdit());
    dispatch(clearInputs());
    // ternary operator below because I haven't found a better solution for how to wait for "todo" to be set by "setTodo"
    todo
      ? dispatch(startEditingTodo(todo))
      : dispatch(
          startEditingTodo(todos.find((todo) => todo.id.toString() === todoId))
        );
  }, [todoId]);

  return (
    <div className='todo-container'>
      {todo && (
        <TodoCard todo={todo}>
          <div className='todo-card-buttons'>
            {/* <button
              onClick={(e) => {
                dispatch(startEditingTodo(todo)); // dispatching action "startEditingTodo" to start editing the TODO
              }}
              className='todo-card-button edit-button'
            >
              Edit
            </button> */}
            {/* <button
              onClick={(e) => {
                dispatch(
                  completeTheTodo(
                    todo
                    //   {

                    //   // idOfTodoBeingCompleted: todo.id,
                    //   // isTodoAlreadyComplete: todo.isComplete,
                    // }
                  )
                ); // dispatching action "completeTheTodo" to complete the TODO
              }}
              className={
                "todo-card-button " +
                "complete-button " +
                (todo.isComplete ? "complete-button--complete" : "")
              } // adding classname "complete-button--complete" based on the todo element's "isComplete" flag
              // className='todo-card-button complete-button'
            >
              Complete
            </button> */}
          </div>
        </TodoCard>
      )}
    </div>
  );
};
export default ViewTodo;
