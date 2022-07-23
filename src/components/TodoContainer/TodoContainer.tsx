import TodoCard from "../TodoCard";
import { useAppDispatch, useAppSelector } from "../../shared/utils/hooks";
import { Key, useEffect } from "react";

import {
  // completeTheTodo,
  // deleteTheTodo,
  loadTodosFromBackend,
} from "../../features/todoContainer/todoContainerSlice";
import { Outlet } from "react-router-dom";
import {
  clearInputs,
  finishEdit,
  // startEditingTodo,
} from "../../features/todoForm/todoFormSlice";
import TodoCardButtons from "./TodoCardButtons";

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
    makeSureATodoIsNotBeingEdited(); // for when returning from "/todos/:id/edit"
    LoadTodos();
  }, []);
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
                {/* passing TodoCardButtons as children to TodoCard, because we're in TodoContainer (in '/todos' page) so we want to show these buttons  */}
                <TodoCardButtons todo={todo} />
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
