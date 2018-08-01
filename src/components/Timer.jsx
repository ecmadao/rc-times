
import React from 'react';
import { timesCreator } from '../utils/helper';
import Scroller from './lib/Scroller';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.timer = null;
    this.activedWidth = 50;
    this.actived = '';
    this.onScroll = this.onScroll.bind(this);
    this.onScrollEnd = this.onScrollEnd.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onActicedChange = this.onActicedChange.bind(this);
  }

  get width() {
    const activedTime = this.activedTime;
    if (this.actived.length === activedTime.length) {
      return this.activedWidth;
    }
    const hiddenDOM = document.createElement('div');
    hiddenDOM.setAttribute('class', 'timeActived timeHidden');
    hiddenDOM.appendChild(document.createTextNode(activedTime));

    document.body.appendChild(hiddenDOM);
    let fontSize = window.getComputedStyle(hiddenDOM, null).getPropertyValue('font-size');
    fontSize = parseInt(fontSize, 10);
    fontSize = isNaN(fontSize) ? 16 : fontSize;
    hiddenDOM.remove();
    this.activedWidth = fontSize * activedTime.length + 16;
    this.actived = activedTime;
    return this.activedWidth;
  }

  get activedTime() {
    const { activeIndex } = this.props;
    return this.times[activeIndex];
  }

  get times() {
    const { section } = this.props;
    return timesCreator(section);
  }

  renderTimes(times) {
    const { activeIndex } = this.props;
    const doms = times.map((time, index) => (
      <div
        key={index}
        onClick={this.onTimeChange(index)}
        className={`time ${index === activeIndex ? 'timeActived' : ''}`}
      >
        {time}
      </div>
    ));
    doms.unshift((
      <div className="time timePlaceholder" key="placeholder-0"></div>
    ));
    doms.push((
      <div className="time timePlaceholder" key={`placeholder-${times.length}`}></div>
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
    const { section, activeIndex } = this.props;
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
