import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "../shared/utils/test-utils";
import TodoContainer from "../components/TodoContainer";
import { server } from "../test/server/test-server";

// Enable API mocking before tests.
beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("loads and displays initial todos", async () => {
  renderWithProviders(<TodoContainer />);

  expect(await screen.findByText(/Todos:/i)).toBeInTheDocument();
  expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
  expect(await screen.findByText(/groceries/i)).toBeInTheDocument();
  expect(await screen.findByText(/comprare/i)).toBeInTheDocument();

  expect(
    await screen.findAllByRole("button", { name: /delete/i })
  ).toHaveLength(2); // way of checking if both todos from the backend were loaded
});

test("can delete a todo", async () => {
  renderWithProviders(<TodoContainer />);

  const deleteButtons = await screen.findAllByRole("button", {
    name: /delete/i,
  });
  expect(deleteButtons).toHaveLength(2);
  expect(await screen.findByText(/eaque nam/i)).toBeInTheDocument();

  // clicking the "delete" button on the first todo
  fireEvent.click(deleteButtons[0]);

  expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading.../i));
  // checking if now only 1 todo is displayed - that the other got deleted
  expect(screen.queryByText(/eaque nam/i)).not.toBeInTheDocument();
  expect(
    await screen.findAllByRole("button", { name: /delete/i })
  ).toHaveLength(1);
});

test("can complete and uncomplete a todo", async () => {
  renderWithProviders(<TodoContainer />);

  let completeButtons = await screen.findAllByRole("button", {
    name: /complete/i,
  });
  // completing the first todo
  fireEvent.click(completeButtons[0]);
  expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading.../i));
  // checking if the first todo has been completed
  completeButtons = await screen.findAllByRole("button", { name: /complete/i });
  expect(completeButtons[0]).toHaveClass("complete-button--complete");

  // uncompleting the first todo
  fireEvent.click(completeButtons[0]);
  expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading.../i));
  // checking if the first todo has been now uncompleted
  completeButtons = await screen.findAllByRole("button", { name: /complete/i });
  expect(completeButtons[0]).not.toHaveClass("complete-button--complete");
});
