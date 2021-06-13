// @flow
import * as actionTypes from './actionTypes';
import type * as types from './types';



export const fetchLanding = () => ({
  type: actionTypes.FETCH_LANDING,
}); 

export const updateLanding = (input: string, id: string): types.UpdateLandingAction => (
{
  type: actionTypes.UPDATE_LANDING,
  input,
  id,

}); 

export const addLanding = (input: string): types.AddLandingAction => ({
  type: actionTypes.ADD_LANDING,
  input,
}); 

export const fetchLandingSuccess = (input: string, id: string) => ({
  type: actionTypes.FETCH_LANDING_SUCCESS,
  input,
  id,
});
