import { render, screen } from "@testing-library/react";
import App from "./app/app";
import userEvent from "@testing-library/user-event";

describe("Test routing", () => {
  test("recursion link works", () => {
    render(<App />);
    expect(screen.getByTestId("main-page")).toBeInTheDocument();

    const recursionLink = screen.getByTestId("recursion-link");

    userEvent.click(recursionLink);
    expect(screen.getByTestId("recursion-page")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("return-link"));
    expect(screen.getByTestId("main-page")).toBeInTheDocument();
  });

  test("fibonacci link works", () => {
    render(<App />);
    expect(screen.getByTestId("main-page")).toBeInTheDocument();

    const fibonacciLink = screen.getByTestId("fibonacci-link");

    userEvent.click(fibonacciLink);
    expect(screen.getByTestId("fibonacci-page")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("return-link"));
    expect(screen.getByTestId("main-page")).toBeInTheDocument();
  });

  test("sorting link works", () => {
    render(<App />);
    expect(screen.getByTestId("main-page")).toBeInTheDocument();

    const sortingLink = screen.getByTestId("sorting-link");

    userEvent.click(sortingLink);
    expect(screen.getByTestId("sorting-page")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("return-link"));
    expect(screen.getByTestId("main-page")).toBeInTheDocument();
  });

  test("stack link works", () => {
    render(<App />);
    expect(screen.getByTestId("main-page")).toBeInTheDocument();

    const stackLink = screen.getByTestId("stack-link");

    userEvent.click(stackLink);
    expect(screen.getByTestId("stack-page")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("return-link"));
    expect(screen.getByTestId("main-page")).toBeInTheDocument();
  });

  test("queue link works", () => {
    render(<App />);
    expect(screen.getByTestId("main-page")).toBeInTheDocument();

    const queueLink = screen.getByTestId("queue-link");

    userEvent.click(queueLink);
    expect(screen.getByTestId("queue-page")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("return-link"));
    expect(screen.getByTestId("main-page")).toBeInTheDocument();
  });

  test("list link works", () => {
    render(<App />);
    expect(screen.getByTestId("main-page")).toBeInTheDocument();

    const listLink = screen.getByTestId("list-link");

    userEvent.click(listLink);
    expect(screen.getByTestId("list-page")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("return-link"));
    expect(screen.getByTestId("main-page")).toBeInTheDocument();
  });
});
