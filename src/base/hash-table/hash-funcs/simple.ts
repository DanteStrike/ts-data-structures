const simpleHASH = (key: string): number => {
  return key.split('').reduce((acc, keySym) => acc + keySym.charCodeAt(0), 0);
};

export default simpleHASH;
