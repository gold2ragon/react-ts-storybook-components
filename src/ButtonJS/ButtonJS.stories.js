import React from 'react';

import { boolean, radios, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Button } from './ButtonJS';
import { wInfo } from '../utils';

storiesOf('Components/ButtonJS', module).add(
  'Basic Button',
  wInfo(`

  ### Notes

  This is the button we're actually using. It's implemented without the use of TypeScript, and a lot of the complex prop handling is done using a convoluted wrapper around \`styled-components\` located in this repo at \`src/styled.js\`. While this works pretty well and creates ergonomic components, it has proven very difficult to create TypeScript declarations for and is quite brittle.

  I'd love to have a similar library that can be more easily documented and typed while still allowing us to write components with little boilerplate that offer similar options.

  ### Usage
  ~~~js
  <Button positive onClick={() => alert('hello there')}>Some Text</Button>
  ~~~`)(() => {
    const dynamicProperties = {};

    const size = radios(
      'size',
      {
        Small: 'small',
        Medium: 'medium',
        Large: 'large',
        '(None)': false,
      },
      false,
    );

    if (size) {
      dynamicProperties[size] = true;
    }

    const feeling = radios(
      'feeling',
      {
        Danger: 'danger',
        Negative: 'negative',
        Warning: 'warning',
        Positive: 'positive',
        Accented: 'accented',
        Disabled: 'disabled',
        '(None)': false,
      },
      'positive',
    );

    if (feeling) {
      dynamicProperties[feeling] = true;
    }

    return (
      <Button
        ghost={boolean('Ghost', false)}
        {...dynamicProperties}
        onClick={() => alert('hello there')}
      >
        {text('label', 'Some Text')}
      </Button>
    );
  }),
);
