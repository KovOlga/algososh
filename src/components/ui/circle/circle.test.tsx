import { ElementStates } from "../../../types/element-states";
import { Circle } from "./circle";
import renderer from "react-test-renderer";

describe("CircleComponent", () => {
  test("Snapshot: circle without letter", () => {
    const tree = renderer.create(<Circle letter="" />);
    expect(tree).toMatchSnapshot();
  });

  test("Snapshot: circle with letters", () => {
    const tree = renderer.create(<Circle letter="random word" />);
    expect(tree).toMatchSnapshot();
  });

  test("Snapshot: circle with head", () => {
    const tree = renderer.create(<Circle head="head" />);
    expect(tree).toMatchSnapshot();
  });

  test("Snapshot: circle with ReactElement in head", () => {
    const tree = renderer.create(<Circle head={<Circle />} />);
    expect(tree).toMatchSnapshot();
  });

  test("Snapshot: circle with tail", () => {
    const tree = renderer.create(<Circle tail="tail" />);
    expect(tree).toMatchSnapshot();
  });

  test("Snapshot: circle with ReactElement in tail", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />);
    expect(tree).toMatchSnapshot();
  });

  test("Snapshot: circle with index", () => {
    const tree = renderer.create(<Circle index={6} />);
    expect(tree).toMatchSnapshot();
  });

  test("Snapshot: circle with prop 'isSmall'", () => {
    const tree = renderer.create(<Circle isSmall />);
    expect(tree).toMatchSnapshot();
  });

  test("Snapshot: circle in Default State", () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />);
    expect(tree).toMatchSnapshot();
  });

  test("Snapshot: circle in Changing State", () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />);
    expect(tree).toMatchSnapshot();
  });

  test("Snapshot: circle in Modified State", () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />);
    expect(tree).toMatchSnapshot();
  });
});
