import React from 'react';
import { storiesOf } from '@storybook/react';
import '../css/timepicker.css';
import { withKnobs } from '@storybook/addon-knobs';
import TimePickerWrapper from '../examples/TimePickerWrapper';
import TimePickerWrapper2 from '../examples/TimePickerWrapper2';
import TimePickerWrapper3 from '../examples/TimePickerWrapper3';

storiesOf('Default TimePicker', module)
  .addDecorator(withKnobs)
  .addWithInfo('basic', () => (
    <TimePickerWrapper />
  ))
  .addWithInfo('prefix/suffix', () => (
    <TimePickerWrapper2 />
  ))
  .addWithInfo('Everything!', () => (
    <TimePickerWrapper3 />
  ));
