import Heap from './heap';

type PriorityMember<T> = { priority: number; value: T };
type StablePriorityMember<T> = {
  id: number;
  member: PriorityMember<T>;
};

class PriorityQueue<T> {
  private readonly stableHeap: Heap<StablePriorityMember<T>>;
  private counter = 0;

  constructor(members: PriorityMember<T>[] = [], isReverseBehavior = false) {
    const stableMembers = this.stabilizeMembers(members);
    const priorityComparator: (a: StablePriorityMember<T>, b: StablePriorityMember<T>) => boolean = isReverseBehavior
      ? (a, b) => a.member.priority < b.member.priority
      : (a, b) => a.member.priority > b.member.priority;

    this.stableHeap = new Heap<StablePriorityMember<T>>(stableMembers, (a, b) =>
      a.member.priority !== b.member.priority ? priorityComparator(a, b) : a.id < b.id
    );
  }

  private stabilizeMembers(members: PriorityMember<T>[]): StablePriorityMember<T>[] {
    return members.map((member) => {
      const stableMember = { id: this.counter, member };
      this.counter += 1;

      return stableMember;
    });
  }

  private revertStabilization(stableMembers: StablePriorityMember<T>[]): PriorityMember<T>[];
  private revertStabilization(stableMembers: StablePriorityMember<T>): PriorityMember<T>;
  // eslint-disable-next-line class-methods-use-this
  private revertStabilization(
    stableMembers: StablePriorityMember<T>[] | StablePriorityMember<T>
  ): PriorityMember<T>[] | PriorityMember<T> {
    if (Array.isArray(stableMembers)) {
      return stableMembers.map((stableMember) => stableMember.member);
    }

    return stableMembers.member;
  }

  enqueue(...members: PriorityMember<T>[]): this {
    const stableMembers = this.stabilizeMembers(members);
    this.stableHeap.add(...stableMembers);

    return this;
  }

  dequeue(): PriorityMember<T> {
    if (this.isEmpty()) {
      throw new Error('queue is empty');
    }

    return this.revertStabilization(this.stableHeap.popRoot());
  }

  getSize(): number {
    return this.stableHeap.getSize();
  }

  isEmpty(): boolean {
    return this.stableHeap.isEmpty();
  }

  toArray(): PriorityMember<T>[] {
    return this.revertStabilization(this.stableHeap.toSortedArray());
  }
}

export default PriorityQueue;
