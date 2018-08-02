
import React from 'react';
import { timesCreator, getDomProperty } from '../utils/helper';
import Scroller from './lib/Scroller';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.minWidth = this.getMinWidth();
    this.width = this.getWidth(this.longestItem);
    this.widths = this.times.map(item => this.getWidth(`${item}`));

    this.onScroll = this.onScroll.bind(this);
    this.onScrollEnd = this.onScrollEnd.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onActicedChange = this.onActicedChange.bind(this);
  }

  getWidth(text) {
    const { className } = this.props;
    const {
      width,
      margin,
      padding,
    } = getDomProperty(text, className);

    return width + margin + padding + this.props.padding;
  }

  getMinWidth() {
    const longestItem = this.longestItem;
    const { width } = getDomProperty(longestItem);
    return width;
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
        className={`time ${index === activeIndex ? 'timeActived' : ''} ${className} ${disable && 'disable'}`}
      >
        {time}
      </div>
    ));
    doms.unshift((
      <div
        key="placeholder-0"
        className="time timePlaceholder"
      />
    ));
    doms.push((
      <div
        key={`placeholder-${times.length}`}
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

    return (
      <div className="timer">
        {prefix ? <div className="subText prefix">{prefix}</div> : null}
        <div
          className="scrollSection"
          style={{
            width: `${this.width}px`
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
          <div
            className="timerWrapper"
            style={{ width: `${this.width - 2}px` }}
          />
        </div>
        {suffix ? <div className="subText suffix">{suffix}</div> : null}
      </div>
    );
  }
}

export default Timer;
