import { TodoContainer, TodoForm } from "../../components";
import React from "react";
import { FormInputProps } from "../../components/TodoFormTypes";

const TodosPage = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ onSubmit: propDrilledOnSubmit }, ref) => {
    const propDrilledAndForwardedTitleInputRef = ref;
    return (
      <>
        <TodoForm
          ref={propDrilledAndForwardedTitleInputRef}
          onSubmit={propDrilledOnSubmit}
        />{" "}
        {/*prop-drilling onSubmit and forwardedRef */}
        <TodoContainer />
      </>
    );
  }
);
export default TodosPage;

// React.forwardRef<HTMLInputElement, FormEventHandler<HTMLFormElement>>(
//   ({ onSubmit, children }, ref)
