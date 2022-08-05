import { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./shared/utils/hooks";
import { finishEdit, clearInputs } from "./features/todoForm/todoFormSlice";
import { loginUser } from "./features/auth/authSlice";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SharedLayout, Home } from "./pages/dashboard";
import TodosPage from "./pages/dashboard/TodosPage";
import EditTodo from "./pages/dashboard/EditTodo";
import severJsonApi from "./shared/utils/api-server-json";
import { Auth } from "./pages";
import { User } from "./features/auth/authTypes";
import { todosAPI } from "./services/todos-service";

const TodoApp = () => {
  const navigate = useNavigate(); // used in "onSubmit" for navigating from 'todos/:todoId/edit' to '/todos'
  const { isTodoCardBeingEdited, idOfTodoBeingEdited } = useAppSelector(
    (state) => state.todoForm // "isTodoCardBeingEdited" needed here in onSubmitForm function to know whether to create a new TODO or edit one, "idOfTodoBeingEdited" needed in onSubmitForm function to know which TODO to edit
  );
  const {
    data: todos,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = todosAPI.useFetchAllTodosQuery(null, {});
  const dispatch = useAppDispatch();
  const [
    createATodo, // This is the mutation trigger
    { isLoading: isCreateUpdating }, // This is the destructured mutation result
  ] = todosAPI.useCreateATodoMutation();
  const [
    editTheTodo, // This is the mutation trigger
    { isLoading: isEditUpdating }, // This is the destructured mutation result
  ] = todosAPI.useEditTheTodoMutation();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token")!);
    if (token) {
      severJsonApi.get("auth/" + token).then((r) => {
        const retrievedUser: User = r.data;
        dispatch(loginUser(retrievedUser.name));
      });
    } else {
      navigate("/login");
    }
  }, []);
  // focusing on the todo title input
  useEffect(() => {
    focusTitleInput();
  }, [isTodoCardBeingEdited, idOfTodoBeingEdited, todos?.length]); // "idOfTodoBeingEdited" is needed aside from "isTodoCardBeingEdited" for when user clicks "edit" on one todo and right after clicks "edit" on a different todo , "todos.length" is for when a new todo is created

  const titleInputRef = useRef<HTMLInputElement>(null); // needed for focusing on the todo title input, when clicked "edit"

  // submitForm is passed as a prop to the TodoForm component below
  const submitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const targetElements = Array.from(e.target.elements);
    const eventTargetElementsArray = Array.from(targetElements);
    const newTodoTitleInput = eventTargetElementsArray.find(
      (element: { id: string }) => element.id === "todo-title"
    ) as HTMLInputElement;
    // const newTodoTitleInput = e.target[0] as HTMLInputElement; // split into two lines this way for Typescript, extracting inputElement
    const newTodoTitle = newTodoTitleInput.value; // split into two lines this way for Typescript, extracting value of the input

    const newTodoBodyInput = eventTargetElementsArray.find(
      (element: { id: string }) => element.id === "todo-body"
    ) as HTMLInputElement; // split into two lines this way for Typescript, extracting inputElement
    const newTodoBody = newTodoBodyInput.value; // split into two lines this way for Typescript, extracting value of the input

    if (isTodoCardBeingEdited) {
      editTheTodo({
        title: newTodoTitle,
        body: newTodoBody,
        id: idOfTodoBeingEdited as number,
        isComplete: todos?.find((todo) => todo.id === idOfTodoBeingEdited)!
          .isComplete,
      });

      dispatch(finishEdit());
      // navigate to "/todos" after saving the edited todo in the /todos/:id/edit route
      navigate("/todos");
    } else {
      createATodo({ title: newTodoTitle, body: newTodoBody });
      // createATodo action, passing the new todo's title and body
    }
    dispatch(clearInputs()); // clear inputs both after saving edited todo as well as after creating a new todo
  };

  const focusTitleInput = () => {
    titleInputRef.current?.focus(); // focusing on todo title input, so that the user can right away type
  };

  return (
    <Routes>
      <Route path='/' element={<SharedLayout />}>
        <Route index element={<Home />}></Route>
        <Route
          path='todos'
          element={<TodosPage ref={titleInputRef} onSubmit={submitForm} />}
        ></Route>
        <Route
          path='todos/:todoId/edit'
          element={<EditTodo ref={titleInputRef} onSubmit={submitForm} />}
        />
      </Route>

      <Route path='/login' element={<Auth />}></Route>
    </Routes>
  );
};
export default TodoApp;
