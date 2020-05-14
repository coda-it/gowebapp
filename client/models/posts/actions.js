// @flow
import * as actionTypes from './actionTypes';
import * as types from './types';

export const addPost = (title: string, description: string) => ({
  type: actionTypes.ADD_POST,
  title,
  description,
});

export const fetchPosts = () => ({
  type: actionTypes.FETCH_POSTS,
});

export const fetchPostsSuccess = (posts: $ReadOnlyArray<types.Post>) => ({
  type: actionTypes.FETCH_POSTS_SUCCESS,
  posts,
});
