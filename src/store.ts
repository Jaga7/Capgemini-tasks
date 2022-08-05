import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";

import todoFormReducer from "./features/todoForm/todoFormSlice";

import authReducer from "./features/auth/authSlice";
import { ErrorCatcher } from "./services/middleware/error";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { todosAPI } from "./services/todos-service";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  todoForm: todoFormReducer,
  auth: authReducer,
  [todosAPI.reducerPath]: todosAPI.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
      getDefaultMiddleware().concat(todosAPI.middleware, ErrorCatcher),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
