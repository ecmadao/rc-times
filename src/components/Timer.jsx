
import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { scrollTo } from '../utils/dom';
import { timesCreator } from '../utils/helper';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.activedWidth = 50;
    this.actived = '';
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
      <div className="time timePlaceholder" key="placeholder-0"></div>
    ));
    doms.push((
      <div className="time timePlaceholder" key={`placeholder-${times.length}`}></div>
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

  render() {
    const { section } = this.props;
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
            <div
              className="wrapper"
            >
              {this.renderTimes(this.times)}
            </div>
          </div>
          <div className="timerWrapper" style={{ width: `${width - 2}px` }} />
        </div>
        {suffix ? <div className="subText suffix">{suffix}</div> : null}
      </div>
    );
  }
};

export default Timer;
