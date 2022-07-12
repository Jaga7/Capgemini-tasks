import TodoCard from "./TodoCard"
import { useAppSelector } from "../hooks"
import { Key } from "react"

const TodoContainer = () => {
  const { todos } = useAppSelector((state) => state.todoContainer)
  return (
    <div className='todo-container'>
      <h2>Todos:</h2>
      {todos.map(
        (
          todo: {
            title: string
            body: string
            id: number
            isComplete: boolean
          },
          index: Key | null | undefined
        ) => (
          <TodoCard key={index} todo={todo} />
        )
      )}
    </div>
  )
}
export default TodoContainer