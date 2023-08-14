import { ElementStates } from "../../types/element-states";

export const swap = (
  arr: { value: number; status: string }[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const getSortedArr = (
  arr: { value: number; status: ElementStates }[],
  type: string
): { value: number; status: ElementStates }[][] => {
  const matrix: { value: number; status: ElementStates }[][] = [];
  matrix.push([...arr]);

  for (let outerIndex = 0; outerIndex < arr.length; outerIndex++) {
    arr[outerIndex] = {
      ...arr[outerIndex],
      status: ElementStates.Changing,
    };
    for (
      let innerIndex = outerIndex + 1;
      innerIndex < arr.length;
      innerIndex++
    ) {
      const elemToSwap = arr[innerIndex];
      elemToSwap.status = ElementStates.Changing;
      matrix.push([...arr]);
      if (
        type === "increasing" &&
        arr[innerIndex].value < arr[outerIndex].value
      ) {
        swap(arr, outerIndex, innerIndex);
        elemToSwap.status = ElementStates.Modified;
        matrix.push([...arr]);
      } else if (
        type === "decreasing" &&
        arr[innerIndex].value > arr[outerIndex].value
      ) {
        swap(arr, outerIndex, innerIndex);
        elemToSwap.status = ElementStates.Modified;
        matrix.push([...arr]);
      } else {
        elemToSwap.status = ElementStates.Default;
        matrix.push([...arr]);
      }
    }
    arr[outerIndex] = { ...arr[outerIndex], status: ElementStates.Modified };
    matrix.push([...arr]);
  }
  console.log("matrix", matrix);

  return matrix;
};

export const getBubbleSortedArr = (arr: number[], type: string): number[] => {
  //   for (let i = 0; i < arr.length; i++) {
  //     for (let j = 0; j < arr.length; j++) {
  //       if (type === "increasing" && arr[j] > arr[j + 1]) {
  //         swap(arr, j, j + 1);
  //       } else if (type === "decreasing" && arr[j] < arr[j + 1]) {
  //         swap(arr, j, j + 1);
  //       }
  //     }
  //   }

  return arr;
};
