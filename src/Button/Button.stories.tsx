import * as React from 'react';

import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Button } from './Button';
import { wInfo } from '../utils';

storiesOf('Components/Button', module).add(
  'Basic Button',
  wInfo(`

  ### Notes

  This is a nothing button. It's just here to make sure TSX works in this library. Feel free to delete it.

  ### Usage
  ~~~tsx
  <Button id="some-id">Some text</Button>
  ~~~`)(() => {
    return (
      <div>
        <Button id={text('id', 'some-id')}>{text('label', 'Some text')}</Button>
        {/* <Button id={5}>{text('label', 'Some text')}</Button> */}
      </div>
    );
  }),
);
