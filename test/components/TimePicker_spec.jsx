
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TimePicker from '../../src/components';
import Timer from '../../src/components/Timer';
import '../_helpers/adapter';

describe('TimePicker test', () => {
  describe('TimePicker initial test', () => {
    it('should be wrappered by div.timePicker', () => {
      const wrapper = shallow(<TimePicker />);
      expect(wrapper.is('.timePicker')).to.equal(true);
    });

    it('renders two Timer by default props', () => {
      const wrapper = shallow(<TimePicker />);
      expect(wrapper.find(Timer)).to.have.lengthOf(2);
    });
  });

  describe('TimePicker render with props', () => {
    it('should be render correctly color', () => {
      const wrapper = shallow(<TimePicker color="red" />);
      expect(wrapper.is('.timePicker-red')).to.equal(true);
    });

    it('renders one Timer', () => {
      const wrapper = shallow(
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
      );
      expect(wrapper.find(Timer)).to.have.lengthOf(1);
    });
  });

  it('should be render with className props', () => {
    const wrapper = shallow(<TimePicker className="test" />);
    expect(wrapper.is('.timePicker.test')).to.equal(true);
  });
});
