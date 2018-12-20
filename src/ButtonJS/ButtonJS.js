// Copyright (c) Standard Bots Company. All rights reserved.

import React from 'react';

import { Size } from '../branding/themes';
import { styled } from '../styled';

export const Button = styled(({ block, ...props }) => <button {...props} />, {
  withFeeling: true,
  feelings: ({ theme }) => ({
    default: {
      main: theme.colors.buttonBackground,
      alt: theme.colors.text,
    },
  }),
  ghostTransform: ({ main, alt }, { feelingKey, theme, props }) => {
    switch (feelingKey) {
      case 'default': {
        alt = theme.colors.text;
        break;
      }
      default: {
        alt = main;
        break;
      }
    }

    return {
      alt,
      main: alt.alpha(0),
    };
  },
  enumeratedAttributes: {
    size: {
      default: 'medium',
      small: new Size(2, 'rem'),
      medium: new Size(4, 'rem'),
      large: new Size(8, 'rem'),
    },
  },
  passthroughProps: ['disabled'],
})`
  ${props => {
    return props.block
      ? `
      display: block;
      width: 100%;
    `
      : `
     display: inline-block;
  `;
  }};
  height: ${p => p.feeling.size.string()};
  font-size: ${p => p.feeling.size.scale(0.5).string()};
  text-transform: uppercase;
  background-color: ${props => props.feeling.main.string()};
  color: ${props => props.feeling.alt.string()};
  border: none;
  border-radius: 0;
  padding: 0 1rem;
`;
