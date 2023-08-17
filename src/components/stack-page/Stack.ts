interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length > 0) {
      this.container.pop();
    }
  };

  clear = () => {
    this.container = [];
  };

  get stackSize() {
    return this.container.length;
  }

  get lastElement() {
    return this.container.length - 1;
  }

  get elements() {
    return this.container;
  }
}
