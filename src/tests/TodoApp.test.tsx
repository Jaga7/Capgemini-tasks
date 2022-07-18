import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "../shared/utils/test-utils";
import TodoApp from "../TodoApp";
import { server } from "../test/server/test-server";
import userEvent from "@testing-library/user-event";

// Enable API mocking before tests.
beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

// create
test("can create a todo", async () => {
  renderWithProviders(<TodoApp />);

  // typing "some title of a newly created todo" into the title form input
  userEvent.type(
    await screen.findByPlaceholderText("Title"),
    "some title of a newly created todo"
  );
  expect(
    await screen.findByDisplayValue(/some title of a newly created todo/i)
  ).toBeInTheDocument();

  // typing "some body of a newly created todo" into the title form input
  userEvent.type(
    await screen.findByPlaceholderText("Body"),
    "some body of a newly created todo"
  );
  expect(
    await screen.findByDisplayValue(/some body of a newly created todo/i)
  ).toBeInTheDocument();

  //checking that the todo is not there yet
  expect(
    screen.queryByText(/some title of a newly created todo/i)
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText(/some body of a newly created todo/i)
  ).not.toBeInTheDocument();

  //clicking "create todo" button
  fireEvent.click(
    await screen.findByRole("button", {
      name: /create todo/i,
    })
  );

  expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading.../i));

  //checking if the todo has been created
  expect(
    await screen.findByText(/some title of a newly created todo/i)
  ).toBeInTheDocument();
  expect(
    await screen.findByText(/some body of a newly created todo/i)
  ).toBeInTheDocument();
});

// edit
test("can edit a todo", async () => {
  renderWithProviders(<TodoApp />);

  const editButtons = await screen.findAllByRole("button", {
    name: /edit/i,
  });

  fireEvent.click(editButtons[1]); // start editing todo which has a title "groceries" and a body "buy potatoes"
  expect(await screen.findByDisplayValue(/groceries/i)).toBeInTheDocument();
  // typing " and chores" into title form input
  userEvent.type(await screen.findByDisplayValue(/groceries/i), " and chores");
  // typing " and clean the room" into body form input
  userEvent.type(
    await screen.findByDisplayValue(/buy potatoes/i),
    " and clean the room"
  );
  // saving the edited todo
  fireEvent.click(
    await screen.findByRole("button", {
      name: /save todo/i,
    })
  );
  expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading.../i));
  //checking if the todo has been edited
  expect(await screen.findByText(/and chores/i)).toBeInTheDocument();
  expect(await screen.findByText(/and clean the room/i)).toBeInTheDocument();
});

// edit and start editing other
test("can stop editing a todo and instead edit another", async () => {
  renderWithProviders(<TodoApp />);

  const editButtons = await screen.findAllByRole("button", {
    name: /edit/i,
  });

  fireEvent.click(editButtons[1]); // start editing todo which has a title "groceries" and a body "buy potatoes"

  expect(await screen.findByDisplayValue(/groceries/i)).toBeInTheDocument();

  fireEvent.click(editButtons[0]); // start editing the othe todo instead (this one has just some lorem ipsum as its title and body)
  expect(await screen.findByDisplayValue(/eaque nam/i)).toBeInTheDocument();
  // typing some additional text into title form input
  userEvent.type(await screen.findByDisplayValue(/eaque nam/i), " caliente");
  // typing some additional text into body form input
  userEvent.type(await screen.findByDisplayValue(/Dignissimos/i), " vamos");
  // checking if it has been typed in
  expect(await screen.findByDisplayValue(/caliente/i)).toBeInTheDocument();

  // saving the edited todo
  fireEvent.click(
    await screen.findByRole("button", {
      name: /save todo/i,
    })
  );
  expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading.../i));
  //checking if the todo has been edited
  expect(await screen.findByText(/caliente/i)).toBeInTheDocument();
  expect(await screen.findByText(/vamos/i)).toBeInTheDocument();
  //checking if the todo that was to be edited at first (but then user changed his mind and started editing the other todo) is still there in its unedited form
  expect(await screen.findByText(/groceries/i)).toBeInTheDocument();
  expect(await screen.findByText(/buy potatoes/i)).toBeInTheDocument();
});
