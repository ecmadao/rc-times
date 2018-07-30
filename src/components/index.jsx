
import React from 'react';
import { timesCreator, matchArray } from '../utils/helper';
import Timer from './Timer';

class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndexs: props.sections.map(section => section.activeIndex || 0)
    };
    this.onTimeChange = this.onTimeChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { sections } = nextProps;
    const { activeIndexs } = this.state;
    const tmp = activeIndexs.map(activeIndex => ({ activeIndex }));
    if (!matchArray(sections, tmp, 'activeIndex')) {
      this.init(sections);
    }
  }

  init(sections) {
    this.setState({
      activeIndexs: sections.map(section => section.activeIndex || 0)
    });
  }

  onTimeChange(index) {
    const { activeIndexs } = this.state;
    const { onTimeChange } = this.state;
    return (activeIndex) => {
      const newIndexs = [
        ...activeIndexs.slice(0, index),
        activeIndex,
        ...activeIndexs.slice(index + 1)
      ];
      this.setState({
        activeIndexs: newIndexs
      });
      onTimeChange && onTimeChange(newIndexs);
    };
  }

  renderTimers() {
    const { sections } = this.props;
    const { activeIndexs } = this.state;

    return sections.map((section, index) => {
      return (
        <Timer
          key={index}
          unit={section.unit}
          times={section.times}
          activeIndex={activeIndexs[index]}
          onTimeChange={this.onTimeChange(index)}
        />
      );
    })
  }

  render() {
    return (
      <div className="timePicker">
        {this.renderTimers()}
      </div>
    );
  }
}

TimePicker.defaultProps = {
  sections: [
    // {
    //   times: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
    //   unit: 'Year',
    //   activeIndex: 0
    // },
    {
      step: 1,
      from: 0,
      to: 24,
      unit: 'H',
      activeIndex: 7,
      times: timesCreator(12),
    },
    {
      step: 1,
      from: 0,
      to: 24,
      unit: 'Min',
      activeIndex: 7,
      times: timesCreator(60),
    }
  ],
  onTimeChange: Function.prototype
};

export default TimePicker;
