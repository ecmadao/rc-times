import React, { Component } from 'react';
import { throttle, debounce } from 'throttle-debounce';
import ResizeObserver from 'resize-observer-polyfill';
import ScrollerContent from './ScrollerContent';
import nodeToScrollState from './nodeToScrollState';
import nodeChildrenToScrollState from './nodeChildrenToScrollState';
import { scrollTo, easeInOutCubic } from '../../../utils/scroll';

const scrollInitalState = {
  position: 0,
  positionRatio: 0,
  start: 0,
  end: 0,
  viewHeight: 0,
  scrollHeight: 0,
  ready: false,
  starting: true,
  middleing: false,
  ending: false,
  children: [],
  originalPosition: null,
  changedPosition: null,
  timeStamp: null,
  scrolling: false,
  touching: false,
  resting: true,
  touches: [],
  deltaY: 0,
  onScroll: Function.prototype,
  onScrollEnd: Function.prototype
};

export default class Scroller extends Component {
  static defaultProps = {
    autoFrame: false,
    autoScroll: false,
  };

  constructor(props) {
    super(props);
    this.state = Object.assign({}, scrollInitalState);

    this.handleScrollStart = debounce(500, true, this.handleScrollStart);
    this.handleResizeMove = throttle(50, this.handleResizeMove);
    this.handleScrollEnd = debounce(500, this.handleScrollEnd);
    this.handleWheelStart = debounce(100, true, this.handleWheelStart);
    this.handleWheelEnd = debounce(100, this.handleWheelEnd);
    this.handleResizeStart = debounce(250, true, this.handleResizeStart);
    this.handleResizeEnd = debounce(250, this.handleResizeEnd);

    this.scrollToPrevDebounced = debounce(250, true, this.scrollToPrev);
    this.scrollToNextDebounced = debounce(250, true, this.scrollToNext);
  }

  componentWillUnmount() {
    this.deleteRef();
  }

  componentWillReceiveProps(nextProps) {
    this.updatePosition(nextProps);
  }

  updatePosition(nextProps) {
    const { centerIndex } = nextProps;
    if (centerIndex !== this.props.centerIndex && !this.state.scrolling) {
      const { children } = this.state;
      if (children[centerIndex]) {
        this.scrollToPosition(children[centerIndex].start);
      }
    }
  }

  createRef = (ref) => {
    if (!ref) return;
    this.node = ref;

    // add component to resize observer to detect changes on resize
    this.resizeObserver = new ResizeObserver((entries, observer) => {
      if (this.state.ready) {
        this.handleResize();
      } else {
        this.setStateScroll({
          ready: true
        });
      }
    });

    this.resizeObserver.observe(this.node);
    this.props.scrollRef(this.connection);
  };

  deleteRef = () => {
    if (this.node) {
      this.resizeObserver.disconnect(this.node);
    }

    this.setStateScroll({
      ready: false
    });
  };

  get connection() {
    return {
      ...this.state,
      autoFrame: this.props.autoFrame,
      autoScroll: this.props.autoScroll,
      scrollToPosition: this.scrollToPosition,
      scrollToByIndex: this.scrollToByIndex,
      scrollToPrev: this.scrollToPrev,
      scrollToNext: this.scrollToNext,
      scrollToElement: this.scrollToElement,
      scrollToActive: this.scrollToActive,
    };
  }

  setStateScroll = (additionalStates) => {
    const { onScrollChange } = this.props;

    const newScroll = {
      ...this.state,
      ...nodeToScrollState(this.node),
      ...nodeChildrenToScrollState(this.node),
      ...additionalStates
    };

    this.setState(newScroll);

    if (onScrollChange) {
      onScrollChange(newScroll);
    }
  };

  setStateScrollStart = (additionalStates) => {
    const { position } = this.state;

    this.setStateScroll({
      originalPosition: position,
      timeStamp: Date.now(),
      ...additionalStates
    });
  };

  setStateScrollMove = (additionalStates) => {
    this.setStateScroll({
      scrolling: true,
      resting: false,
      ...additionalStates
    });
  };

  setStateScrollRest = (additionalStates) => {
    this.setStateScroll({
      scrolling: false,
      resting: true,
      ...additionalStates
    });
  };

  setStateScrollEnd = (additionalStates) => {
    this.setStateScroll({
      originalPosition: null,
      changedPosition: null,
      timeStamp: null,
      ...additionalStates
    });
  };

  findChildIndexOnView = () => {
    const { children } = this.state;
    return children.findIndex((child) => child.onView);
  };

  scrollToPosition = (to) => {
    scrollTo(this.node, to, {
      func: easeInOutCubic,
    });
  };

  scrollToByIndex = (index) => {
    const { children } = this.state;
    this.scrollToPosition(children[index].start);
  };

  previousOfIndex = (
    i = this.findChildIndexOnView(),
    arr = this.state.children
  ) => arr[i > 0 ? i - 1 : i];

  nextOfIndex = (
    i = this.findChildIndexOnView(),
    arr = this.state.children
  ) => arr[i < arr.length - 1 ? i + 1 : i];

