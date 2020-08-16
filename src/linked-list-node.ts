class LinkedListNode<T> {
  value: T;
  next?: LinkedListNode<T>;

  constructor(value: T) {
    this.value = value;
    this.next = undefined;
  }
}

export default LinkedListNode;
