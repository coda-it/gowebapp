import React, { useEffect } from 'react';
import AlertPanel from 'client/modules/AlertPanel/AlertPanel';
import { Loader } from 'graphen';

type Props = {
  isLoaded: boolean;
  children: React.ReactNode;
  mount: () => void;
};

function Application({ isLoaded, children, mount }: Props) {
  useEffect(() => {
    mount();
  }, [mount]);

  return (
    <div className="application">
      {isLoaded && children}
      {!isLoaded && <Loader />}
      <AlertPanel />
    </div>
  );
}

export default Application;
