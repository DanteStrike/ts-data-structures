import LinkedList from '../linked-list';
import { Position } from '../enum';

describe('DS LinkedList should work correctly', () => {
  it('should init empty list (default)', () => {
    const linkedList = new LinkedList();

    expect(linkedList.getHead()).toBe(undefined);
    expect(linkedList.getTail()).toBe(undefined);
    expect(linkedList.toArray()).toEqual([]);
    expect(linkedList.toString()).toBe(``);
    expect(linkedList.getSize()).toBe(0);
  });

  it('should init list from array', () => {
    const linkedList = new LinkedList([1, 3, 4, 66, 111, 9]);
    expect(linkedList.getHead()).toMatchObject({
      value: 1,
    });
    expect(linkedList.getTail()).toMatchObject({
      value: 9,
    });
    expect(linkedList.toArray()).toEqual([1, 3, 4, 66, 111, 9]);
    expect(linkedList.toString()).toBe(`1,3,4,66,111,9`);
    expect(linkedList.getSize()).toBe(6);
  });

  it('should push new elements to list end', () => {
    const linkedList = new LinkedList();
    const mockDataOne = `test-data-1`;
    const mockDataTwo = `test-data-2`;

    linkedList.push(mockDataOne);
    expect(linkedList.getHead()).toMatchObject({
      value: mockDataOne,
    });
    expect(linkedList.getTail()).toEqual(linkedList.getHead());

    linkedList.push(mockDataTwo);
    expect(linkedList.getHead()).toMatchObject({
      value: mockDataOne,
    });
    expect(linkedList.getTail()).toMatchObject({
      value: mockDataTwo,
    });

    linkedList.push(...[`test-data-3`, `test-data-4`]);
    expect(linkedList.getTail()).toMatchObject({
      value: `test-data-4`,
    });
  });

  it('should pop elements from list end', () => {
    const linkedList = new LinkedList([1, 2, 3, 4]);

    linkedList.pop();
    expect(linkedList.getTail()).toMatchObject({
      value: 3,
    });

    linkedList.pop();
    expect(linkedList.getTail()).toMatchObject({
      value: 2,
    });

    linkedList.pop();
    expect(linkedList.getTail()).toMatchObject({
      value: 1,
    });

    linkedList.pop();
    expect(linkedList.getHead()).toBe(undefined);
    expect(linkedList.getTail()).toBe(undefined);
  });

  it('should pushFront new elements to list front', () => {
    const linkedList = new LinkedList();
    const mockDataOne = `test-data-1`;
    const mockDataTwo = `test-data-2`;

    linkedList.pushFront(mockDataOne);

    expect(linkedList.getHead()).toMatchObject({
      value: mockDataOne,
    });
    expect(linkedList.getTail()).toEqual(linkedList.getHead());

    linkedList.pushFront(mockDataTwo);
    expect(linkedList.getHead()).toMatchObject({
      value: mockDataTwo,
    });
    expect(linkedList.getTail()).toMatchObject({
      value: mockDataOne,
    });

    linkedList.pushFront(...[`test-data-3`, `test-data-4`]);
    expect(linkedList.getHead()).toMatchObject({
      value: `test-data-4`,
    });
  });

  it('should popFront elements from list front', () => {
    const linkedList = new LinkedList([1, 2, 3, 4]);

    linkedList.popFront();
    expect(linkedList.getHead()).toMatchObject({
      value: 2,
    });
    linkedList.popFront();
    expect(linkedList.getHead()).toMatchObject({
      value: 3,
    });
    linkedList.popFront();
    expect(linkedList.getHead()).toMatchObject({
      value: 4,
    });
    linkedList.popFront();
    expect(linkedList.getHead()).toBe(undefined);
    expect(linkedList.getTail()).toBe(undefined);
  });

  it('should find elements by value', () => {
    const linkedList = new LinkedList([1, 2, 3, 4, 5]);

    expect(linkedList.findNode(3)).toMatchObject({
      value: 3,
      next: {
        value: 4,
      },
    });

    expect(linkedList.findNode(999)).toEqual(undefined);
  });

  it('should add elements', () => {
    const linkedList = new LinkedList();

    linkedList.add(2);
    expect(linkedList.toArray()).toEqual([2]);
    expect(linkedList.getSize()).toBe(1);

    linkedList.add(4);
    expect(linkedList.toArray()).toEqual([2, 4]);
    expect(linkedList.getSize()).toBe(2);

    linkedList.add(9);
    expect(linkedList.toArray()).toEqual([2, 4, 9]);
    expect(linkedList.getSize()).toBe(3);

    linkedList.add(1, Position.BEFORE, linkedList.getHead());
    expect(linkedList.toArray()).toEqual([1, 2, 4, 9]);
    expect(linkedList.getSize()).toBe(4);

    linkedList.add(8, Position.BEFORE, linkedList.getTail());
    expect(linkedList.toArray()).toEqual([1, 2, 4, 8, 9]);
    expect(linkedList.getSize()).toBe(5);

    linkedList.add(666, Position.AFTER);
    expect(linkedList.toArray()).toEqual([1, 2, 4, 8, 9, 666]);
    expect(linkedList.getSize()).toBe(6);

    expect(() =>
      linkedList.add(777, Position.AFTER, {
        value: 555,
        next: undefined,
      })
    ).toThrowError('listNode not found');
    expect(() =>
      linkedList.add(777, Position.BEFORE, {
        value: 555,
        next: undefined,
      })
    ).toThrowError('listNode not found');
    expect(linkedList.toArray()).toEqual([1, 2, 4, 8, 9, 666]);
    expect(linkedList.getSize()).toBe(6);
  });

  it('should delete elements', () => {
    const linkedList = new LinkedList([1, 2, 4, 8, 9, 666]);
    let listNode;

    expect(() =>
      linkedList.delete({
        value: 999,
        next: undefined,
      })
    ).toThrowError('listNode not found');

    listNode = linkedList.findNode(8);
    linkedList.delete(listNode);
    expect(linkedList.toArray()).toEqual([1, 2, 4, 9, 666]);
    expect(linkedList.getSize()).toBe(5);

    listNode = linkedList.findNode(1);
    linkedList.delete(listNode);
    expect(linkedList.toArray()).toEqual([2, 4, 9, 666]);
    expect(linkedList.getSize()).toBe(4);

    listNode = linkedList.findNode(666);
    linkedList.delete(listNode);
    expect(linkedList.toArray()).toEqual([2, 4, 9]);
    expect(linkedList.getSize()).toBe(3);

    linkedList.delete();
    expect(linkedList.toArray()).toEqual([2, 4]);
    expect(linkedList.getSize()).toBe(2);

    linkedList.delete();
    expect(linkedList.toArray()).toEqual([2]);
    expect(linkedList.getSize()).toBe(1);

    linkedList.delete();
    expect(linkedList.toArray()).toEqual([]);
    expect(linkedList.getSize()).toBe(0);
  });

  // it('should swap ListNodes', () => {
  //   const linkedList = new LinkedList([1]);
  //   linkedList.swap(linkedList.findNode(1), linkedList.findNode(1));
  //   expect(linkedList.toArray()).toEqual([1]);
  //
  //   linkedList.push(2, 3, 4);
  //   linkedList.swap(linkedList.findNode(3), linkedList.findNode(4));
  //   expect(linkedList.toArray()).toEqual([1, 2, 4, 3]);
  //
  //   linkedList.swap(linkedList.findNode(1), linkedList.findNode(4));
  //   expect(linkedList.toArray()).toEqual([4, 2, 1, 3]);
  // });
});
