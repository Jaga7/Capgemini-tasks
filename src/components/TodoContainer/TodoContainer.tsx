import TodoCard from "../TodoCard";
import { useAppDispatch, useAppSelector } from "../../shared/utils/hooks";
import { Key, useEffect } from "react";

import {
  completeTheTodo,
  deleteTheTodo,
  loadTodosFromBackend,
} from "../../features/todoContainer/todoContainerSlice";
import { Link, Outlet } from "react-router-dom";
import {
  clearInputs,
  finishEdit,
  startEditingTodo,
} from "../../features/todoForm/todoFormSlice";

const TodoContainer = () => {
  const dispatch = useAppDispatch();
  const LoadTodos = () => {
    dispatch(loadTodosFromBackend());
  };
  const { todos, isLoading } = useAppSelector((state) => state.todoContainer);
  const makeSureATodoIsNotBeingEdited = () => {
    dispatch(finishEdit());
    dispatch(clearInputs());
  };
  useEffect(() => {
    makeSureATodoIsNotBeingEdited();
    LoadTodos();
  }, []);
  // }, [todos.length])
  return (
    <>
      <Outlet></Outlet>
      <div className='todo-container'>
        <h2>Todos:</h2>
        {/* <h2 className="loading">Loading...</h2> */}
        {isLoading && <h2 className='loading'>Loading...</h2>}
        {!isLoading &&
          todos.length > 1 &&
          todos.map(
            // mapping over todos
            (
              todo: {
                title: string;
                body: string;
                id: number;
                isComplete: boolean;
              },
              index: Key
            ) => (
              <TodoCard key={index} todo={todo}>
                <div className='todo-card-buttons'>
                  <Link to={`/todos/${todo.id}/edit`}>
                    <button
                      onClick={(e) => {
                        dispatch(startEditingTodo(todo)); // dispatching action "startEditingTodo" to start editing the TODO
                      }}
                      className='todo-card-button edit-button'
                    >
                      Edit
                    </button>
                  </Link>

                  <button
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
                  </button>
                  <button
                    onClick={(e) => {
                      dispatch(deleteTheTodo(todo.id)); // dispatching action "deleteTheTodo" to delete the TODO
                    }}
                    className='todo-card-button delete-button'
                  >
                    Delete
                  </button>
                </div>
              </TodoCard>
            )
          )}
        {!isLoading && todos.length === 1 && (
          <TodoCard key={0} todo={todos[0]} />
        )}
      </div>
    </>
  );
};
export default TodoContainer;
