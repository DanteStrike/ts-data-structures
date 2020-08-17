class LinkedListNode<T> {
  value: T & { toString?: () => string };
  next?: LinkedListNode<T>;

  constructor(value: T) {
    this.value = value;
    this.next = undefined;
  }

  toString(): string {
    return this.value.toString ? this.value.toString() : '[toString not found]';
  }
}

export default LinkedListNode;
