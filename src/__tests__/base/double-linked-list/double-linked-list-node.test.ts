import DoubleLinkedListNode from '../../../base/double-linked-list/double-linked-list-node';

describe('DS DoubleLinkedListNode should work correctly', () => {
  it('should init', () => {
    const mockValue = 'any';
    const doubleLinkedListNode = new DoubleLinkedListNode(mockValue);

    expect(doubleLinkedListNode).toEqual({
      value: mockValue,
      next: undefined,
      prev: undefined,
    });
  });
});
