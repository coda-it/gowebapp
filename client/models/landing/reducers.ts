import * as actionTypes from './actionTypes';
import type * as types from './types';


const defaultState: types.State = {
  input: "default",
  id: ""
};

export default function reducers(
  state: types.State = defaultState,
  action: types.Action
) {
  switch (action.type) {
    case actionTypes.PUT_LANDING:
      return {
        input: action.input,
        id: action.id
      };
    default:
      return state;
  }

}



