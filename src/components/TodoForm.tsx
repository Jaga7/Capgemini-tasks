import React from "react";
import { useAppContext } from "../context/appContext";
// import { useAppDispatch, useAppSelector } from "../shared/utils/hooks";
import { config } from "./constants";
import { FormInputProps } from "./TodoFormTypes";

const TodoForm = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ onSubmit, children }, ref) => {
    // const dispatch = useAppDispatch();
    // const { newTodoTitle, newTodoBody, isTodoCardBeingEdited } = useAppSelector(
    //   (state) => state.todoForm
    // );
    const {
      newTodoTitle,
      newTodoBody,
      isTodoCardBeingEdited,
      changeFormTitleInputValue,
      changeFormBodyInputValue,
    } = useAppContext();
    const configActions = {
      changeFormTitleInputValue: changeFormTitleInputValue,
      changeFormBodyInputValue: changeFormBodyInputValue,
    };
    const newTodoValues = { newTodoTitle, newTodoBody };

    return (
      <header className='form-header'>
        {children && children}
        <form action='' className='create-todo-form' onSubmit={onSubmit}>
          {config.map(
            (
              input,
              index // mapping over "config" object
            ) => (
              <div key={index}>
                <label htmlFor={`todo-${input.classNameSuffix}`}>
                  {input.label}
                </label>
                <input
                  type='text'
                  name={`todo-${input.classNameSuffix}`}
                  id={`todo-${input.classNameSuffix}`}
                  value={
                    newTodoValues[input.propName as keyof typeof newTodoValues]
                  }
                  onChange={(e) => {
                    const newInputValue = e.target.value;
                    // dispatch(input.reduxAction({ newInputValue }));

                    configActions[
                      input.actionName as keyof typeof configActions
                    ]({ newInputValue });
                  }}
                  placeholder={input.placeholderName}
                  {...(input.propName === "newTodoTitle" && {
                    ref: ref, // ref for focusing on title input, forwarded from the "TodoApp" component
                  })}
                  required
                />
              </div>
            )
          )}
          <button>{isTodoCardBeingEdited ? "Save todo" : "Create todo"}</button>
        </form>
      </header>
    );
  }
);
export default TodoForm;
