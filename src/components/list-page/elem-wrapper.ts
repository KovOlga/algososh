import { ElementStates } from "../../types/element-states";

export class ElemWrapper<T> {
  value: T;
  isCircleAbove: boolean;
  isCircleBelow: boolean;
  head: boolean;
  tail: boolean;
  status: ElementStates;

  constructor(
    value: T,
    status: ElementStates = ElementStates.Default,
    isCircleAbove = false,
    isCircleBelow = false,
    head = false,
    tail = false
  ) {
    this.value = value;
    this.status = status;
    this.isCircleAbove = isCircleAbove;
    this.isCircleBelow = isCircleBelow;
    this.head = head;
    this.tail = tail;
  }

  public fromArray(values: T[]): ElemWrapper<T>[] {
    let resultArray: ElemWrapper<T>[] = [];
    if (values) {
      resultArray = values.map((value) => new ElemWrapper<T>(value));
      resultArray[0].head = true;
      resultArray[resultArray.length - 1].tail = true;
    }
    return resultArray;
  }
}
