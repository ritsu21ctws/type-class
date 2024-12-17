import { Todo } from "@/domain/todo";
import App from "../App";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen, waitFor } from "@testing-library/react";

const mockGetAllTodos = jest
  .fn()
  .mockResolvedValue([
    new Todo("1", "title1", false, "2021-01-01T00:00:00Z"),
    new Todo("2", "title2", false, "2021-01-02T00:00:00Z"),
    new Todo("3", "title3", false, "2021-01-03T00:00:00Z"),
    new Todo("4", "title4", false, "2021-01-04T00:00:00Z")
  ]);

jest.mock("@/lib/todo", () => {
  return {
    GetAllTodos: () => mockGetAllTodos()
  };
});

describe("App", () => {
  test("タイトルがあること", async() => {
    render(<ChakraProvider value={defaultSystem}><App /></ChakraProvider>);

    await waitFor(() => screen.getByTestId("table"));
    const title = screen.getByTestId("title");

    expect(title).toBeInTheDocument();
  });

  test("TODOガ4つ表示されること", async() => {
    render(<ChakraProvider value={defaultSystem}><App /></ChakraProvider>);

    await waitFor(() => screen.getByTestId("table"));
    const todos = screen.getByTestId("table").querySelectorAll("tr");

    expect(todos.length - 1).toBe(4);
  });
});