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

  for (let i = 0; i < arr.length - 1; i++) {
    let maxInd = i;
    arr[maxInd - 1] = { ...arr[maxInd - 1], status: ElementStates.Modified };
    for (let j = maxInd; j < arr.length; j++) {
      if (type === "increasing" && arr[j].value < arr[maxInd].value) {
        swap(arr, maxInd, j);
      } else if (type === "decreasing" && arr[j].value > arr[maxInd].value) {
        swap(arr, maxInd, j);
      }
    }
    arr[maxInd] = { ...arr[maxInd], status: ElementStates.Changing };
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
