import React from 'react';
import AlertPanel from 'client/modules/AlertPanel';
import { Loader } from 'graphen';

type Props = {
  isLoaded: boolean;
  children: React.ReactNode;
  mount: () => void;
};

class Application extends React.PureComponent<Props> {
  componentDidMount() {
    const { mount } = this.props;
    mount();
  }

  render() {
    const { children, isLoaded } = this.props;

    return (
      <div className="application">
        {isLoaded && children}
        {!isLoaded && <Loader />}
        <AlertPanel />
      </div>
    );
  }
}

export default Application;
