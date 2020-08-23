import DoubleLinkedList from '../../../base/double-linked-list/double-linked-list';
import DoubleLinkedListNode from '../../../base/double-linked-list/double-linked-list-node';
import { Position } from '../../../enum';

describe('DS DoubleLinkedList should work correctly', () => {
  it('should init list from array', () => {
    const linkedList = new DoubleLinkedList([1, 3, 4]);
    expect(linkedList.getHead()).toMatchObject({
      value: 1,
      next: {
        value: 3,
        next: {
          value: 4,
          next: undefined,
          prev: {
            value: 3,
          },
        },
        prev: {
          value: 1,
        },
      },
      prev: undefined,
    });
    expect(linkedList.getSize()).toBe(3);
  });

  it('should find element by cb', () => {
    const linkedList = new DoubleLinkedList([1, 2, 3, 4, 5]);

    expect(linkedList.findNode((node) => node.value === 3)).toMatchObject({
      value: 3,
      next: {
        value: 4,
      },
      prev: {
        value: 2,
      },
    });

    expect(linkedList.findNode((node) => (node.prev ? node.prev.value === 4 : false))).toMatchObject({
      value: 5,
      next: undefined,
      prev: {
        value: 4,
      },
    });
    expect(linkedList.findNode((node) => (node.prev ? node.prev.value === 4 : false))).toEqual(linkedList.getTail());

    // eslint-disable-next-line unicorn/no-null
    expect(linkedList.findNode((node) => node.value === 999)).toEqual(null);
  });

  it('should find all elements by cb', () => {
    const linkedList = new DoubleLinkedList([1, 2, 1, 4, 1]);
    const nodes = linkedList.findNodes((node) => (node.prev ? node.prev.value === 1 : false));

    expect(nodes.length).toBe(2);
    expect(nodes[0]).toMatchObject({
      value: 2,
      next: {
        value: 1,
      },
      prev: {
        value: 1,
      },
    });
    expect(nodes[1]).toMatchObject({
      value: 4,
      next: {
        value: 1,
      },
      prev: {
        value: 1,
      },
    });

    expect(linkedList.findNodes((node) => (node.prev ? node.prev.value === 999 : false))).toEqual([]);
  });

  it('should add elements', () => {
    const linkedList: DoubleLinkedList<number> = new DoubleLinkedList([1, 2, 8, 4]);
    const listPos: DoubleLinkedListNode<number> | null = linkedList.findNode((node) => node.value === 8);
    linkedList.add(99, Position.AFTER, listPos);
    expect(linkedList.toArray()).toEqual([1, 2, 8, 99, 4]);
  });

  it('should delete elements', () => {
    const linkedList = new DoubleLinkedList([2, 4, 8]);

    linkedList.delete(linkedList.findNode((node) => node.value === 666));
    linkedList.delete(new DoubleLinkedListNode<number>(0));
    expect(linkedList.toArray()).toEqual([2, 4, 8]);
    expect(linkedList.getSize()).toBe(3);

    linkedList.delete(linkedList.findNode((node) => node.value === 4));
    expect(linkedList.toArray()).toEqual([2, 8]);
    expect(linkedList.getSize()).toBe(2);

    linkedList.delete();
    linkedList.delete();
    expect(linkedList.toArray()).toEqual([]);
    expect(linkedList.getSize()).toBe(0);
  });

  it('should chain methods', () => {
    const linkedList = new DoubleLinkedList([3, 3, 3]);

    linkedList
      .clear()
      .push(1, 2)
      .pushFront(4, 4)
      .pop()
      .popFront()
      .add(5)
      .delete(linkedList.findNode((node) => (node.prev ? node.prev.value === 1 : false)));

    expect(linkedList.toArray()).toEqual([4, 1]);
  });
});
