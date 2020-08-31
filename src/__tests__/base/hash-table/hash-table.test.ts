import HashTable from '../../../base/hash-table/hash-table';

describe('DS hash-table should work correctly', () => {
  it('should add values', () => {
    const hashTable = new HashTable();
    expect(hashTable.getKeys()).toEqual([]);
    expect(hashTable.get('keyTwo')).toBe(undefined);

    hashTable.set('keyOne', 999);
    hashTable.set('keyTwo', 666);

    expect(hashTable.has('keyOne')).toBe(true);
    expect(hashTable.has('keyTwo')).toBe(true);
    expect(hashTable.has('any')).toBe(false);

    expect(hashTable.getKeys()).toEqual(['keyOne', 'keyTwo']);

    expect(hashTable.get('keyOne')).toBe(999);
    expect(hashTable.get('keyTwo')).toBe(666);
  });

  it('should update values', () => {
    const hashTable = new HashTable();
    hashTable.set('keyOne', 999);
    hashTable.set('keyTwo', 666);

    hashTable.set('keyOne', 333);
    expect(hashTable.get('keyOne')).toBe(333);
  });

  it('should delete values', () => {
    const hashTable = new HashTable();
    hashTable.set('keyOne', 999);
    hashTable.set('keyTwo', 666);

    expect(() => hashTable.del('any')).toThrowError('key not found');
    hashTable.del('keyOne');
    hashTable.del('keyTwo');
    expect(hashTable.getKeys()).toEqual([]);
  });

  it('should avoid collision', () => {
    const hashTable = new HashTable();
    hashTable.set('abc', 999);
    hashTable.set('bbb', 666);

    expect(hashTable.get('abc')).toBe(999);
    expect(hashTable.get('bbb')).toBe(666);
  });
});
