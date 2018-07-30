
export const timesCreator = len =>
  Array.from({ length: len }).map((_, i) => i + 1);

export const matchArray = (arrA, arrB, key) => {
  if (arrA.length !== arrB.length) return false;
  for (let i = 0; i < arrA.length; i += 1) {
    if (arrA[i][key] !== arrB[i][key]) return false;
  }
  return true;
};
