import { TodoT } from "../types/TodoT";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrlNestApi from "../shared/baseUrlNestApi";

export interface EntityPage {
  amount?: number;
  page?: number;
}

export const todosAPI = createApi({
  reducerPath: "todosPath",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrlNestApi }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    fetchAllTodos: builder.query<TodoT[], EntityPage | null>({
      query: (options) => ({
        url: "todos",
        params: {
          _limit: options?.amount,
        },
      }),
      providesTags: ["Todos"],
    }),

    completeTheTodo: builder.mutation<TodoT, Partial<TodoT>>({
      query(data) {
        const { id } = data;
        return {
          url: `todos/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Todos"],
    }),
    deleteTheTodo: builder.mutation<TodoT, Partial<TodoT>>({
      query(data) {
        const { id } = data;
        return {
          url: `todos/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Todos"],
    }),
    createATodo: builder.mutation<TodoT, Partial<TodoT>>({
      query(data) {
        const { title: newTodoTitle, body: newTodoBody } = data;
        const newTodo = {
          title: newTodoTitle,
          body: newTodoBody,
          isComplete: false,
        };
        return {
          url: `todos`,
          method: "POST",
          body: newTodo,
        };
      },
      invalidatesTags: ["Todos"],
    }),
    editTheTodo: builder.mutation<TodoT, Partial<TodoT>>({
      query(data) {
        const { id: idOfTodoBeingEdited } = data;
        return {
          url: `todos/${idOfTodoBeingEdited}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Todos"],
    }),
  }),
});
