
import React from 'react';
import TimePicker from '../src/components';

class TimePickerWrapper extends React.Component {
  render() {
    return (
      <div className="exampleWrapper">
        <div className="exampleColumn">
          <div className="exampleRow">
            <h3>Default</h3>
            <TimePicker />
          </div>

          <div className="exampleRow">
            <h3>With custom step</h3>
            <TimePicker
              sections={[
                {
                  step: 2,
                  from: 0,
                  to: 24,
                  suffix: 'H',
                },
                {
                  step: 2,
                  from: 0,
                  to: 60,
                  suffix: 'Min'
                }
              ]}
              color="blue"
            />
          </div>
        </div>


        <div className="exampleColumn">
          <div className="exampleRow">
            <h3>With Hour/Min/Second</h3>
            <TimePicker
              sections={[
                {
                  step: 2,
                  from: 0,
                  to: 24,
                  suffix: 'H',
                  activeIndex: 6,
                },
                {
                  step: 2,
                  from: 0,
                  to: 60,
                  suffix: 'Min',
                  activeIndex: 7,
                },
                {
                  step: 2,
                  from: 0,
                  to: 60,
                  suffix: 'Sec',
                  activeIndex: 15,
                }
              ]}
              color="red"
            />
          </div>
          <div className="exampleRow">
            <h3>Disabled</h3>
            <TimePicker
              disable
              sections={[
                {
                  from: 0,
                  to: 12,
                  suffix: 'Hour'
                }
              ]}
              color="teal"
            />
          </div>
        </div>

      </div>
    );
  }
}

export default TimePickerWrapper;
