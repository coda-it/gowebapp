import React from 'react';
import type * as types from './types';

export default function Previewer(props: types.Props) {
  const { image } = props;
  return image ? (
    <img className="l-previewer__image" src={image} alt="previewer" />
  ) : (
    <div className="l-previewer__no-image">No Image Loaded</div>
  );
}
