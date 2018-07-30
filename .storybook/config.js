import { addDecorator, configure, setAddon } from '@storybook/react';

import infoAddon from '@storybook/addon-info';
import moment from 'moment';

addDecorator((story) => {
  moment.locale('zh-cn');
  return (story());
});

function loadStories() {
  require('../stories/TimePicker');
}

setAddon(infoAddon);

configure(loadStories, module);
