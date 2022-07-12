type TodoObject = {
  title: string
  body: string
  id: number
  isComplete: boolean
}

type TodoCardProps = {
  todo: TodoObject
  startEditing: Function
  completeTodo: Function
}
const TodoCard = ({ todo, startEditing, completeTodo }: TodoCardProps) => {
  return (
    <div
      className={"todo-card " + (todo.isComplete && "todo-card--complete")} // adding classname "todo-card--complete" based on the todo element's "isComplete" flag
      key={todo.id}
    >
      <div className='todo-card-text'>
        <div className='todo-card-title'>{todo.title}</div>
        <div className='todo-card-body'>{todo.body}</div>
      </div>
      <div className='todo-card-buttons'>
        <button
          onClick={(e) => {
            startEditing(todo) // calling the prop-drilled callback function to start editing a TODO
          }}
          className='todo-card-button edit-button'
        >
          Edit
        </button>
        <button
          className='todo-card-button complete-button'
          onClick={(e) => completeTodo(todo.id)} // calling the prop-drilled callback function to complete a TODO
        >
          Complete
        </button>
      </div>
    </div>
  )
}
export default TodoCard
