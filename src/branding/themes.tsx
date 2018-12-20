// Copyright (c) 2018 Standard Bots Company. All rights reserved.

import * as Color from 'color';

const basicColors = {
  // commented are the names the style guide gives at this time
  brightBlue: Color('#182fff'), // "Button Active"
  sideGray: Color('#1e232b'), // "Side menu bg" & "Side accent"
  dark: Color('#15171c'), // "Base bg"
  veryDark: Color('#121417'), // "Navigation bg"
  mediumGray: Color('#43464b'), // "Lines"
  highlightGray: Color('#1a1c21'),
  yellow: Color('#dfc10e'), // "Robot status"
  green: Color('#2e9e21'), // "Positive"
  red: Color('#e43e29'), // "Negative"
  lightBlue: Color('#5d85c6'), // "Support"
  white: Color('#ffffff'), // "Text / Icons"
  lightGray: Color('#b7b7b7'), // "Slider"
  darkGray2: Color('#1a1e24'), // "Placehodlers",
  deepBlue: Color('#1c2027'), // for panels
};

type Unit = 'px' | '%' | 'em' | 'rem';

export class Size {
  unit: Unit;
  amount: number;

  constructor(amount: number, unit: Unit) {
    this.amount = amount;
    this.unit = unit;
  }

  string() {
    return `${this.amount}${this.unit}`;
  }

  scale(by: number) {
    return new Size(this.amount * by, this.unit);
  }

  px() {
    if (this.unit === 'px') {
      return this.amount;
    }

    throw new Error(`Tried to get px of size with unit ${this.unit}`);
  }

  minus(size: Size | number) {
    if (size instanceof Size) {
      return this.plus(size.negative());
    }

    return this.plus(-size);
  }

  plus(size: Size | number) {
    let amount = size;
    if (size instanceof Size) {
      if (size.unit !== this.unit) {
        throw new Error(
          `Tried to subtract a size with unit ${
            size.unit
          } from a size with unit ${this.unit}`,
        );
      }

      amount = size.amount;
    }

    if (amount instanceof Size) {
      amount = amount.amount;
    }

    return new Size(this.amount + amount, this.unit);
  }

  negative() {
    return new Size(-this.amount, this.unit);
  }
}

const navbarHeight = new Size(180, 'px');
const secondaryNavbarHeight = new Size(145, 'px');
const chromebookHeight = new Size(1600, 'px');
// const chromebookWidth = new Size(2400, 'px');

const gutterSize = secondaryNavbarHeight.minus(new Size(105, 'px')).scale(0.5);

export interface Theme {
  colors: {
    text: Color;
    textMuted: Color;
    bodyBackground: Color;
    navbarBackground: Color;
    shadows: Color;
    glint: Color;
    highlight: Color;
    well: Color;
    sidebarBackground: Color;
    inputBackground: Color;
    sidebarActiveBackground: Color;
    lines: Color;
    accent: Color;
    panelBackground: Color;
    tableRow: {
      odd: Color;
      even: Color;
    };
    buttonBackground: Color;
    // TODO: This is the color from the emergency stop at the top of the video
    danger: Color;
    ghost: Color;
    negative: Color;
    warning: Color;
    positive: Color;

    feelings: {
      danger: {
        main: Color;
        alt: Color;
      };
      negative: {
        main: Color;
        alt: Color;
      };
      warning: {
        main: Color;
        alt: Color;
      };
      positive: {
        main: Color;
        alt: Color;
      };
      accented: {
        main: Color;
        alt: Color;
      };
      disabled: {
        main: Color;
        alt: Color;
      };
    };
  };
  sizes: {
    navbar: {
      height: Size;
      secondaryHeight: Size;
      font: {
        size: Size;
      };
      controls: {
        height: Size;
      };
    };
    viewport: {
      height: Size;
    };
    main: {
      height: Size;
      gutter: {
        height: Size;
        width: Size;
      };
    };
    controller: {
      video: {
        width: Size;
      };
      controls: {
        width: Size;
      };
    };
  };
}

export const main: Theme = {
  colors: {
    text: basicColors.white,
    textMuted: basicColors.lightGray,
    bodyBackground: basicColors.dark,
    navbarBackground: basicColors.veryDark,
    shadows: basicColors.veryDark,
    glint: basicColors.lightGray,
    highlight: basicColors.highlightGray,
    well: basicColors.highlightGray,
    sidebarBackground: basicColors.sideGray,
    inputBackground: basicColors.sideGray,
    sidebarActiveBackground: basicColors.dark,
    lines: basicColors.mediumGray,
    accent: basicColors.brightBlue,
    panelBackground: basicColors.deepBlue,
    tableRow: {
      odd: Color('#191c21'),
      even: basicColors.deepBlue,
    },
    buttonBackground: basicColors.deepBlue,
    // TODO: This is the color from the emergency stop at the top of the video
    danger: Color('#9b0303').lighten(0.8),
    ghost: Color('#fff').alpha(0),
    negative: basicColors.red,
    warning: basicColors.yellow,
    positive: basicColors.green,

    feelings: {
      danger: {
        main: Color('#9b0303').lighten(0.8),
        alt: basicColors.white,
      },
      negative: {
        main: basicColors.red,
        alt: basicColors.white,
      },
      warning: {
        main: basicColors.yellow,
        alt: basicColors.white,
      },
      positive: {
        main: basicColors.green,
        alt: basicColors.white,
      },
      accented: {
        main: basicColors.brightBlue,
        alt: basicColors.white,
      },
      disabled: {
        main: Color('#505155'),
        alt: Color('#17191d'),
      },
    },
  },
  sizes: {
    navbar: {
      height: navbarHeight,
      secondaryHeight: secondaryNavbarHeight,
      font: {
        size: new Size(2, 'em'),
      },
      controls: {
        height: new Size(105, 'px'),
      },
    },
    viewport: {
      height: chromebookHeight,
    },
    main: {
      height: chromebookHeight.minus(navbarHeight),
      gutter: {
        height: gutterSize,
        width: gutterSize,
      },
    },
    controller: {
      video: {
        width: new Size(7 / 12, '%'),
      },
      controls: {
        width: new Size(47 / 240, '%'),
      },
    },
  },
};
