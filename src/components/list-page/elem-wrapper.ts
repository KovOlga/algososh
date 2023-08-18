import { ElementStates } from "../../types/element-states";

export class ElemWrapper<T> {
  value: T;
  isCircleAbove: boolean;
  isCircleBelow: boolean;
  status: ElementStates;

  constructor(
    value: T,
    status: ElementStates = ElementStates.Default,
    isCircleAbove: boolean = false,
    isCircleBelow: boolean = false
  ) {
    this.value = value;
    this.status = status;
    this.isCircleAbove = isCircleAbove;
    this.isCircleBelow = isCircleBelow;
  }

  public fromArray(values: T[]): ElemWrapper<T>[] {
    let resultArray: ElemWrapper<T>[] = [];
    if (values) {
      resultArray = values.map((value) => new ElemWrapper<T>(value));
    }
    return resultArray;
  }
}
