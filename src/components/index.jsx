
import React from 'react';
import { matchArray } from '../utils/helper';
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
    const { onTimeChange } = this.props;
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
          section={section}
          activeIndex={activeIndexs[index]}
          onTimeChange={this.onTimeChange(index)}
        />
      );
    })
  }

  render() {
    const { color } = this.props;
    return (
      <div className={`timePicker ${color}`}>
        {this.renderTimers()}
      </div>
    );
  }
}

TimePicker.defaultProps = {
  sections: [
    {
      step: 1,
      from: 0,
      to: 24,
      length: 0,
      times: [],
      prefix: '',
      suffix: 'H',
      activeIndex: 0,
    },
    {
      step: 1,
      from: 0,
      to: 24,
      length: 0,
      times: [],
      prefix: '',
      suffix: 'Min',
      activeIndex: 0,
    }
  ],
  color: 'dark',
  onTimeChange: Function.prototype
};

export default TimePicker;
