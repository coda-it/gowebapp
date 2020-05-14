// @flow
import * as globalTypes from 'client/types';
import * as types from './types';

/* eslint-disable import/prefer-default-export */
export const getPosts = (
  state: globalTypes.State
): $ReadOnlyArray<types.Post> => state.posts.posts;
/* eslint-enable import/prefer-default-export */
