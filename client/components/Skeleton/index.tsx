import React from 'react';
import classNames from 'classnames';

function Sekeleton({ className }: { className?: string }) {
  const classes = classNames(className, 'l-skeleton');

  return <div className={classes} />;
}

export default Sekeleton;
