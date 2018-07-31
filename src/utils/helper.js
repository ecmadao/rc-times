
export const matchArray = (arrA, arrB, key) => {
  if (arrA.length !== arrB.length) return false;
  for (let i = 0; i < arrA.length; i += 1) {
    if (arrA[i][key] !== arrB[i][key]) return false;
  }
  return true;
};

export const timesCreator = (options = {}) => {
  const { from, to, length, times = [], step = 1 } = options;
  if (times && Array.isArray(times) && times.length > 0) return times;

  const s = Math.max(1, step);
  if (length) {
    return Array.from({ length }).reduce((arr, _) => {
      arr.push(
        arr.length
          ? arr[arr.length - 1] + s
          : (from || 0)
      );
      return arr;
    }, []);
  }

  const results = [];
  for (let i = from; i <= to; i += s) {
    results.push(i);
  }
  return results;
};
