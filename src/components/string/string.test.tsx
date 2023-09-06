import { StringComponent } from "./string";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

describe("String Component", () => {
  it("reverse even number of letters", () => {});

  it("reverse odd number of letters", () => {});

  it("works with string of one letter", () => {});

  it("works with empty string", () => {
    // render(
    //   <MemoryRouter>
    //     <StringComponent />
    //   </MemoryRouter>
    // );
    // const input = screen.getByRole("textbox");
    // expect(input).toBeInTheDocument();
  });
});
