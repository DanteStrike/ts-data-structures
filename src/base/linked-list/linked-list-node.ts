class LinkedListNode<T> {
  value: T & { toString?: () => string };
  next?: LinkedListNode<T>;

  constructor(value: T, next?: LinkedListNode<T>) {
    this.value = value;
    this.next = next;
  }

  toString(): string {
    return this.value.toString ? this.value.toString() : '[toString not found]';
  }
}

export default LinkedListNode;
