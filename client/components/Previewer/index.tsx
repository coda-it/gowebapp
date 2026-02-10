import React from 'react';
import classNames from 'classnames';
import type * as types from './types';

export default function Previewer(props: types.Props) {
  const { image, className, isRounded } = props;
  const classes = classNames('gm-margin-center', className);
  const imageStyles = classNames('l-previewer__image', {
    'l-previewer__image--rounded': isRounded,
  });
  const noImageStyles = classNames('l-previewer__no-image', {
    'l-previewer__image--rounded': isRounded,
  });

  return (
    <div className={classes}>
      {image ? (
        <img className={imageStyles} src={image} alt="previewer" />
      ) : (
        <div className={noImageStyles}>No Image Loaded</div>
      )}
    </div>
  );
}
