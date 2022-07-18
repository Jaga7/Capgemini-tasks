import { rest } from "msw";
import * as todosDB from "../data/todos";

const URL = "http://localhost";
const PORT = 3000;
const baseURL = `${URL}:${PORT}`;

const endpoint = "todos";

let sleep;
if (process.env.CI) {
  sleep = () => Promise.resolve();
} else if (process.env.NODE_ENV === "test") {
  sleep = () => Promise.resolve();
}

const handlers = [
  rest.get(`${baseURL}/${endpoint}`, async (req, res, ctx) => {
    if (!req.url.searchParams.has("query")) {
      const todos = await todosDB.getTodos();
      return res(ctx.json(todos));
    }
  }),
  rest.post(`${baseURL}/${endpoint}`, async (req, res, ctx) => {
    const newTodo = await req.json(req.params);
    const todos = await todosDB.createATodo(newTodo);
    return res(ctx.json(todos));
  }),

  rest.delete(`${baseURL}/${endpoint}/:todoId`, async (req, res, ctx) => {
    const { todoId } = req.params;
    await todosDB.remove(todoId);
    return res(ctx.json({ success: true }));
  }),
  rest.patch(`${baseURL}/${endpoint}/:todoId`, async (req, res, ctx) => {
    const { todoId } = req.params;
    const newEditedTodo = await req.json(req.params);
    let todos;
    if (newEditedTodo.title && newEditedTodo.body) {
      //checking if we want to edit rather than complete a todo
      todos = await todosDB.editTheTodo(todoId, newEditedTodo);
    } else {
      todos = await todosDB.completeTheTodo(todoId);
    }
    return res(ctx.json(todos));
  }),
].map((handler) => {
  const originalResolver = handler.resolver;
  handler.resolver = async function resolver(req, res, ctx) {
    try {
      if (shouldFail(req)) {
        throw new Error("Request failure (for testing purposes).");
      }
      const result = await originalResolver(req, res, ctx);
      return result;
    } catch (error) {
      const status = error.status || 500;
      return res(
        ctx.status(status),
        ctx.json({ status, message: error.message || "Unknown Error" })
      );
    } finally {
      await sleep();
    }
  };
  return handler;
});

function shouldFail(req) {
  if (JSON.stringify(req.body)?.includes("FAIL")) return true;
  if (req.url.searchParams.toString()?.includes("FAIL")) return true;
  if (process.env.NODE_ENV === "test") return false;

  return false;
}

export { handlers };
