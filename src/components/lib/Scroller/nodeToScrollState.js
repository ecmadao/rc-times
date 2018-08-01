
export default function nodeToScrollState({
  scrollTop,
  scrollHeight,
  offsetHeight,
}) {
  // Interpreting native values
  const start = 0;
  const viewHeight = offsetHeight;
  const end = scrollHeight - viewHeight;

  // current position
  const position = scrollTop;
  const positionRatio = scrollTop / end;

  // Conditionals
  const starting = position <= start;
  const ending = position >= end;
  const middleing = !starting && !ending;

  const positionRelativeRatio = Math.abs(start - scrollTop / offsetHeight);

  return {
    end,
    start,
    ending,
    starting,
    position,
    middleing,
    viewHeight,
    scrollHeight,
    positionRatio,
    positionRelativeRatio,
  };
}
