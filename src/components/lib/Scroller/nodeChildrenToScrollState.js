
export default function nodeChildrenToScrollState({ children, scrollTop }) {
  const list = [];

  // used to increment children view heights
  let start = 0;
  const theshold = 0.5;

  for (const child of children) {
    const { offsetHeight } = child;

    // interpreting native values
    const viewHeight = offsetHeight;
    const end = start + viewHeight;

    // current position values
    const position = start - scrollTop;
    const positionRatio = position / offsetHeight;
    const positionRatioRemainer = positionRatio <= -1
      ? 1
      : (positionRatio >= 1 ? 1 : Math.abs(positionRatio % 1));

    const onView = positionRatio <= theshold && positionRatio >= -theshold;
    const onFrame = position === scrollTop;
    const active = onView;

    list.push({
      end,
      start,
      onView,
      active,
      onFrame,
      position,
      viewHeight,
      positionRatio,
      positionRatioRemainer
    });

    // increament based on stacked item's height
    start += offsetHeight;
  }

  return { children: list };
}
