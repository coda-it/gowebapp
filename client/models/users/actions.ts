import * as actionTypes from './actionTypes';
import * as types from './types';

export const fetchUser = () => ({
  type: actionTypes.FETCH_USER,
});

export const loadUser = (user: types.User) => ({
  type: actionTypes.LOAD_USER,
  user,
});

export const fetchUserError = (error: string) => ({
  type: actionTypes.FETCH_USER_FAILURE,
  error,
});
