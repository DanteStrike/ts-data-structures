import LinkedList from './linked-list/linked-list';

class Queue<T> {
  private linkedList: LinkedList<T>;

  constructor() {
    this.linkedList = new LinkedList<T>();
  }

  enqueue(value: T): void {
    this.linkedList.pushFront(value);
  }

  dequeue(): T {
    const result = this.linkedList.getTail();
    if (!result) {
      throw new Error('queue is empty');
    }
    this.linkedList.pop();

    return result.value;
  }

  isEmpty(): boolean {
    return this.linkedList.isEmpty();
  }
}

export default Queue;
