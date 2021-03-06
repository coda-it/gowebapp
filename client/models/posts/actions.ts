import * as userTypes from 'client/models/users/types';
import * as actionTypes from './actionTypes';
import type * as types from './types';

export const addPost = (
  title: string,
  description: string,
  categoryId: string | null,
  image: string | null
): types.AddPostAction => ({
  type: actionTypes.ADD_POST,
  title,
  description,
  categoryId,
  image,
});

export const updatePost = (
  id: string,
  title: string,
  description: string,
  categoryId: string | null,
  image: string | null
): types.UpdatePostAction => ({
  type: actionTypes.UPDATE_POST,
  id,
  title,
  description,
  categoryId,
  image,
});

export const deletePost = (id: string): types.DeletePostAction => ({
  type: actionTypes.DELETE_POST,
  id,
});

export const fetchPosts = (user?: userTypes.User): types.FetchPostsAction => ({
  type: actionTypes.FETCH_POSTS,
  user,
});

export const fetchPostsSuccess = (posts: ReadonlyArray<types.Post>) => ({
  type: actionTypes.FETCH_POSTS_SUCCESS,
  posts,
});
