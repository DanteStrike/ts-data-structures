import LinkedListNode from '../linked-list-node';

describe('DS LinkedListNode should work correctly', () => {
  it('should init', () => {
    const mockValue = 'any';
    const linkedListNode = new LinkedListNode(mockValue);

    expect(linkedListNode).toEqual({
      value: mockValue,
      next: undefined,
    });
  });
});
