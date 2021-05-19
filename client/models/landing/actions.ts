// @flow
import * as actionTypes from './actionTypes';
import type * as types from './types';



export const putLanding = (
  input: string,
): types.PutLandingAction => ({
  type: actionTypes.PUT_LANDING,
  input,
  
}); 


