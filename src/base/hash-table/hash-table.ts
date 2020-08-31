import hashFuncs from './hash-funcs';
import LinkedList from '../linked-list/linked-list';
import LinkedListNode from '../linked-list/linked-list-node';

class HashTable<T> {
  private static readonly defaultTableSize = 32;

  private readonly table: LinkedList<{ key: string; desc: T }>[];
  private readonly hashFunc: (key: string) => number;
  private readonly keys = new Set<string>();

  constructor(tableSize = HashTable.defaultTableSize, hashFunc = hashFuncs.simple) {
    this.table = new Array(tableSize).fill('').map(() => new LinkedList());
    this.hashFunc = hashFunc;
  }

  private hash(key: string): number {
    return this.hashFunc(key) % this.table.length;
  }

  private searchNodeByKey(key: string): LinkedListNode<{ key: string; desc: T }> | null {
    return this.table[this.hash(key)].findNode((node) => (node ? node.value.key === key : false));
  }

  set(key: string, value: T): this {
    const foundedNode = this.searchNodeByKey(key);

    if (foundedNode) {
      foundedNode.value.desc = value;
    } else {
      this.table[this.hash(key)].push({ key, desc: value });
      this.keys.add(key);
    }

    return this;
  }

  del(key: string): this {
    const foundedNode = this.searchNodeByKey(key);

    if (!foundedNode) {
      throw new Error('key not found');
    }

    this.table[this.hash(key)].delete(foundedNode);
    this.keys.delete(key);

    return this;
  }

  has(key: string): boolean {
    return this.keys.has(key);
  }

  getKeys(): string[] {
    return [...this.keys];
  }

  get(key: string): T | undefined {
    const foundedNode = this.searchNodeByKey(key);

    return foundedNode ? foundedNode.value.desc : undefined;
  }
}

export default HashTable;
