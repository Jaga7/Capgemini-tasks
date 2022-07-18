import TodoCard from "./TodoCard";
import { useAppDispatch, useAppSelector } from "../shared/utils/hooks";
import { Key, useEffect } from "react";

import { loadTodosFromBackend } from "../features/todoContainer/todoContainerSlice";

const TodoContainer = () => {
  const dispatch = useAppDispatch();
  const LoadTodos = () => {
    dispatch(loadTodosFromBackend());
  };
  const { todos, isLoading } = useAppSelector((state) => state.todoContainer);
  useEffect(() => {
    LoadTodos();
  }, []);
  // }, [todos.length])
  return (
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
          ) => <TodoCard key={index} todo={todo} />
        )}
      {!isLoading && todos.length === 1 && <TodoCard key={0} todo={todos[0]} />}
    </div>
  );
};
export default TodoContainer;