  scrollToPrev = () => {
    const prevPosition = this.previousOfIndex().start;
    this.scrollToPosition(prevPosition);
  };

  scrollToNext = () => {
    const nextPosition = this.nextOfIndex().start;
    this.scrollToPosition(nextPosition);
  };

  scrollToElement = (element, options) => {
    const start = element.scrollTop;
    this.scrollToPosition(start);
  };

  scrollToActive = () => {
    const position = this.state.position;
    const remain = position % 50;
    const main = position - remain;
    const newPosition = remain >= 25 ? main + 50 : main;

    this.scrollToPosition(newPosition);
    return newPosition;
  };

  handleScroll = () => {
    this.handleScrollStart();
    this.handleScrollMove();
    this.handleScrollEnd();
  };

  handleScrollStart = () => {
    this.setStateScrollMove();
  };

  handleScrollMove = () => {
    this.setStateScroll();
  };

  handleScrollEnd = () => {
    this.setStateScrollRest();
  };

  handleResize = () => {
    this.handleResizeStart();
    this.handleResizeMove();
    this.handleResizeEnd();
  };

  handleResizeStart = () => {
    this.setStateScrollMove();
  };

  handleResizeMove = () => {
    this.handleScroll();
  };

  handleResizeEnd = () => {
    const { autoFrame, onScrollEnd } = this.props;

    if (autoFrame) {
      const position = this.scrollToActive();
      onScrollEnd && onScrollEnd({ position });
    }
  };

  handleWheel = (e) => {
    const { autoScroll } = this.props;

    if (autoScroll) {
      e.preventDefault();
    }

    this.handleWheelStart(e);
    this.handleWheelMove(e);
    this.handleWheelEnd(e);
  };

  handleWheelStart = (e) => {
    const { autoScroll } = this.props;
    const { changedPosition } = this.state;

    this.setStateScrollStart({
      scrolling: true,
      changedPosition: !autoScroll ? null : changedPosition
    });

    if (autoScroll) {
      const movingUpwards = e.deltaY > 0;
      const movingDownwards = e.deltaY < 0;

      if (movingDownwards) this.scrollToPrevDebounced();
      if (movingUpwards) this.scrollToNextDebounced();
    }
  };

  handleWheelMove = (e) => {
    const { autoScroll, onScroll } = this.props;

    if (autoScroll) {
      const prev = this.state.deltaY;
      const next = e.deltaY;

      const changed = Math.abs(next) > Math.abs(prev);

      if (changed) {
        const movingUpwards = next > 0;
        const movingDownwards = next < 0;

        if (movingDownwards) {
          this.scrollToPrevDebounced();
        }
        if (movingUpwards) {
          this.scrollToNextDebounced();
        }
      }
    }

    this.setState({ deltaY: e.deltaY });
    onScroll && onScroll({
      position: this.state.position
    });
  };

  handleWheelEnd = (e) => {
    const { autoFrame, onScrollEnd } = this.props;

    this.setStateScrollEnd({
      scrolling: false,
      deltaY: null
    });

    let { position } = this.state;
    if (autoFrame) {
      position = this.scrollToActive();
    }
    onScrollEnd && onScrollEnd({ position });
  };

  handleTouchStart = (e) => {
    this.setStateScrollStart({
      touching: true,
      touches: e.touches,
    });
  };

  handleTouchMove = (e) => {
    const { onScroll } = this.props;
    const { touches, position, originalPosition } = this.state;

    let distanceFromTouchStart = e.changedTouches[0].clientY - touches[0].clientY;
    let touchPosition = originalPosition - distanceFromTouchStart;

    this.scrollToPosition(touchPosition);
    onScroll && onScroll({ position });
  };

  handleTouchEnd = (e) => {
    const { onScrollEnd } = this.props;
    const { timeStamp, touches } = this.state;
    let { position } = this.state;

    const timeLapse = Date.now() - timeStamp;

    if (timeLapse < 200) {
      const movingUpwards = e.changedTouches[0].clientY < touches[0].clientY;
      const movingDownwards = e.changedTouches[0].clientY > touches[0].clientY;

      if (movingDownwards) this.scrollToPrev();
      if (movingUpwards) this.scrollToNext();
    } else {
      position = this.scrollToActive();
    }

    this.setStateScroll({
      touching: false,
    });
    onScrollEnd && onScrollEnd({ position });
  };

  render() {
    const {
      disable,
      children,
      autoScroll,
      className,
      centerIndex,
    } = this.props;

    return (
      <ScrollerContainer>
        <ScrollerContent
          disable={disable}
          centerindex={centerIndex}
          autoScroll={autoScroll}
          className={className}
          scrollRef={this.createRef}
          scroll={this.state}
          onScroll={this.handleScroll}
          onWheel={this.handleWheel}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        >
          {children}
        </ScrollerContent>
      </ScrollerContainer>
    );
  }
}

class ScrollerContainer extends Component {
  render() {
    const style = {
      height: '100%',
      width: '100%',
    };

    return <div style={style} {...this.props} />;
  }
}
