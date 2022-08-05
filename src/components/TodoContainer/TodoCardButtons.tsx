import { Link } from "react-router-dom";
import { startEditingTodo } from "../../features/todoForm/todoFormSlice";
import { TodoCardProps } from "../TodoCardTypes";
import { useAppDispatch, useAppSelector } from "../../shared/utils/hooks";
import { todosAPI } from "../../services/todos-service";

const TodoCardButtons = ({ todo }: TodoCardProps) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [
    completeTheTodo, // This is the mutation trigger
    { isLoading: isCompleteUpdating }, // This is the destructured mutation result
  ] = todosAPI.useCompleteTheTodoMutation();
  const [
    deleteTheTodo, // This is the mutation trigger
    { isLoading: isDeleteUpdating }, // This is the destructured mutation result
  ] = todosAPI.useDeleteTheTodoMutation();
  return (
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
          completeTheTodo({ ...todo, isComplete: !todo.isComplete });
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
      {currentUser && currentUser.role === "admin" && (
        <button
          onClick={(e) => {
            deleteTheTodo({ ...todo });
          }}
          className='todo-card-button delete-button'
        >
          Delete
        </button>
      )}
    </div>
  );
};
export default TodoCardButtons;
