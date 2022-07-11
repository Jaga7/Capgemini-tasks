let isTodoCardBeingEdited = false // needed in onSubmit, to know whether to create new todo or edit a todo
let todoCardBeingEdited // needed in editTodo, to put values from form inputs into todo that's being edited
const CLASS_NAMES = {
  todoCard: "todo-card",
  todoCardTitle: "todo-card-title",
  todoCardBody: "todo-card-body",
  todoCardButtons: "todo-card-buttons",
  editButton: "edit-button",
  completeButton: "complete-button",
  todoCardComplete: "todo-card--complete",
  todoCardText: "todo-card-text",
  todoCardButton: "todo-card-button",
}

const editTodo = (e) => {
  // moving content of todo, that's being edited, into form inputs
  todoCardBeingEdited.querySelector(`.${CLASS_NAMES.todoCardTitle}`).innerText =
    e.target[0].value
  todoCardBeingEdited.querySelector(`.${CLASS_NAMES.todoCardBody}`).innerText =
    e.target[1].value
  isTodoCardBeingEdited = false
  todoCardBeingEdited = ""
  e.target[2].innerText = "Create todo"
}

const createNewTodo = (e) => {
  // appending a new todo to todoContainer element
  todoContainer.innerHTML += `<div class=${CLASS_NAMES.todoCard}>
    <div class=${CLASS_NAMES.todoCardText}>
  <div class=${CLASS_NAMES.todoCardTitle}>${e.target[0].value}</div>
  <div class=${CLASS_NAMES.todoCardBody}>${e.target[1].value}</div></div>
  <div class=${CLASS_NAMES.todoCardButtons}><button class="${CLASS_NAMES.todoCardButton} ${CLASS_NAMES.editButton}">Edit</button><button class="${CLASS_NAMES.todoCardButton} ${CLASS_NAMES.completeButton}">Complete</button></div></div>
  `
}

const clearFormInputs = (e) => {
  e.target[0].value = ""
  e.target[1].value = ""
}

const onSubmit = (e) => {
  e.preventDefault()
  if (isTodoCardBeingEdited) {
    editTodo(e)
  } else {
    createNewTodo(e)
  }
  clearFormInputs(e)
}

const putTodoValuesInForm = (e) => {
  isTodoCardBeingEdited = true
  todoCardBeingEdited = e.target.closest(`.${CLASS_NAMES.todoCard}`)
  // putting todo's title into form's input
  createTodoForm[0].value = e.target
    .closest(`.${CLASS_NAMES.todoCard}`)
    .querySelector(`.${CLASS_NAMES.todoCardTitle}`).innerText
  // putting todo's body into form's input
  createTodoForm[1].value = e.target
    .closest(`.${CLASS_NAMES.todoCard}`)
    .querySelector(`.${CLASS_NAMES.todoCardBody}`).innerText
  // changing form's button's content from "Create todo" to "Save todo"
  createTodoForm[2].innerText = "Save todo"
  createTodoForm[0].focus()
}

const completeTodo = (e) => {
  e.target
    .closest(`.${CLASS_NAMES.todoCard}`)
    .classList.add(CLASS_NAMES.todoCardComplete)
}

const onClick = (e) => {
  if (e.target.classList.contains(CLASS_NAMES.editButton)) {
    putTodoValuesInForm(e)
  }
  if (e.target.classList.contains(CLASS_NAMES.completeButton)) {
    completeTodo(e)
  }
}

const createTodoForm = document.querySelector(".create-todo-form")
createTodoForm.addEventListener("submit", onSubmit)

const todoContainer = document.querySelector(".todo-container")
todoContainer.addEventListener("click", onClick)
