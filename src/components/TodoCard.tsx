import { useAppSelector } from "../shared/utils/hooks";

import { TodoCardProps } from "./TodoCardTypes";
import { Link } from "react-router-dom";

const TodoCard = ({ todo, children: childrenButtons }: TodoCardProps) => {
  const { idOfTodoBeingEdited, isTodoCardBeingEdited } = useAppSelector(
    (state) => state.todoForm
  );
  return (
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
      {childrenButtons}
    </div>
  );
};
export default TodoCard;
