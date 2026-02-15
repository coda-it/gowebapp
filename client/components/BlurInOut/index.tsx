import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

type Props = {
  onClose?: () => void;
  className?: string;
};

function withBlurInOut<P extends Props>(Wrapped: React.ComponentType<P>) {
  return function Enhanced(props: P) {
    const { onClose, className, ...rest } = props;

    const [isHiding, setIsHiding] = useState(false);
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsShown(true);
      }, 350);

      return () => {
        clearTimeout(timer);
      };
    }, []);

    const classes = classNames(className, 'l-blur-in-out', {
      'l-blur-in-out--hiding': isHiding,
      'l-blur-in-out--entering': !isShown,
    });

    return (
      <Wrapped
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...(rest as P)}
        onClose={() => {
          setIsHiding(true);
          setTimeout(() => {
            onClose?.();
          }, 350);
        }}
        className={classes}
      />
    );
  };
}

export default withBlurInOut;
