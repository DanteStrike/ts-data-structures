import PriorityQueue from '../../base/priority-queue';

describe('DS PriorityQueue should work correctly', () => {
  it('should init', () => {
    const queue = new PriorityQueue([
      { priority: 50, value: '50-1' },
      { priority: 60, value: '60-1' },
      { priority: 0, value: '0-1' },
      { priority: 10, value: '10-1' },
      { priority: 10, value: '10-2' },
      { priority: 60, value: '60-2' },
    ]);
    expect(queue.toArray()).toMatchObject([
      { priority: 60, value: '60-1' },
      { priority: 60, value: '60-2' },
      { priority: 50, value: '50-1' },
      { priority: 10, value: '10-1' },
      { priority: 10, value: '10-2' },
      { priority: 0, value: '0-1' },
    ]);
  });

  it('should enqueue', () => {
    const queue = new PriorityQueue([]);
    expect(queue.isEmpty()).toBe(true);
    expect(queue.getSize()).toBe(0);

    queue.enqueue({ priority: 50, value: '50-1' }, { priority: 60, value: '60-1' }, { priority: 0, value: '0-1' });
    queue.enqueue({ priority: 10, value: '10-1' }, { priority: 10, value: '10-2' }, { priority: 60, value: '60-2' });
    queue.enqueue({ priority: 60, value: '60-3' });
    queue.enqueue({ priority: 10, value: '10-3' }, { priority: 10, value: '10-4' });
    queue.enqueue({ priority: 60, value: '60-4' });

    expect(queue.toArray()).toMatchObject([
      { priority: 60, value: '60-1' },
      { priority: 60, value: '60-2' },
      { priority: 60, value: '60-3' },
      { priority: 60, value: '60-4' },
      { priority: 50, value: '50-1' },
      { priority: 10, value: '10-1' },
      { priority: 10, value: '10-2' },
      { priority: 10, value: '10-3' },
      { priority: 10, value: '10-4' },
      { priority: 0, value: '0-1' },
    ]);
    expect(queue.isEmpty()).toBe(false);
    expect(queue.getSize()).toBe(10);
  });

  it('should stable dequeue', () => {
    const queue = new PriorityQueue([
      { priority: 100, value: '100-1' },
      { priority: 60, value: '60-1' },
      { priority: 100, value: '100-2' },
      { priority: 10, value: '10-1' },
      { priority: 10, value: '10-2' },
      { priority: 60, value: '60-2' },
      { priority: 60, value: '60-3' },
      { priority: 100, value: '100-3' },
      { priority: 60, value: '60-4' },
      { priority: 10, value: '10-3' },
      { priority: 10, value: '10-4' },
      { priority: 60, value: '60-5' },
    ]);

    expect(queue.dequeue()).toMatchObject({ priority: 100, value: '100-1' });
    expect(queue.dequeue()).toMatchObject({ priority: 100, value: '100-2' });
    expect(queue.dequeue()).toMatchObject({ priority: 100, value: '100-3' });
    expect(queue.dequeue()).toMatchObject({ priority: 60, value: '60-1' });
    expect(queue.dequeue()).toMatchObject({ priority: 60, value: '60-2' });
    expect(queue.dequeue()).toMatchObject({ priority: 60, value: '60-3' });
    expect(queue.dequeue()).toMatchObject({ priority: 60, value: '60-4' });
    expect(queue.dequeue()).toMatchObject({ priority: 60, value: '60-5' });
    expect(queue.dequeue()).toMatchObject({ priority: 10, value: '10-1' });
    expect(queue.dequeue()).toMatchObject({ priority: 10, value: '10-2' });
    expect(queue.dequeue()).toMatchObject({ priority: 10, value: '10-3' });
    expect(queue.dequeue()).toMatchObject({ priority: 10, value: '10-4' });
    expect(() => queue.dequeue()).toThrowError('queue is empty');
  });

  it('should reverse behavior', () => {
    const queue = new PriorityQueue(
      [
        { priority: 100, value: '100-1' },
        { priority: 60, value: '60-1' },
        { priority: 100, value: '100-2' },
        { priority: 10, value: '10-1' },
        { priority: 10, value: '10-2' },
        { priority: 60, value: '60-2' },
        { priority: 60, value: '60-3' },
        { priority: 100, value: '100-3' },
        { priority: 60, value: '60-4' },
        { priority: 10, value: '10-3' },
        { priority: 10, value: '10-4' },
        { priority: 60, value: '60-5' },
      ],
      true
    );

    expect(queue.toArray()).toMatchObject([
      { priority: 10, value: '10-1' },
      { priority: 10, value: '10-2' },
      { priority: 10, value: '10-3' },
      { priority: 10, value: '10-4' },
      { priority: 60, value: '60-1' },
      { priority: 60, value: '60-2' },
      { priority: 60, value: '60-3' },
      { priority: 60, value: '60-4' },
      { priority: 60, value: '60-5' },
      { priority: 100, value: '100-1' },
      { priority: 100, value: '100-2' },
      { priority: 100, value: '100-3' },
    ]);

    expect(queue.dequeue()).toMatchObject({ priority: 10, value: '10-1' });
    expect(queue.dequeue()).toMatchObject({ priority: 10, value: '10-2' });
    expect(queue.dequeue()).toMatchObject({ priority: 10, value: '10-3' });
    expect(queue.dequeue()).toMatchObject({ priority: 10, value: '10-4' });
    expect(queue.dequeue()).toMatchObject({ priority: 60, value: '60-1' });
    expect(queue.dequeue()).toMatchObject({ priority: 60, value: '60-2' });
    expect(queue.dequeue()).toMatchObject({ priority: 60, value: '60-3' });
    expect(queue.dequeue()).toMatchObject({ priority: 60, value: '60-4' });
    expect(queue.dequeue()).toMatchObject({ priority: 60, value: '60-5' });
    expect(queue.dequeue()).toMatchObject({ priority: 100, value: '100-1' });
    expect(queue.dequeue()).toMatchObject({ priority: 100, value: '100-2' });
    expect(queue.dequeue()).toMatchObject({ priority: 100, value: '100-3' });
    expect(() => queue.dequeue()).toThrowError('queue is empty');
  });
});
