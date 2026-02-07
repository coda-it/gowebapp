import React from 'react';
import classNames from 'classnames';
import type * as types from './types';

export default function Previewer(props: types.Props) {
  const { image, className } = props;
  const classes = classNames('gm-margin-center', className);

  return (
    <div className={classes}>
      {image ? (
        <img className="l-previewer__image" src={image} alt="previewer" />
      ) : (
        <div className="l-previewer__no-image">No Image Loaded</div>
      )}
    </div>
  );
}
