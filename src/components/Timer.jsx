
import React from 'react';
import { timesCreator, getDomProperty } from '../utils/helper';
import Scroller from './lib/Scroller';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.timer = null;
    this.activedWidth = 50;
    this.itemMinWidth = null;
    this.actived = '';
    this.onScroll = this.onScroll.bind(this);
    this.onScrollEnd = this.onScrollEnd.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onActicedChange = this.onActicedChange.bind(this);
  }

  get width() {
    const activedTime = `${this.activedItem}`;
    if (this.actived.length === activedTime.length) {
      return this.activedWidth;
    }
    const { className } = this.props;
    const {
      width,
      margin,
      padding,
    } = getDomProperty(activedTime, className);

    this.activedWidth = width + margin + padding + this.props.padding;
    return this.activedWidth;
  }

  get minWidth() {
    if (this.itemMinWidth) return this.itemMinWidth;
    const longestItem = this.longestItem;
    const { width } = getDomProperty(longestItem);

    this.itemMinWidth = width;
    return this.itemMinWidth;
  }

  get activedItem() {
    const { activeIndex } = this.props;
    return this.times[activeIndex];
  }

  get longestItem() {
    let result = '';
    for (const item of this.times) {
      if (result.length < `${item}`.length) result = `${item}`;
    }
    return result;
  }

  get times() {
    const { section } = this.props;
    return timesCreator(section);
  }

  renderTimes(times) {
    const { disable, className, activeIndex } = this.props;
    const doms = times.map((time, index) => (
      <div
        key={index}
        onClick={this.onTimeChange(index)}
        style={{ minWidth: `${this.minWidth}px` }}
        className={`time ${index === activeIndex ? 'timeActived' : ''} ${className} ${disable && 'disable'}`}
      >
        {time}
      </div>
    ));
    doms.unshift((
      <div
        key="placeholder-0"
        style={{ minWidth: `${this.minWidth}px` }}
        className="time timePlaceholder"
      />
    ));
    doms.push((
      <div
        key={`placeholder-${times.length}`}
        style={{ minWidth: `${this.minWidth}px` }}
        className="time timePlaceholder"
      />
    ));
    return doms;
  }

  onActicedChange(position) {
    const remain = position % 50;
    const main = position - remain;
    const last = remain >= 25 ? main + 50 : main;
    const activeIndex = last / 50;
    const { onTimeChange } = this.props;
    onTimeChange && onTimeChange(activeIndex);
  }

  onScroll({ position }) {
    this.onActicedChange(position);
  }

  onScrollEnd({ position }) {
    this.onActicedChange(position);
  }

  onTimeChange(activeIndex) {
    const { onTimeChange } = this.props;
    return () => {
      onTimeChange && onTimeChange(activeIndex);
    };
  }

  render() {
    const { section, disable, activeIndex } = this.props;
    const { prefix, suffix } = section;
    const width = this.width;

    return (
      <div className="timer">
        {prefix ? <div className="subText prefix">{prefix}</div> : null}
        <div
          className="scrollSection"
          style={{
            width: `${width}px`
          }}
        >
          <div
            className="container"
            ref={ref => (this.scroller = ref)}
          >
            <Scroller
              autoFrame
              disable={disable}
              className="wrapper"
              centerIndex={activeIndex}
              onScroll={this.onScroll}
              onScrollEnd={this.onScrollEnd}
              scrollRef={ref => this.scroll = ref}
            >
              {this.renderTimes(this.times)}
            </Scroller>
          </div>
          <div className="timerWrapper" style={{ width: `${width - 2}px` }} />
        </div>
        {suffix ? <div className="subText suffix">{suffix}</div> : null}
      </div>
    );
  }
}

export default Timer;
