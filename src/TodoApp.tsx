import { useRef, useState } from "react"
import TodoContainer from "./components/TodoContainer"
import TodoForm from "./components/TodoForm"

const TodoApp = () => {
  const initialState = {
    newTodoTitle: "", // value of todo title input
    newTodoBody: "", // value of todo body input
    todos: [
      {
        title:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet explicabo expedita, suscipit cum tempore molestias porro facilis dolorum rem, nulla quod enim qui inventore reprehenderit et aspernatur ratione eaque nam?",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, alias aperiam quia fugiat, enim vel omnis pariatur modi quo aut iste, officia totam ea adipisci earum natus. Rerum, saepe culpa?",
        id: 0,
        isComplete: false,
      },
    ],
    isTodoCardBeingEdited: false, // needed to display "save todo" instead of "create todo" and in onSubmitForm to know whether to create a new TODO or edit one
    idOfTodoBeingEdited: null as number | null, // needed in onSubmitForm to know which TODO to edit
  }

  const [state, setState] = useState(initialState)
  const titleInputRef = useRef<HTMLInputElement>(null) // needed for focusing on the todo title input, when clicked "edit"
  const changeState = (value: string | boolean | number, prop: string) => {
    setState({ ...state, [prop]: value })
  }

  const config = [
    {
      placeholderName: "Title",
      propName: "newTodoTitle",
      label: "Todo Title",
      classNameSuffix: "title",
    },
    {
      placeholderName: "Body",
      propName: "newTodoBody",
      label: "Todo Body",
      classNameSuffix: "body",
    },
  ]

  const onSubmitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (state.isTodoCardBeingEdited) {
      setState({
        newTodoTitle: "",
        newTodoBody: "",
        todos: [
          ...state.todos.map((todo) =>
            todo.id === state.idOfTodoBeingEdited
              ? {
                  title: state.newTodoTitle,
                  body: state.newTodoBody,
                  id: todo.id,
                  isComplete: todo.isComplete,
                }
              : todo
          ),
        ],
        isTodoCardBeingEdited: false,
        idOfTodoBeingEdited: null,
      })
    } else {
      createTodo(e)
    }
  }

  const createTodo = (e: React.ChangeEvent<HTMLFormElement>) => {
    const todoTitleInput = e.target[0] as HTMLInputElement // split into two lines this way for Typescript, extracting inputElement
    const todoTitle = todoTitleInput.value // split into two lines this way for Typescript, extracting value of the input

    const todoBodyInput = e.target[1] as HTMLInputElement // split into two lines this way for Typescript, extracting inputElement
    const todoBody = todoBodyInput.value // split into two lines this way for Typescript, extracting value of the input

    const idForNewTodo = state.todos[state.todos.length - 1].id + 1
    setState({
      newTodoTitle: "",
      newTodoBody: "",
      todos: [
        ...state.todos,
        {
          title: todoTitle,
          body: todoBody,
          id: idForNewTodo,
          isComplete: false,
        },
      ],
      isTodoCardBeingEdited: false,
      idOfTodoBeingEdited: null,
    })
  }

  const startEditing = (todo: { title: string; body: string; id: number }) => {
    focusTitleInput() // focusing on todo title input, so that the user can right away type after clicking "edit"
    setState({
      newTodoTitle: todo.title,
      newTodoBody: todo.body,
      todos: [...state.todos],
      isTodoCardBeingEdited: true,
      idOfTodoBeingEdited: todo.id,
    })
  }

  // focusing on todo title input, so that the user can right away type after clicking "edit"
  const focusTitleInput = () => {
    titleInputRef.current?.focus()
  }

  const completeTodo = (idOfTodoToBeCompleted: number) => {
    setState({
      ...state,
      todos: [
        ...state.todos.map((todo) =>
          todo.id === idOfTodoToBeCompleted
            ? {
                ...todo,
                isComplete: true, // based on this value we set or not className "todo-card--complete" on TodoCard component
              }
            : todo
        ),
      ],
    })
  }

  return (
    <>
      <TodoForm
        ref={titleInputRef}
        newTodoValues={{
          newTodoTitle: state.newTodoTitle,
          newTodoBody: state.newTodoBody,
        }} // I put newTodoTitle and newTodoBody into one object for better readability
        config={config}
        changeState={changeState}
        onSubmit={onSubmitForm}
        isTodoCardBeingEdited={state.isTodoCardBeingEdited}
      ></TodoForm>
      <TodoContainer
        todos={state.todos}
        startEditing={startEditing} // callback function to start editing a TODO, prop-drilling to TodoCard :/
        completeTodo={completeTodo} // callback function to complete a TODO, prop-drilling to TodoCard :/
      ></TodoContainer>
    </>
  )
}
export default TodoApp
