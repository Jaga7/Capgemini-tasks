import { useAppDispatch, useAppSelector } from "../shared/utils/hooks";
import { startEditingTodo } from "../features/todoForm/todoFormSlice";
import {
  completeTheTodo,
  deleteTheTodo,
} from "../features/todoContainer/todoContainerSlice";
import { TodoCardProps } from "./TodoCardTypes";
import ConditionalLink from "../shared/utils/ConditionalLink";

const TodoCard = ({ todo }: TodoCardProps) => {
  const dispatch = useAppDispatch();
  const { idOfTodoBeingEdited, isTodoCardBeingEdited } = useAppSelector(
    (state) => state.todoForm
  );
  const { idOfSelectedTodo } = useAppSelector((state) => state.viewTodo);
  return (
    <ConditionalLink
      to={`/todos/${todo.id}`}
      condition={todo.id !== idOfSelectedTodo}
    >
      <div
        className={
          "todo-card " +
          (todo.isComplete ? "todo-card--complete " : "") +
          (todo.id === idOfTodoBeingEdited && isTodoCardBeingEdited
            ? "todo-card--editing"
            : "") // checking if this todo is being edited and giving it class "todo-card--editing" so that appropriate css styles are applied
        } // adding classname "todo-card--complete" based on the todo element's "isComplete" flag
        key={todo.id}
      >
        <div className='todo-card-text'>
          <div className='todo-card-title'>{todo.title}</div>
          <div className='todo-card-body'>{todo.body}</div>
        </div>
        {idOfSelectedTodo === todo.id && (
          <div className='todo-card-buttons'>
            <button
              onClick={(e) => {
                dispatch(startEditingTodo(todo)); // dispatching action "startEditingTodo" to start editing the TODO
              }}
              className='todo-card-button edit-button'
            >
              Edit
            </button>
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
        )}
      </div>
    </ConditionalLink>
  );
};
export default TodoCard;
