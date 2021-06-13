// @flow
import * as actionTypes from './actionTypes';
import type * as types from './types';



export const fetchLanding = () => ({
  type: actionTypes.FETCH_LANDING,
}); 

export const updateLanding = (input, id) => (
{
  type: actionTypes.UPDATE_LANDING,
  input,
  id,

}); 

export const addLanding = (input) => ({
  type: actionTypes.ADD_LANDING,
  input,
}); 

export const fetchLandingSuccess = (input, id) => ({
  type: actionTypes.FETCH_LANDING_SUCCESS,
  input,
  id,
});
