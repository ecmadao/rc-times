
import React from 'react';
import TimePicker from '../src/components';

class TimePickerWrapper extends React.Component {
  render() {
    return (
      <div className="exampleWrapper">

        <div className="exampleColumn">
          <div className="exampleRow">
            <h3>And you can even do this</h3>
            <div className="exampleColumn">
              <div className="exampleRow">
                <TimePicker
                  sections={[
                    {
                      prefix: '每',
                      times: ['三天', '周', '月', '季度'],
                    }
                  ]}
                  color="yellow"
                  padding={20}
                />
              </div>
              <div className="exampleSubText">at</div>
              <div className="exampleRow exampleRowSub">
                <TimePicker
                  sections={[
                    {
                      from: 0,
                      to: 12,
                      suffix: 'Clock'
                    }
                  ]}
                  color="yellow"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default TimePickerWrapper;
