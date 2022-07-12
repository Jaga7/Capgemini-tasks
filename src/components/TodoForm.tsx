import React, { FormEventHandler } from "react"

interface ConfigObject {
  placeholderName: string
  propName: string
  label: string
  classNameSuffix: string
}

type FormInputProps = {
  newTodoValues: object
  config: Array<ConfigObject>
  changeState: Function
  onSubmit: FormEventHandler<HTMLFormElement>
  isTodoCardBeingEdited: boolean
}

const TodoForm = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    { newTodoValues, config, changeState, onSubmit, isTodoCardBeingEdited },
    ref
  ) => {
    return (
      <header>
        <form action='' className='create-todo-form' onSubmit={onSubmit}>
          {config.map(
            (
              input,
              index // mapping over passed config object
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
                  onChange={(e) => changeState(e.target.value, input.propName)}
                  placeholder={input.placeholderName}
                  {...(input.propName === "newTodoTitle" && {
                    ref: ref,
                  })} // ref for focusing on title input when user clicks "edit"
                  required
                />
              </div>
            )
          )}
          <button>{isTodoCardBeingEdited ? "Save todo" : "Create todo"}</button>
        </form>
      </header>
    )
  }
)
export default TodoForm
