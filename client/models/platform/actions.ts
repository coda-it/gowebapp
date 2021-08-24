import * as actionTypes from './actionTypes';
import type * as types from './types';

export const fetchPlatform = () => ({
  type: actionTypes.FETCH_PLATFORM,
});

export const updatePlatform = (config: types.PlatformConfig): types.Action => ({
  type: actionTypes.UPDATE_PLATFORM,
  config,
});

export const addPlatform = (config: types.PlatformConfig): types.Action => ({
  type: actionTypes.ADD_PLATFORM,
  config,
});

export const fetchPlatformSuccess = (
  config: types.PlatformConfig
): types.Action => ({
  type: actionTypes.FETCH_PLATFORM_SUCCESS,
  config,
});
