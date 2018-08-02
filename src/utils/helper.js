
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

export const getDomProperty = (text, className = '') => {
  const hiddenDOM = document.createElement('div');
  hiddenDOM.setAttribute('class', `timeActived ${className} timeHidden`);
  hiddenDOM.appendChild(document.createTextNode(text));
  document.body.appendChild(hiddenDOM);

  let fontSize = window.getComputedStyle(hiddenDOM, null).getPropertyValue('font-size');
  fontSize = parseInt(fontSize, 10);
  fontSize = isNaN(fontSize) ? 16 : fontSize;

  let paddingLeft = window.getComputedStyle(hiddenDOM, null).getPropertyValue('padding-left');
  let paddingRight = window.getComputedStyle(hiddenDOM, null).getPropertyValue('padding-right');
  paddingLeft = parseInt(paddingLeft, 10);
  paddingRight = parseInt(paddingRight, 10);
  const padding = Math.max(paddingLeft + paddingRight, 0);

  let marginLeft = window.getComputedStyle(hiddenDOM, null).getPropertyValue('margin-left');
  let marginRight = window.getComputedStyle(hiddenDOM, null).getPropertyValue('margin-right');
  marginLeft = parseInt(marginLeft, 10);
  marginRight = parseInt(marginRight, 10);
  const margin = Math.max(marginLeft + marginRight, 16);

  hiddenDOM.remove();

  return {
    margin,
    padding,
    width: fontSize * text.length,
  };
};

export const debounce = (action, options = {}) => {
  let timeout = null;
  let funcArgs = [];
  const { delay = 200, } = options;

  const clean = () => {
    timeout && clearTimeout(timeout);
    timeout = null;
  };
  const exec = () => {
    const args = funcArgs.pop();
    funcArgs = [];
    clean();
    action(...args);
  };

  return (...args) => {
    funcArgs.push(args);
    clean();
    timeout = setTimeout(exec, delay);
  };
};
