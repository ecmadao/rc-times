
import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { scrollTo } from '../utils/dom';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;

    this.onScroll = this.onScroll.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
  }

  componentDidMount() {
    const { activeIndex } = this.props;
    if (ReactDOM.findDOMNode(this.dom)) {
      ReactDOM.findDOMNode(this.dom).addEventListener('scroll', this.onScroll);
      scrollTo(ReactDOM.findDOMNode(this.dom), (activeIndex - 1) * 50, 200);
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
      if (ReactDOM.findDOMNode(this.dom)) {
        scrollTo(ReactDOM.findDOMNode(this.dom), last, 200);
      }
    }, 150);
  }

  onTimeChange(activeIndex) {
    const { onTimeChange } = this.props;
    return () => {
      scrollTo(ReactDOM.findDOMNode(this.dom), activeIndex * 50, 200);
      onTimeChange && onTimeChange(activeIndex);
    };
  }

  render() {
    const { times, unit } = this.props;

    return (
      <div className="scrollSection">
        <div
          className="container"
          ref={ref => (this.dom = ref)}
        >
          <div
            className="wrapper"
          >
            {this.renderTimes(times)}
          </div>
        </div>
        <div className="unit">{unit}</div>
      </div>
    );
  }
};

export default Timer;
