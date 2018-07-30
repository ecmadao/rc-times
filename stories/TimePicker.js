import React from 'react';
import { storiesOf } from '@storybook/react';
import '../css/timepicker.css';
import { text, withKnobs } from '@storybook/addon-knobs';
import TimePickerWrapper from '../examples/TimePickerWrapper';

storiesOf('Default TimePicker', module)
  .addDecorator(withKnobs)
  .addWithInfo('basic', () => (
    <TimePickerWrapper />
  ));