export interface ToDoFormState {
  newTodoTitle: string;
  newTodoBody: string;
  isTodoCardBeingEdited: boolean;
  idOfTodoBeingEdited: number | null;
}
