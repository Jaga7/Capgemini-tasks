import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  idOfSelectedTodo: null,
};

const viewTodoSlice = createSlice({
  name: "viewTodo",
  initialState,
  reducers: {
    selectTodo: (state, action) => {
      state.idOfSelectedTodo = action.payload;
    },
  },
});

export const { selectTodo } = viewTodoSlice.actions;

export default viewTodoSlice.reducer;
