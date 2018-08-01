
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
                  suffix: 'H'
                },
                {
                  step: 2,
                  from: 0,
                  to: 60,
                  suffix: 'Min'
                },
                {
                  step: 2,
                  from: 0,
                  to: 60,
                  suffix: 'Sec'
                }
              ]}
              color="red"
            />
          </div>
          <div className="exampleRow">
            <h3>Just Hour/Min/Second</h3>
            <TimePicker
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

        <div className="exampleColumn">
          <div className="exampleRow">
            <h3>Send className/timerClassName props</h3>
            <TimePicker
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
