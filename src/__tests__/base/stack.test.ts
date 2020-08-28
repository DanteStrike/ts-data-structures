import Stack from '../../base/stack';

describe('DS Stack should work correctly', () => {
  it('should work correctly', () => {
    const stack = new Stack();

    expect(stack.top()).toEqual(undefined);
    expect(() => stack.pop()).toThrowError('stack is empty');
    expect(stack.isEmpty()).toEqual(true);

    stack.push(1);

    expect(stack.isEmpty()).toEqual(false);

    stack.push(2);
    stack.push(3);

    expect(stack.top()).toEqual(3);
    expect(stack.pop()).toEqual(3);
    expect(stack.top()).toEqual(2);
    expect(stack.pop()).toEqual(2);
    expect(stack.top()).toEqual(1);
    expect(stack.pop()).toEqual(1);
    expect(stack.top()).toEqual(undefined);
    expect(() => stack.pop()).toThrowError('stack is empty');
    expect(stack.isEmpty()).toEqual(true);
  });
});
