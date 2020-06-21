// @flow
import * as actionTypes from './actionTypes';
import * as types from './types';

const defaultState: types.State = {
  categories: [],
};

export default function reducers(
  state: types.State = defaultState,
  action: Function
) {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES_SUCCESS:
      return Object.assign(
        {},
        {
          categories: action.categories,
        }
      );
    default:
      return state;
  }
}
