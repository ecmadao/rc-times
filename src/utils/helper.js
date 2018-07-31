

export const matchArray = (arrA, arrB, key) => {
  if (arrA.length !== arrB.length) return false;
  for (let i = 0; i < arrA.length; i += 1) {
    if (arrA[i][key] !== arrB[i][key]) return false;
  }
  return true;
};

export const timesCreator = (options = {}) => {
  const { from, to, length, step = 1 } = options;
  const s = Math.max(1, step);

  if (length) {
    return Array.from({ length }).map((_, i) => i + s);
  }

  const times = [];
  for (let i = from; i <= to; i += s) {
    times.push(i);
  }
  return times;
};
