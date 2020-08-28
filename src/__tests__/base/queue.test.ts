import Queue from '../../base/queue';

describe('DS Queue should work correctly', () => {
  it('should work correctly', () => {
    const queue = new Queue();

    expect(queue.isEmpty()).toEqual(true);
    expect(() => queue.dequeue()).toThrowError('queue is empty');

    queue.enqueue(1);
    expect(queue.isEmpty()).toEqual(false);

    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.isEmpty()).toEqual(true);
  });
});
