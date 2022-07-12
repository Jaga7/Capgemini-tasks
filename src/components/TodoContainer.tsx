import TodoCard from "./TodoCard"

type TodoObject = {
  title: string
  body: string
  id: number
  isComplete: boolean
}

type TodoContainerProps = {
  todos: Array<TodoObject>
  startEditing: Function
  completeTodo: Function
}

const TodoContainer = ({
  todos,
  startEditing /* prop-drilling to TodoCard */,
  completeTodo /* prop-drilling to TodoCard */,
}: TodoContainerProps) => {
  return (
    <div className='todo-container'>
      <h2>Todos:</h2>
      {todos.map((todo, index) => (
        <TodoCard
          key={index}
          todo={todo}
          startEditing={startEditing} // prop-drilling to TodoCard
          completeTodo={completeTodo} // prop-drilling to TodoCard
        />
      ))}
    </div>
  )
}
export default TodoContainer
