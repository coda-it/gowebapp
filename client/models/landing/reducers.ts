import * as actionTypes from './actionTypes';
import type * as types from './types';


const defaultState = {
  landingModule: "default",
  id: ""
};

export default function reducers(
  state = defaultState,
  action: types.Action
) {
  switch (action.type) {
    case actionTypes.FETCH_LANDING_SUCCESS:
    console.log('action', action)
      return {
        ...state,
        landingModule: action.input,
        id: action.id,
        
      }
    default:
      return state;
  }

}



