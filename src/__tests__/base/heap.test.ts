import Heap from '../../base/heap';

describe('DS Heap should work correctly', () => {
  it('should build maxHeap (default)', () => {
    let maxHeap: Heap<number>;

    maxHeap = new Heap<number>([]);
    expect(maxHeap.toArray()).toEqual([]);
    expect(maxHeap.isEmpty()).toBe(true);

    maxHeap = new Heap([50, 40, 30]);
    expect(maxHeap.toArray()).toEqual([50, 40, 30]);
    expect(maxHeap.isEmpty()).toBe(false);

    maxHeap = new Heap([50, 40, 50]);
    expect(maxHeap.toArray()).toEqual([50, 40, 50]);

    maxHeap = new Heap([20, 50, 40]);
    expect(maxHeap.toArray()).toEqual([50, 20, 40]);

    maxHeap = new Heap([20, 30, 50]);
    expect(maxHeap.toArray()).toEqual([50, 30, 20]);

    maxHeap = new Heap([10, 10, 40, 50, 100, 20, 90, 30, 50, 100]);
    expect(maxHeap.toArray()).toEqual([100, 100, 90, 50, 10, 20, 40, 30, 50, 10]);
  });

  it('should add', () => {
    const heap = new Heap<number>([]);

    heap.add(20);
    expect(heap.toArray()).toEqual([20]);

    heap.add(20);
    expect(heap.toArray()).toEqual([20, 20]);

    heap.add(30);
    expect(heap.toArray()).toEqual([30, 20, 20]);

    heap.add(40);
    expect(heap.toArray()).toEqual([40, 30, 20, 20]);

    heap.add(35);
    expect(heap.toArray()).toEqual([40, 35, 20, 20, 30]);

    heap.add(20);
    expect(heap.toArray()).toEqual([40, 35, 20, 20, 30, 20]);

    heap.add(50);
    expect(heap.toArray()).toEqual([50, 35, 40, 20, 30, 20, 20]);

    heap.add(90, 75, 36, 25, 25);
    expect(heap.toArray()).toEqual([90, 75, 40, 50, 36, 25, 20, 20, 35, 30, 25, 20]);
  });

  it('should del', () => {
    const heap = new Heap([90, 75, 80, 50, 36, 75, 80, 30, 40, 30, 20, 75, 70, 78]);
    expect(() => heap.del(14)).toThrowError('out of range');

    heap.del(13);
    expect(heap.toArray()).toEqual([90, 75, 80, 50, 36, 75, 80, 30, 40, 30, 20, 75, 70]);

    heap.del(4);
    expect(heap.toArray()).toEqual([90, 75, 80, 50, 70, 75, 80, 30, 40, 30, 20, 75]);

    heap.del(2);
    expect(heap.toArray()).toEqual([90, 75, 80, 50, 70, 75, 75, 30, 40, 30, 20]);

    heap.del(0);
    expect(heap.toArray()).toEqual([80, 75, 75, 50, 70, 20, 75, 30, 40, 30]);

    const heapZero = new Heap([0]);
    heapZero.del(0);
    expect(heapZero.toArray()).toEqual([]);
  });

  it('should set newValue', () => {
    const heapZero = new Heap([0]);
    heapZero.set(0, 2);
    expect(heapZero.toArray()).toEqual([2]);
    expect(() => heapZero.set(99, 99)).toThrowError('out of range');

    const heap = new Heap([90, 75, 80, 50, 36, 20]);
    heap.set(0, 10);
    expect(heap.toArray()).toEqual([80, 75, 20, 50, 36, 10]);

    heap.set(4, 90);
    expect(heap.toArray()).toEqual([90, 80, 20, 50, 75, 10]);
    heap.set(1, 80);
    expect(heap.toArray()).toEqual([90, 80, 20, 50, 75, 10]);
  });

  it('should get and pop root', () => {
    const heap = new Heap([90, 75, 80, 50]);
    expect(heap.getRoot()).toBe(90);
    expect(heap.toArray()).toEqual([90, 75, 80, 50]);
    expect(heap.popRoot()).toBe(90);
    expect(heap.toArray()).toEqual([80, 75, 50]);
    expect(heap.popRoot()).toBe(80);
    expect(heap.toArray()).toEqual([75, 50]);
    expect(heap.popRoot()).toBe(75);
    expect(heap.toArray()).toEqual([50]);
    expect(heap.popRoot()).toBe(50);

    const emptyHeap = new Heap();
    expect(() => emptyHeap.getRoot()).toThrowError('heap is empty');
    expect(() => emptyHeap.popRoot()).toThrowError('heap is empty');
  });

  it('should build minHeap by compFunc', () => {
    let minHeap: Heap<number>;

    minHeap = new Heap<number>([], (a, b) => a < b);
    expect(minHeap.toArray()).toEqual([]);

    minHeap = new Heap([10, 20, 30], (a, b) => a < b);
    expect(minHeap.toArray()).toEqual([10, 20, 30]);

    minHeap = new Heap([20, 10, 30], (a, b) => a < b);
    expect(minHeap.toArray()).toEqual([10, 20, 30]);

    minHeap = new Heap([20, 30, 10], (a, b) => a < b);
    expect(minHeap.toArray()).toEqual([10, 30, 20]);

    minHeap = new Heap([100, 100, 90, 50, 10, 20], (a, b) => a < b);
    expect(minHeap.toArray()).toEqual([10, 50, 20, 100, 100, 90]);
    expect(minHeap.popRoot()).toBe(10);
    expect(minHeap.toArray()).toEqual([20, 50, 90, 100, 100]);
    expect(minHeap.popRoot()).toBe(20);
    expect(minHeap.toArray()).toEqual([50, 100, 90, 100]);
    expect(minHeap.popRoot()).toBe(50);
    expect(minHeap.toArray()).toEqual([90, 100, 100]);
  });

  it('should heapSort', () => {
    const maxHeap = new Heap([90, 75, 80, 50, 36, 75, 80, 30, 40, 30, 20, 75, 70, 78]);
    expect(maxHeap.toSortedArray()).toEqual([90, 80, 80, 78, 75, 75, 75, 70, 50, 40, 36, 30, 30, 20]);

    const minHeap = new Heap([90, 75, 80, 50, 36, 75, 80, 30, 40, 30, 20, 75, 70, 78], (a, b) => a < b);
    expect(minHeap.toSortedArray()).toEqual([20, 30, 30, 36, 40, 50, 70, 75, 75, 75, 78, 80, 80, 90]);
  });
});
