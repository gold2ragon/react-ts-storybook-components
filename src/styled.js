// Copyright (c) Standard Bots Company. All rights reserved.

import {
  flatten,
  get,
  isFunction,
  keys,
  mergeAll,
  omit,
  uniq,
  without,
} from 'lodash/fp';
import Color from 'color';
import React from 'react';
import styledComponent from 'styled-components';

import { coalesce } from './utilities/coalesce';

/**
 * The primary purpose of this wrapper around styled-components
 * is to allow us to reuse the code that lets us
 * do things like <Button positive muted>Hello</Button> and have the button show up in the right color
 * Also now we have a slightly higher ability to replace
 * styled-components in the future.
 *
 * This transformation is insane and probably slow, but it attempts to create some magic
 * to avoid *a lot* of repeated code.
 */
export function styled(
  Component,
  {
    // should we compute the feeling at all? otherwise, component doesn't get a feeling
    // unless directly passed
    inheritFeeling = false,
    feelings: feelingOverrides = {},
    // only get feeling if withFeeling is true or if feeling overrides are supplied
    withFeeling = isFunction(feelingOverrides) ||
      Object.keys(feelingOverrides).length > 0,
    stripAttribute = withFeeling,
    ghostTransform = ({ main, alt }) => ({ main: alt, alt: main.alpha(0) }),
    // enumerated attributes are like groups of feelings of which there can be multiple
    // but are mutually exclusive within themselves. the purpose they were originally
    // created for is sizes, where they can be small, medium, or large. so this would be
    // {
    //   size: {
    //     default: 'medium',
    //     small: '1rem',
    //     medium: '4rem',
    //     large: '8rem',
    //   }
    // }
    //
    // and passing { small: true } as a prop would give the feeling { size: '1rem' }
    //
    // See Button.js
    enumeratedAttributes = {},
    passthroughProps = [],
  } = {},
) {
  if (!withFeeling) {
    return styledComponent(Component);
  }

  let StrippedComponent = Component;
  if (stripAttribute) {
    StrippedComponent = ({ feeling, propertiesToOmit, ...props }) => {
      return <Component {...omit(propertiesToOmit, props)} />;
    };
  }

  return styledComponent(StrippedComponent).attrs({
    feeling: ({
      // transparent background with normal primary as foreground, but see ghostTransform
      ghost = false,
      theme,
      feeling,
      ...props
    }) => {
      // calculate enumerated attributes
      const attributes = Object.entries(enumeratedAttributes).reduce(
        (soFar, [name, possibilities]) => {
          let newAttribute = Object.entries(possibilities).reduce(
            (already, [prop, value]) => {
              if (props[prop]) {
                if (already != null) {
                  throw new Error(
                    `Component ${Component.name} cannot have both '${
                      already.prop
                    }' and '${prop}' props set as they are mutually exclusive.`,
                  );
                }

                return { prop, value };
              }

              return already;
            },
            null,
          );

          let value = get('value', newAttribute);
          if (!value) {
            value = possibilities[possibilities.default];
          }

          if (isFunction(value)) {
            value = value({
              ...props,
              theme,
            });
          }

          return {
            ...soFar,
            [name]: value,
          };
        },
        {},
      );

      if (inheritFeeling) {
        return {
          ...attributes,
          ...feeling,
        };
      }

      const feelings = mergeAll([
        theme.colors.feelings,
        isFunction(feelingOverrides)
          ? feelingOverrides({ theme })
          : feelingOverrides,
      ]);

      const uniques = Object.keys(feelings);

      const enabled = Object.entries(props)
        .filter(([name]) => uniques.includes(name))
        .filter(([name, value]) => value);

      if (enabled.length > 1) {
        throw new Error(
          `${Component.name} can only have one of [${Object.keys(uniques).join(
            ', ',
          )}] props (has [${enabled.map(([name]) => name).join(', ')}]).`,
        );
      }

      let color = enabled[0];
      if (color) {
        color = color[0];
      }

      color = coalesce(color, 'default');

      feeling = color.main instanceof Color ? color : feelings[color];

      if (!feeling) {
        throw new Error(
          `No known feeling for ${color} (rendering ${Component.name ||
            Component})`,
        );
      }

      if (ghost) {
        feeling = ghostTransform(feeling, {
          props,
          feelingKey: typeof color === 'string' && color,
          theme,
        });
      }

      return {
        ...attributes,
        ...feeling,
      };
    },
    propertiesToOmit({ theme }) {
      const feelings = mergeAll([
        theme.colors.feelings,
        isFunction(feelingOverrides)
          ? feelingOverrides({ theme })
          : feelingOverrides,
      ]);

      return without(passthroughProps, [
        'muted',
        'ghost',
        'color',
        ...Object.keys(feelings),
        ...Object.keys(enumeratedAttributes),
        ...uniq(flatten(Object.values(enumeratedAttributes).map(keys))),
      ]);
    },
  });
}
