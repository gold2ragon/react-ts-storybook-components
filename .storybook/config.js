import { configure, addDecorator } from '@storybook/react';
import { withThemes } from 'storybook-styled-components';
import { withKnobs } from '@storybook/addon-knobs';

import { main } from '../src/branding/themes';

const themes = {
  'Main Theme': main,
};

addDecorator(withThemes(themes));
addDecorator(withKnobs);

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.(tsx|js)$/);
function loadStories() {
  require('../src/stories');

  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
