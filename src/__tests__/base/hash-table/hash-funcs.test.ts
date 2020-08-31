import hashFuncs from '../../../base/hash-table/hash-funcs';

describe('Hash funcs should work correctly', () => {
  it('simple base', () => {
    expect(hashFuncs.simple('')).toBe(0);
    expect(hashFuncs.simple('abc')).toBe(294);
    expect(hashFuncs.simple('bbb')).toBe(294);
  });

  it('polynomial base ', () => {
    expect(hashFuncs.polynom('')).toBe(0);
    expect(hashFuncs.polynom('abc')).toBe(1266);
  });
});
