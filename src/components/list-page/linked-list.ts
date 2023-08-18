export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  addByIndex: (element: T, position: number) => void;
  getSize: () => number;
  toArray: () => number[];
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  list: any;
  initialArray: T[] | null;
  constructor(initialArr: T[]) {
    this.head = null;
    this.size = 0;
    this.initialArray = initialArr === undefined ? null : initialArr;

    if (this.initialArray) {
      this.initialArray.forEach((value) => this.append(value));
    }
  }

  toArray() {
    if (this.head === null) return [];
    this.list = [];
    let current: Node<T> | null = this.head;

    do {
      this.list.push(current);
      current = current.next;
    } while (current);

    console.log("list", this.list);

    return this.list;
  }

  deleteByIndex(position: number) {
    // If linked list is empty
    // if (this.head === null)
    //     return;

    let temp = this.head;
    if (position === 0) {
      this.deleteHead();
    } else {
      for (let i = 0; temp != null && i < position - 1; i++) temp = temp.next;
      if (temp === null || temp.next === null) return;
      let next = temp.next.next;
      temp.next = next;
    }
  }

  addByIndex(element: T, currIndex: number) {
    if (currIndex < 0 || currIndex > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);

      let currentNode = this.head;
      if (currIndex === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let prevNode = null;
        let index = 0;
        while (index++ < currIndex) {
          prevNode = currentNode;
          currentNode = currentNode!.next;
        }
        prevNode!.next = node;
        node.next = currentNode;
      }

      this.size++;
    }
  }

  prepend(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      this.head = node;
      this.head.next = current;
    }
    this.size++;
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  deleteHead() {
    if (this.head?.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
    }
  }

  deleteTail() {
    if (this.head !== null) {
      let current = this.head;
      while (current.next?.next) {
        current = current.next;
      }
      console.log("current", current);
      current.next = null;
      console.log("current", current);
    }
  }

  getSize() {
    return this.size;
  }
}
