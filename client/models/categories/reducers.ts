import * as actionTypes from './actionTypes';
import type * as types from './types';

const defaultState: types.State = {
  categories: [],
};

export default function reducers(
  state: types.State = defaultState,
  action: types.Action,
) {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        categories: action.categories,
      };
    default:
      return state;
  }
}
