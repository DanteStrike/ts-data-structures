import LinkedList from '../../../base/linked-list/linked-list';
import LinkedListNode from '../../../base/linked-list/linked-list-node';
import { Position } from '../../../enum';

describe('DS LinkedList should work correctly', () => {
  it('should init empty list (default)', () => {
    const linkedList = new LinkedList();

    expect(linkedList.getHead()).toBe(undefined);
    expect(linkedList.getTail()).toBe(undefined);
    expect(linkedList.toArray()).toEqual([]);
    expect(linkedList.toString()).toBe(``);
    expect(linkedList.getSize()).toBe(0);
    expect(linkedList.isEmpty()).toBe(true);
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
    expect(linkedList.isEmpty()).toBe(false);
  });

  it('should clean list', () => {
    const linkedList = new LinkedList([1, 3, 4, 66, 111, 9]);
    linkedList.clear();
    expect(linkedList.toArray()).toEqual([]);
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
    const linkedList = new LinkedList([1, 2]);
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
    const linkedList = new LinkedList([3, 4]);

    linkedList.popFront();
    expect(linkedList.getHead()).toMatchObject({
      value: 4,
    });
    linkedList.popFront();
    expect(linkedList.getHead()).toBe(undefined);
    expect(linkedList.getTail()).toBe(undefined);
  });

  it('should find element by cb', () => {
    const linkedList = new LinkedList([1, 2, 3, 4, 5]);

    expect(linkedList.findNode((node) => node.value === 3)).toMatchObject({
      value: 3,
      next: {
        value: 4,
      },
    });

    // eslint-disable-next-line unicorn/no-null
    expect(linkedList.findNode((node) => node.value === 999)).toEqual(null);
  });

  it('should find all elements by cb', () => {
    const linkedList = new LinkedList([1, 2, 1, 4, 1]);
    const nodes = linkedList.findNodes((node) => node.value === 1);

    expect(nodes.length).toBe(3);
    expect(nodes[0]).toMatchObject({
      value: 1,
      next: {
        value: 2,
      },
    });
    expect(nodes[1]).toMatchObject({
      value: 1,
      next: {
        value: 4,
      },
    });
    expect(nodes[2]).toMatchObject({
      value: 1,
      next: undefined,
    });

    expect(linkedList.findNodes((node) => node.value === 999)).toEqual([]);
  });

  it('should add elements', () => {
    const linkedList: LinkedList<number> = new LinkedList();

    linkedList.add(2);
    expect(linkedList.toArray()).toEqual([2]);
    expect(linkedList.getSize()).toBe(1);

    linkedList.add(4);
    expect(linkedList.toArray()).toEqual([2, 4]);

    linkedList.add(1, Position.BEFORE, linkedList.getHead());
    expect(linkedList.toArray()).toEqual([1, 2, 4]);

    linkedList.add(8, Position.BEFORE, linkedList.getTail());
    expect(linkedList.toArray()).toEqual([1, 2, 8, 4]);

    const listPos: LinkedListNode<number> | null = linkedList.findNode((node) => node.value === 8);
    linkedList.add(99, Position.AFTER, listPos);
    expect(linkedList.toArray()).toEqual([1, 2, 8, 99, 4]);
  });

  it('should delete elements', () => {
    const linkedList = new LinkedList([1, 2, 4, 8]);
    let listNode;

    listNode = linkedList.findNode((node) => node.value === 4);
    linkedList.delete(listNode);
    expect(linkedList.toArray()).toEqual([1, 2, 8]);
    expect(linkedList.getSize()).toBe(3);

    listNode = linkedList.findNode((node) => node.value === 1);
    linkedList.delete(listNode);
    expect(linkedList.toArray()).toEqual([2, 8]);
    expect(linkedList.getSize()).toBe(2);

    listNode = linkedList.findNode((node) => node.value === 666);
    linkedList.delete(listNode);
    linkedList.delete(new LinkedListNode<number>(0));
    expect(linkedList.toArray()).toEqual([2, 8]);
    expect(linkedList.getSize()).toBe(2);

    linkedList.delete();
    expect(linkedList.toArray()).toEqual([2]);
    expect(linkedList.getSize()).toBe(1);

    linkedList.delete();
    expect(linkedList.toArray()).toEqual([]);
    expect(linkedList.getSize()).toBe(0);
  });

  it('should chain methods', () => {
    const linkedList = new LinkedList([1, 1, 1]);

    linkedList
      .clear()
      .push(3, 9, 2)
      .pushFront(5)
      .pop()
      .popFront()
      .add(5)
      .delete(linkedList.findNode((node) => node.value === 9));

    expect(linkedList.toArray()).toEqual([3, 5]);
  });
});
