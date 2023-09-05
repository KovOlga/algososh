import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";
import renderer from "react-test-renderer";

describe("ButtonComponent", () => {
  test("Component on Screen", () => {
    render(<Button />);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
  });

  test("Snapshot: Button with text", () => {
    const btnText = "clear";
    const tree = renderer.create(<Button text={btnText} />);
    expect(tree).toMatchSnapshot();
  });

  test("Snapshot: Button without text", () => {
    const tree = renderer.create(<Button />);
    expect(tree).toMatchSnapshot();
  });

  test("Snapshot: Button disabled", () => {
    const tree = renderer.create(<Button disabled />);
    expect(tree).toMatchSnapshot();
  });

  test("Snapshot: Button with loader", () => {
    const tree = renderer.create(<Button isLoader />);
    expect(tree).toMatchSnapshot();
  });

  test("Button calls callback when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
