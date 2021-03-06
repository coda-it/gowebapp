import * as actionTypes from './actionTypes';
import type * as types from './types';

const defaultState: types.State = {
  posts: [],
};

export default function reducers(
  state: types.State = defaultState,
  action: types.Action,
) {
  switch (action.type) {
    case actionTypes.FETCH_POSTS_SUCCESS:
      return {
        posts: action.posts,
      };
    default:
      return state;
  }
}
