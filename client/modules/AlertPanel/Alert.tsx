import React from 'react';

type Props = {
  type: string;
  children: React.ReactNode;
};

type State = {
  show: boolean;
  hide: boolean;
};

class Alert extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      hide: false,
    };
  }

  componentDidMount() {
    // @ts-ignore
    this.showTimeout = setTimeout(() => {
      this.setState({ show: true });
    }, 2000);
    // @ts-ignore
    this.hideTimeout = setTimeout(() => {
      this.setState({ hide: true });
    }, 4000);
  }

  componentWillUnmount() {
    // @ts-ignore
    if (this.showTimeout) {
      // @ts-ignore
      clearTimeout(this.showTimeout);
    }
    // @ts-ignore
    if (this.hideTimeout) {
      // @ts-ignore
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
