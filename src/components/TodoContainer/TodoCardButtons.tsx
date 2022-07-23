import { Link } from "react-router-dom";
import {
  completeTheTodo,
  deleteTheTodo,
} from "../../features/todoContainer/todoContainerSlice";
import { startEditingTodo } from "../../features/todoForm/todoFormSlice";
import { TodoCardProps } from "../TodoCardTypes";
import { useAppDispatch } from "../../shared/utils/hooks";

const TodoCardButtons = ({ todo }: TodoCardProps) => {
  const dispatch = useAppDispatch();
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
  );
};
export default TodoCardButtons;
