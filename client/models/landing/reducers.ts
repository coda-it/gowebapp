import * as actionTypes from './actionTypes';
import type * as types from './types';


const defaultState = {
  landingModule: null,
  id: null
};

export default function reducers(
  state: types.State = defaultState,
  action: types.Action
) {
  switch (action.type) {
    case actionTypes.FETCH_LANDING_SUCCESS:
      return {
        ...state,
        landingModule: action.input,
        id: action.id,
        
      }
    default:
      return state;
  }

}



