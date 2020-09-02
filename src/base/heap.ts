class Heap<T> {
  private container: T[];
  private readonly compFunc: (a: T, b: T) => boolean;

  constructor(arr: T[] = [], compFunc: (a: T, b: T) => boolean = (a, b) => a > b) {
    this.container = arr.slice();
    this.compFunc = compFunc;
    this.build();
  }

  private static getParentNode(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  private static hasParent(childIndex: number): boolean {
    return childIndex !== 0;
  }

  private static getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  private static getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  private getNode(nodeIndex: number): T {
    return this.container[nodeIndex];
  }

  private getLeftChild(nodeIndex: number): T {
    return this.container[Heap.getLeftChildIndex(nodeIndex)];
  }

  private getRightChild(nodeIndex: number): T {
    return this.container[Heap.getRightChildIndex(nodeIndex)];
  }

  private checkIndexInRange(index: number): boolean {
    const lastIndex = this.getSize() - 1;
    if (index > lastIndex) {
      throw new Error('out of range');
    }

    return true;
  }

  private swap(aIndex: number, bIndex: number): void {
    const tmp = this.container[aIndex];
    this.container[aIndex] = this.container[bIndex];
    this.container[bIndex] = tmp;
  }

  private heapifyDown(nodeIndex: number): void {
    const heapSize = this.getSize();
    let largestIndex = nodeIndex;
    let curIndex;

    do {
      curIndex = largestIndex;

      const leftChildIndex = Heap.getLeftChildIndex(largestIndex);
      const leftChildValue = this.getLeftChild(largestIndex);

      const rightChildIndex = Heap.getRightChildIndex(largestIndex);
      const rightChildValue = this.getRightChild(largestIndex);

      if (leftChildIndex < heapSize && this.compFunc(leftChildValue, this.getNode(largestIndex))) {
        largestIndex = leftChildIndex;
      }

      if (rightChildIndex < heapSize && this.compFunc(rightChildValue, this.getNode(largestIndex))) {
        largestIndex = rightChildIndex;
      }

      if (largestIndex !== curIndex) {
        this.swap(curIndex, largestIndex);
      }
    } while (largestIndex !== curIndex);
  }

  private heapifyUp(nodeIndex: number): void {
    let valueIndex = nodeIndex;

    if (!Heap.hasParent(valueIndex)) {
      return;
    }

    let curValueIndex;
    do {
      curValueIndex = valueIndex;

      const parentNodeIndex = Heap.getParentNode(curValueIndex);
      const parentNodeValue = this.getNode(parentNodeIndex);

      if (this.compFunc(this.getNode(valueIndex), parentNodeValue)) {
        this.swap(curValueIndex, parentNodeIndex);
        valueIndex = parentNodeIndex;
      }
    } while (valueIndex !== curValueIndex && Heap.hasParent(valueIndex));
  }

  private heapifyValueChange(index: number, oldValue: T, newValue: T) {
    if (this.compFunc(oldValue, newValue)) {
      this.heapifyDown(index);
    } else {
      this.heapifyUp(index);
    }
  }

  private build(): void {
    const heapSize = this.getSize();

    for (let index = Math.floor(heapSize / 2) - 1; index >= 0; index -= 1) {
      this.heapifyDown(index);
    }
  }

  private addOne(value: T): void {
    this.container.push(value);
    const valueIndex = this.getSize() - 1;

    this.heapifyUp(valueIndex);
  }

  public getSize(): number {
    return this.container.length;
  }

  public add(...values: T[]): this {
    values.forEach((value) => this.addOne(value));

    return this;
  }

  public set(index: number, value: T): this {
    this.checkIndexInRange(index);

    const oldValue = this.getNode(index);
    this.container[index] = value;
    if (value !== oldValue) {
      this.heapifyValueChange(index, oldValue, value);
    }

    return this;
  }

  public del(index: number): this {
    this.checkIndexInRange(index);

    const removedValue = this.getNode(index);
    const lastIndex = this.getSize() - 1;
    const lastValue = this.getNode(lastIndex);

    if (lastValue !== removedValue) {
      this.swap(index, lastIndex);
      this.container.pop();
      this.heapifyValueChange(index, removedValue, lastValue);
    } else {
      this.container.pop();
    }

    return this;
  }

  public getRoot(): T {
    if (this.isEmpty()) {
      throw new Error('heap is empty');
    }

    return this.container[0];
  }

  public popRoot(): T {
    const result = this.getRoot();
    this.del(0);

    return result;
  }

  toArray(): T[] {
    return this.container.slice();
  }

  toSortedArray(): T[] {
    const result: T[] = [];
    const backupContainer = this.container.slice();

    while (!this.isEmpty()) {
      result.push(this.popRoot());
    }

    this.container = backupContainer;

    return result;
  }

  isEmpty(): boolean {
    return this.getSize() === 0;
  }
}

export default Heap;
