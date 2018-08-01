
export const easeInOutCubic = ({ start, end, elapsed, duration }) => {
  if (elapsed > duration) return end;
  const t = elapsed / duration;
  return start + (end - start) * (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
};

export const easeInOutQuad = ({ start, end, elapsed, duration }) => {
  const c = end - start;
  const d = duration;
  const b = start;
  let t = elapsed;

  t /= (d / 2);
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

const getAnimationFrame = increment =>
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  (fn => setTimeout(fn, increment));

export const scrollTo = (element, end, options = {}) => {
  const {
    func,
    duration = 200,
    increment = 15,
  } = options;

  let elapsed = 0;
  const start = element.scrollTop;
  const animationFrame = getAnimationFrame(increment);

  const animateScroll = () => {
    elapsed += increment;
    const val = func({
      end,
      start,
      elapsed,
      duration
    });
    element.scrollTop = val;
    if (elapsed < duration) {
      animationFrame(animateScroll);
    }
  };
  animateScroll();
};
