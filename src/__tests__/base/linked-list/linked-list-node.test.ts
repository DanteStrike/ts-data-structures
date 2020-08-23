import LinkedListNode from '../../../base/linked-list/linked-list-node';

describe('DS LinkedListNode should work correctly', () => {
  it('should init', () => {
    const mockValue = 'any';
    const linkedListNode = new LinkedListNode(mockValue);

    expect(linkedListNode).toEqual({
      value: mockValue,
      next: undefined,
    });
  });

  it('should toString', () => {
    const mockStr = 'test';
    const linkedListNodeStr = new LinkedListNode(mockStr);
    expect(linkedListNodeStr.toString()).toEqual('test');

    const mockNumber = 3;
    const linkedListNodeNum = new LinkedListNode(mockNumber);
    expect(linkedListNodeNum.toString()).toEqual('3');

    const mockArr = [1, 3, 4];
    const linkedListNodeArr = new LinkedListNode(mockArr);
    expect(linkedListNodeArr.toString()).toEqual('1,3,4');

    const mockObj = { a: 1 };
    const linkedListNodeObj = new LinkedListNode(mockObj);
    expect(linkedListNodeObj.toString()).toEqual('[object Object]');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const noToStringObj = Object.create(null);
    const linkedListNode = new LinkedListNode(noToStringObj);
    expect(linkedListNode.toString()).toEqual('[toString not found]');
  });
});
