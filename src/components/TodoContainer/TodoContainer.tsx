import TodoCard from "../TodoCard";
import { Outlet } from "react-router-dom";
import TodoCardButtons from "./TodoCardButtons";
import { Skeleton } from "@mui/material";
import { todosAPI } from "../../services/todos-service";
import { TodoT } from "../../types/TodoT";
import { useAppDispatch } from "../../shared/utils/hooks";
import { clearInputs, finishEdit } from "../../features/todoForm/todoFormSlice";
import { useEffect } from "react";

const TodoContainer = () => {
  const dispatch = useAppDispatch();

  const makeSureATodoIsNotBeingEdited = () => {
    dispatch(finishEdit());
    dispatch(clearInputs());
  };
  useEffect(() => {
    makeSureATodoIsNotBeingEdited(); // for when returning from "/todos/:id/edit"
  }, []);
  const {
    data: todos,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = todosAPI.useFetchAllTodosQuery(null, {});

  return (
    <>
      <Outlet></Outlet>
      <div className='todo-container'>
        <h2>Todos:</h2>
        {isLoading && (
          <>
            <Skeleton variant='rectangular' width={780} height={84} />
            <Skeleton variant='rectangular' width={780} height={84} />
            <Skeleton variant='rectangular' width={780} height={84} />
          </>
        )}
        {/* {isLoading && <h2 className='loading'>Loading...</h2>} */}
        {!isLoading &&
          todos &&
          todos.length > 1 &&
          todos.map(
            // mapping over todos
            (todo: TodoT) => (
              <TodoCard key={todo.id} todo={todo}>
                {/* passing TodoCardButtons as children to TodoCard, because we're in TodoContainer (in '/todos' page) so we want to show these buttons  */}
                <TodoCardButtons todo={todo} />
              </TodoCard>
            )
          )}
        {!isLoading && todos && todos.length === 1 && (
          <TodoCard key={0} todo={todos[0]}>
            <TodoCardButtons todo={todos[0]} />
          </TodoCard>
        )}
      </div>
    </>
  );
};
export default TodoContainer;
