// @flow
import _ from 'lodash';
import * as globalTypes from 'client/types';
import * as types from './types';

export const getPosts = (
  state: globalTypes.State
): $ReadOnlyArray<types.Post> => state.posts.posts;

export const getPostById = (state: globalTypes.State, id: string): types.Post =>
  _.find(state.posts.posts, { id });
