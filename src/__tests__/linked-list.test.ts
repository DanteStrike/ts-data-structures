import LinkedList from '../linked-list';
import { Position } from '../enum';

describe('DS LinkedList should work correctly', () => {
  it('should init empty list (default)', () => {
    const linkedList: LinkedList<number> = new LinkedList();

    expect(linkedList.getFirst()).toBe(undefined);
    expect(linkedList.getLast()).toBe(undefined);
    expect(linkedList.toArray()).toEqual([]);
    expect(linkedList.toString()).toBe(``);
    expect(linkedList.getSize()).toBe(0);
  });

  it('should init list from array', () => {
    const linkedList: LinkedList<number> = new LinkedList([1, 3, 4, 66, 111, 9]);
    expect(linkedList.getFirst()).toMatchObject({
      value: 1,
    });
    expect(linkedList.getLast()).toMatchObject({
      value: 9,
    });
    expect(linkedList.toArray()).toEqual([1, 3, 4, 66, 111, 9]);
    expect(linkedList.toString()).toBe(`1,3,4,66,111,9`);
    expect(linkedList.getSize()).toBe(6);
  });

  it('should push new elements to list end', () => {
    const linkedList: LinkedList<string> = new LinkedList();
    const mockDataOne = `test-data-1`;
    const mockDataTwo = `test-data-2`;

    linkedList.push(mockDataOne);
    expect(linkedList.getFirst()).toMatchObject({
      value: mockDataOne,
    });
    expect(linkedList.getLast()).toEqual(linkedList.getFirst());

    linkedList.push(mockDataTwo);
    expect(linkedList.getFirst()).toMatchObject({
      value: mockDataOne,
    });
    expect(linkedList.getLast()).toMatchObject({
      value: mockDataTwo,
    });

    linkedList.push(...[`test-data-3`, `test-data-4`]);
    expect(linkedList.getLast()).toMatchObject({
      value: `test-data-4`,
    });
  });

  it('should pop elements from list end', () => {
    const linkedList: LinkedList<number> = new LinkedList([1, 2, 3, 4]);

    linkedList.pop();
    expect(linkedList.getLast()).toMatchObject({
      value: 3,
    });

    linkedList.pop();
    expect(linkedList.getLast()).toMatchObject({
      value: 2,
    });

    linkedList.pop();
    expect(linkedList.getLast()).toMatchObject({
      value: 1,
    });

    linkedList.pop();
    expect(linkedList.getFirst()).toBe(undefined);
    expect(linkedList.getLast()).toBe(undefined);
  });

  it('should pushFront new elements to list front', () => {
    const linkedList: LinkedList<string> = new LinkedList();
    const mockDataOne = `test-data-1`;
    const mockDataTwo = `test-data-2`;

    linkedList.pushFront(mockDataOne);

    expect(linkedList.getFirst()).toMatchObject({
      value: mockDataOne,
    });
    expect(linkedList.getLast()).toEqual(linkedList.getFirst());

    linkedList.pushFront(mockDataTwo);
    expect(linkedList.getFirst()).toMatchObject({
      value: mockDataTwo,
    });
    expect(linkedList.getLast()).toMatchObject({
      value: mockDataOne,
    });

    linkedList.pushFront(...[`test-data-3`, `test-data-4`]);
    expect(linkedList.getFirst()).toMatchObject({
      value: `test-data-4`,
    });
  });

  it('should popFront elements from list front', () => {
    const linkedList: LinkedList<number> = new LinkedList([1, 2, 3, 4]);

    linkedList.popFront();
    expect(linkedList.getFirst()).toMatchObject({
      value: 2,
    });
    linkedList.popFront();
    expect(linkedList.getFirst()).toMatchObject({
      value: 3,
    });
    linkedList.popFront();
    expect(linkedList.getFirst()).toMatchObject({
      value: 4,
    });
    linkedList.popFront();
    expect(linkedList.getFirst()).toBe(undefined);
    expect(linkedList.getLast()).toBe(undefined);
  });

  it('should find elements by value', () => {
    const linkedList: LinkedList<number> = new LinkedList([1, 2, 3, 4, 5]);

    expect(linkedList.findNode(3)).toMatchObject({
      value: 3,
      next: {
        value: 4,
      },
    });

    expect(linkedList.findNode(999)).toEqual(undefined);
  });

  it('should add elements', () => {
    const linkedList: LinkedList<number> = new LinkedList();

    linkedList.add(2);
    expect(linkedList.toArray()).toEqual([2]);

    linkedList.add(4);
    expect(linkedList.toArray()).toEqual([2, 4]);

    linkedList.add(9);
    expect(linkedList.toArray()).toEqual([2, 4, 9]);

    linkedList.add(1, Position.BEFORE, linkedList.getFirst());
    expect(linkedList.toArray()).toEqual([1, 2, 4, 9]);

    linkedList.add(8, Position.BEFORE, linkedList.getLast());
    expect(linkedList.toArray()).toEqual([1, 2, 4, 8, 9]);
  });
});
