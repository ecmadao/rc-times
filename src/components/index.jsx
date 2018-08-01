
import React from 'react';
import { matchArray, timesCreator } from '../utils/helper';
import Timer from './Timer';

class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    const activeIndexs = props.sections.map(section => section.activeIndex || 0);
    this.state = {
      activeIndexs
    };
    this.onTimeChange = this.onTimeChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { sections } = nextProps;
    const { activeIndexs } = this.state;
    const tmp = activeIndexs.map(activeIndex => ({ activeIndex }));
    if (!matchArray(sections, tmp, 'activeIndex')) {
      this.reinit(sections);
    }
  }

  reinit(sections) {
    this.setState({
      activeIndexs: sections.map(section => section.activeIndex || 0)
    });
  }

  onTimeChange(index) {
    const { onTimeChange } = this.props;
    return (activeIndex) => {
      const { activeIndexs } = this.state;
      const newIndexs = [
        ...activeIndexs.slice(0, index),
        activeIndex,
        ...activeIndexs.slice(index + 1)
      ];
      this.setState({ activeIndexs: newIndexs });
      onTimeChange && onTimeChange({
        indexs: newIndexs,
        values: this.getValues(newIndexs)
      });
    };
  }

  getValues(indexs) {
    const { sections } = this.props;
    const values = [];

    for (let i = 0; i < sections.length; i += 1) {
      const section = sections[i];
      const times = timesCreator(section);
      values.push(times[indexs[i]]);
    }
    return values;
  }

  renderTimers() {
    const {
      padding,
      disable,
      sections,
      timerClassName
    } = this.props;
    const { activeIndexs } = this.state;

    return sections.map((section, index) => (
      <Timer
        key={index}
        index={index}
        disable={disable}
        padding={padding}
        section={section}
        className={timerClassName}
        activeIndex={activeIndexs[index]}
        onTimeChange={this.onTimeChange(index)}
      />
    ));
  }

  render() {
    const { color, disable, className } = this.props;
    return (
      <div
        className={`timePicker ${color ? `timePicker-${color}` : ''} ${disable && 'disable'} ${className}`}
      >
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
  padding: 0,
  color: 'dark',
  className: '',
  disable: false,
  timerClassName: '',
  onTimeChange: Function.prototype
};

export default TimePicker;
