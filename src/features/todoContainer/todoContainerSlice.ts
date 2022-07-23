import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/utils/api";
import { TodoObject } from "../../components/TodoCardTypes";

const endpoint = "/todos";

const initialState = {
  todos: [
    {
      title:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet explicabo expedita, suscipit cum tempore molestias porro facilis dolorum rem, nulla quod enim qui inventore reprehenderit et aspernatur ratione eaque nam?",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, alias aperiam quia fugiat, enim vel omnis pariatur modi quo aut iste, officia totam ea adipisci earum natus. Rerum, saepe culpa?",
      id: 0,
      isComplete: false,
    },
  ],
  isLoading: false,
};

export const loadTodosFromBackend = createAsyncThunk(
  "todoContainer/loadTodos",
  async (name, thunkAPI) => {
    // if (thunkAPI.getState().contactForm.questionAnsweredCorrectly) {
    //   return thunkAPI.rejectWithValue("answer is right")
    // }
    try {
      const resp = await api.get(`${endpoint}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const createATodo = createAsyncThunk(
  "todoContainer/createATodo",
  async (newTodoTitleAndBody: { title: string; body: string }, thunkAPI) => {
    const newTodo = { ...newTodoTitleAndBody, isComplete: false };

    try {
      const resp = await api.post(endpoint, newTodo);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const editTheTodo = createAsyncThunk(
  "todoContainer/editTheTodo",
  async (
    // editedTodoIdAndNewTitleAndBody: {
    //   title: string;
    //   body: string;
    //   idOfTodoBeingEdited: number;
    // },
    todo: TodoObject,
    thunkAPI
  ) => {
    // const { idOfTodoBeingEdited } = editedTodoIdAndNewTitleAndBody;
    // const { title, body } = editedTodoIdAndNewTitleAndBody;
    const {
      id: idOfTodoBeingEdited,
      isComplete,
      body: newBody,
      title: newTitle,
    } = todo;
    try {
      const resp = await api.put(`${endpoint}/${idOfTodoBeingEdited}`, {
        id: idOfTodoBeingEdited,
        title: newTitle,
        body: newBody,
        isComplete,
      });
      // const resp = await api.patch(`${endpoint}/${idOfTodoBeingEdited}`, {
      //   title,
      //   body,
      // });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const completeTheTodo = createAsyncThunk(
  "todoContainer/completeTheTodo",
  async (
    // isTodoCompleteAndIdOfTodo: {
    //   idOfTodoBeingCompleted: number | string;
    //   isTodoAlreadyComplete: boolean;
    // },
    todo: TodoObject,
    thunkAPI
  ) => {
    const {
      id: idOfTodoBeingCompleted,
      isComplete: isTodoAlreadyComplete,
      body,
      title,
    } = todo;
    // const { idOfTodoBeingCompleted, isTodoAlreadyComplete } =
    //   isTodoCompleteAndIdOfTodo;
    try {
      const resp = await api.put(`${endpoint}/${idOfTodoBeingCompleted}`, {
        id: idOfTodoBeingCompleted,
        isComplete: !isTodoAlreadyComplete,
        body,
        title,
      });
      // const resp = await api.patch(`${endpoint}/${idOfTodoBeingCompleted}`, {
      //   isComplete: !isTodoAlreadyComplete,
      // });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const deleteTheTodo = createAsyncThunk(
  "todoContainer/deleteTheTodo",
  async (idOfTodoBeingDeleted: number | string, thunkAPI) => {
    try {
      const resp = await api.delete(`${endpoint}/${idOfTodoBeingDeleted}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const todoContainerSlice = createSlice({
  name: "todoContainer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTodosFromBackend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadTodosFromBackend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(loadTodosFromBackend.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createATodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createATodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = [...state.todos, action.payload];
      })
      .addCase(createATodo.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editTheTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTheTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        // the part below is done so that we make the changes on the local state without doing unnecessary additional GET request

        const {
          id: idOfTodoBeingEdited,
          title: newTitle,
          body: newBody,
        } = action.meta.arg;
        // const { idOfTodoBeingEdited, title, body } = action.meta.arg;
        state.todos = [
          // mapping over todos in search for the one that is to be edited,
          ...state.todos.map(
            (todo) =>
              todo.id === idOfTodoBeingEdited
                ? //setting a new one in place, leaving the "id" and "isComplete" properties as they were
                  {
                    title: newTitle,
                    body: newBody,
                    id: todo.id,
                    isComplete: todo.isComplete,
                  }
                : todo // for the rest of the todos we return them back as they were
          ),
        ];
      })
      .addCase(editTheTodo.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(completeTheTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(completeTheTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        // the part below is done so that we make the changes on the local state without doing unnecessary additional GET request

        const {
          id: idOfTodoBeingCompleted,
          isComplete: isTodoAlreadyComplete,
        } = action.meta.arg;

        // const { idOfTodoBeingCompleted, isTodoAlreadyComplete } =
        //   action.meta.arg;
        state.todos = state.todos.map((todo) =>
          todo.id === idOfTodoBeingCompleted
            ? {
                ...todo,
                isComplete: !isTodoAlreadyComplete, // setting the completed todo's "isComplete" flag's value to the one of the document returned by the patch request
              }
            : todo
        );
      })
      .addCase(completeTheTodo.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteTheTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTheTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        // the part below is done so that we make the changes on the local state without doing unnecessary additional GET request
        const idOfTodoBeingDeleted = action.meta.arg;
        state.todos = state.todos.filter(
          // filtering out the deleted todo from the local state.todos array
          (todo) => todo.id !== idOfTodoBeingDeleted
        );
      })
      .addCase(deleteTheTodo.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// export const { completeTheTodo } = todoContainerSlice.actions

export default todoContainerSlice.reducer;
