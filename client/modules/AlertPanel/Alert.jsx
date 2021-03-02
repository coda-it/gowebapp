// @flow
import React from 'react';

type Props = {
  type: string,
  children: React$Element<any>,
};

type State = {
  show: boolean,
  hide: boolean,
};

class Alert extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      show: false,
      hide: false,
    };
  }

  componentDidMount() {
    // $FlowFixMe - this component will be transformed into typescript soon
    this.showTimeout = setTimeout(() => {
      this.setState({ show: true });
    }, 2000);
    // $FlowFixMe - this component will be transformed into typescript soon
    this.hideTimeout = setTimeout(() => {
      this.setState({ hide: true });
    }, 4000);
  }

  componentWillUnmount() {
    // $FlowFixMe - this component will be transformed into typescript soon
    if (this.showTimeout) {
      // $FlowFixMe - this component will be transformed into typescript soon
      clearTimeout(this.showTimeout);
    }
    // $FlowFixMe - this component will be transformed into typescript soon
    if (this.hideTimeout) {
      // $FlowFixMe - this component will be transformed into typescript soon
      clearTimeout(this.hideTimeout);
    }
  }

  render() {
    const { type, children } = this.props;
    const { show, hide } = this.state;

    const showClass = show ? 'show' : '';
    const hideClass = hide ? 'hide' : '';
    const classes = `alert-panel__alert alert-panel__alert--${type} ${showClass} ${hideClass}`;

    return <div className={classes}>{children}</div>;
  }
}

export default Alert;
