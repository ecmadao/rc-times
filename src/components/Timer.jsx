
import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { scrollTo } from '../utils/dom';
import { timesCreator } from '../utils/helper';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.onScroll = this.onScroll.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
  }

  componentDidMount() {
    const { activeIndex } = this.props;
    const scroller = ReactDOM.findDOMNode(this.scroller);
    if (scroller) {
      if (scroller.addEventListener) {
        scroller.addEventListener('scroll', this.onScroll, true);
      } else {
        scroller.attachEvent('scroll', this.onScroll);
      }
      scrollTo(scroller, (activeIndex - 1) * 50, 200);
    }
  }

  componentWillUnmount() {
    const scroller = ReactDOM.findDOMNode(this.scroller);
    if (scroller) {
      if (scroller.removeEventListener) {
        scroller.removeEventListener('scroll', this.onScroll, true);
      } else {
        scroller.detachEvent('scroll', this.onScroll);
      }
    }
  }

  renderTimes(times) {
    const { activeIndex } = this.props;
    const doms = times.map((time, index) => (
      <div
        key={index}
        className={cx(
          "time",
          index === activeIndex && "timeActived"
        )}
        onClick={this.onTimeChange(index)}
      >
        {time}
      </div>
    ));
    doms.unshift((
      <div className="time" key="placeholder-0"></div>
    ));
    doms.push((
      <div className="time" key={`placeholder-${times.length}`}></div>
    ));
    return doms;
  }

  onScroll(e) {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    const remain = e.srcElement.scrollTop % 50;
    const main = e.srcElement.scrollTop - remain;
    const last = remain >= 25 ? main + 50 : main;

    const activeIndex = last / 50;
    const { onTimeChange } = this.props;
    onTimeChange && onTimeChange(activeIndex);

    this.timer = setTimeout(() => {
      if (ReactDOM.findDOMNode(this.scroller)) {
        scrollTo(ReactDOM.findDOMNode(this.scroller), last, 200);
      }
    }, 150);
  }

  onTimeChange(activeIndex) {
    const { onTimeChange } = this.props;
    return () => {
      scrollTo(ReactDOM.findDOMNode(this.scroller), activeIndex * 50, 200);
      onTimeChange && onTimeChange(activeIndex);
    };
  }

  get times() {
    const { section } = this.props;
    const {
      to,
      from,
      step,
      times,
      length
    } = section;

    if (times && Array.isArray(times) && times.length > 0) return times;
    return timesCreator({
      to,
      from,
      step,
      length
    });
  }

  render() {
    const { section } = this.props;
    const { unit } = section;

    return (
      <div className="timer">
        <div className="scrollSection">
          <div
            className="container"
            ref={ref => (this.scroller = ref)}
          >
            <div
              className="wrapper"
            >
              {this.renderTimes(this.times)}
            </div>
          </div>
          <div className="timerWrapper" />
        </div>
        <div className="unit">{unit}</div>
      </div>
    );
  }
};

export default Timer;
