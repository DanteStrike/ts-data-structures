import LinkedList from './linked-list/linked-list';

class Stack<T> {
  private linkedList: LinkedList<T>;

  constructor() {
    this.linkedList = new LinkedList();
  }

  push(value: T): void {
    this.linkedList.pushFront(value);
  }

  top(): T | undefined {
    const result = this.linkedList.getHead();

    return result ? result.value : undefined;
  }

  pop(): T {
    const topValue = this.top();
    if (!topValue) {
      throw new Error('stack is empty');
    }
    this.linkedList.popFront();

    return topValue;
  }

  isEmpty(): boolean {
    return this.linkedList.isEmpty();
  }
}

export default Stack;
