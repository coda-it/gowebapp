import * as actionTypes from './actionTypes';
import type * as types from './types';

const defaultState: types.State = {
  translations: [],
};

export default function reducers(
  state: types.State = defaultState,
  action: types.Action
) {
  switch (action.type) {
    case actionTypes.FETCH_TRANSLATIONS_SUCCESS:
      return {
        ...state,
        translations: (action as types.GetTranslationsSuccessAction)
          .translations,
      };
    default:
      return state;
  }
}
