import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";

import todoFormReducer from "./features/todoForm/todoFormSlice";
import todoContainerReducer from "./features/todoContainer/todoContainerSlice";
import authReducer from "./features/auth/authSlice";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  todoForm: todoFormReducer,
  todoContainer: todoContainerReducer,
  auth: authReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
