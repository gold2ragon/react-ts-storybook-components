// This is just an example file to make sure TypeScript works

import { default as React, Component } from 'react';

export class Button extends Component<{ children: ReactNode; id: string }> {
  render() {
    return <button id={this.props.id}>{this.props.children}</button>;
  }
}
