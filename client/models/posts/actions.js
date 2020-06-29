// @flow
import * as userTypes from 'client/models/users/types';
import * as actionTypes from './actionTypes';
import * as types from './types';

export const addPost = (
  title: string,
  description: string,
  categoryId: string | null
) => ({
  type: actionTypes.ADD_POST,
  title,
  description,
  categoryId,
});

export const updatePost = (
  id: string,
  title: string,
  description: string,
  categoryId: string | null
) => ({
  type: actionTypes.UPDATE_POST,
  id,
  title,
  description,
  categoryId,
});

export const deletePost = (id: string) => ({
  type: actionTypes.DELETE_POST,
  id,
});

export const fetchPosts = (user?: userTypes.User) => ({
  type: actionTypes.FETCH_POSTS,
  user,
});

export const fetchPostsSuccess = (posts: $ReadOnlyArray<types.Post>) => ({
  type: actionTypes.FETCH_POSTS_SUCCESS,
  posts,
});
