import { ElementStates } from "../../types/element-states";

export const swap = (
  arr: { value: number; status: ElementStates }[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};
