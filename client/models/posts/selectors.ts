import _ from 'lodash';
import * as globalTypes from 'client/types';
import * as types from './types';

export const getPosts = (state: globalTypes.State): ReadonlyArray<types.Post> =>
  state.posts.posts;

export const getPostById = (state: globalTypes.State, id: string): types.Post =>
  _.find(getPosts(state), { id });

export const getPostsByCategoryId = (
  state: globalTypes.State,
  categoryId: string
): types.Post => _.filter(getPosts(state), { categoryId });
