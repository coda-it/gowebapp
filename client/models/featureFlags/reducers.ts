import * as actionTypes from './actionTypes';
import type * as types from './types';

const defaultState: types.State = {
  featureFlags: [],
};

export default function reducers(
  state: types.State = defaultState,
  action: types.Action
) {
  switch (action.type) {
    case actionTypes.FETCH_FEATURE_FLAGS_SUCCESS:
      return {
        ...state,
        featureFlags: (action as types.GetFeatureFlagsSuccessAction)
          .featureFlags,
      };
    default:
      return state;
  }
}
