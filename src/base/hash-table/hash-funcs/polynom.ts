const polynomHASH = (key: string, prime = 3): number => {
  return key
    .split('')
    .reduce((acc, keySym, index, dKey) => acc + prime ** (dKey.length - 1 - index) * keySym.charCodeAt(0), 0);
};

export default polynomHASH;
