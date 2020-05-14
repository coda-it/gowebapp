// @flow
import * as actionTypes from './actionTypes';
import * as types from './types';

const defaultState: types.State = {
  posts: [],
};

export default function reducers(
  state: types.State = defaultState,
  action: Function
) {
  switch (action.type) {
    case actionTypes.FETCH_POSTS_SUCCESS:
      return Object.assign(
        {},
        {
          posts: action.posts,
        }
      );
    default:
      return state;
  }
}
