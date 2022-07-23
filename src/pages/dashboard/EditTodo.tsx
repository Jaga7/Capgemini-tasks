import React from "react";
import { Link } from "react-router-dom";
import { TodoForm, ViewTodo } from "../../components";
import { FormInputProps } from "../../components/TodoFormTypes";

const EditTodo = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ onSubmit: propDrilledOnSubmit }, ref) => {
    const propDrilledAndForwardedTitleInputRef = ref;
    return (
      <>
        {/*prop-drilling onSubmit and forwardedRef */}
        <TodoForm
          ref={propDrilledAndForwardedTitleInputRef}
          onSubmit={propDrilledOnSubmit}
        >
          {/* passing go-back-link into TodoForm in the 'todos/:todoId/edit' page */}
          <Link to='/todos' className='go-back-link'>
            Go back
          </Link>
        </TodoForm>

        <ViewTodo />
      </>
    );
  }
);
export default EditTodo;
