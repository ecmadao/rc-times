
import React from 'react';
import TimePicker from '../src/components';

const MONTH_DAYS = {
  // 31 days
  A: new Set([1, 3, 5, 7, 8, 10, 12]),
  // 30 days
  B: new Set([4, 6, 9, 11])
};

class TimePickerWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // year, month, day, hour, min, sec
      activeIndexs: [0, 0, 0, 0, 0, 0]
    };
    this.onTimeChange = this.onTimeChange.bind(this);
  }

  onTimeChange({ indexs, values }) {
    console.log(' ==================== ')
    console.log(indexs);
    console.log(values);

    const [yearIndex, monthIndex, dayIndex, ...others] = indexs;
    const dIndex = dayIndex >= this.getMonthDays(this.years[yearIndex], this.months[monthIndex])
      ? 0
      : dayIndex;
    this.setState({
      activeIndexs: [
        yearIndex, monthIndex, dIndex,
        ...others
      ]
    });
  }

  // You need to deal month days yourself
  getMonthDays(year, month) {
    if (MONTH_DAYS.A.has(month)) return 31;
    if (MONTH_DAYS.B.has(month)) return 30;
    return year % 4 === 0 ? 29 : 28;
  }

  get years() {
    const years = [];
    for (let i = 1900; i < 2100; i += 10) {
      years.push(i);
    }
    return years;
  }

  get months() {
    return Array.from({ length: 12 }).map((_, i) => i + 1);
  }

  render() {
    const { activeIndexs } = this.state;

    return (
      <div className="exampleWrapper">

        <div className="exampleColumn">
          <div className="exampleRow">
            <h3>Render everything you want!</h3>
            <TimePicker
              sections={[
                {
                  suffix: 'Year',
                  times: this.years,
                  activeIndex: activeIndexs[0]
                },
                {
                  suffix: 'Month',
                  times: this.months,
                  activeIndex: activeIndexs[1]
                },
                {
                  suffix: 'Day',
                  activeIndex: activeIndexs[2],
                  length: this.getMonthDays(this.years[activeIndexs[0]], this.months[activeIndexs[1]]),
                },
                {
                  step: 2,
                  from: 0,
                  to: 24,
                  suffix: 'H',
                  activeIndex: activeIndexs[3],
                },
                {
                  step: 2,
                  from: 0,
                  to: 60,
                  suffix: 'Min',
                  activeIndex: activeIndexs[4],
                },
                {
                  step: 2,
                  from: 0,
                  to: 60,
                  suffix: 'Sec',
                  activeIndex: activeIndexs[5],
                }
              ]}
              color="teal"
              onTimeChange={this.onTimeChange}
            />
          </div>
        </div>

      </div>
    );
  }
}

export default TimePickerWrapper;
