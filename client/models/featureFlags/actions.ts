import * as actionTypes from './actionTypes';
import type * as types from './types';

export const addFeatureFlag = (
  key: string,
  value: boolean,
): types.AddFeatureFlagAction => ({
  type: actionTypes.ADD_FEATURE_FLAG,
  key,
  value,
});

export const fetchFeatureFlags = (): types.GetFeatureFlagsAction => ({
  type: actionTypes.FETCH_FEATURE_FLAGS,
});

export const fetchFeatureFlagsSuccess = (
  featureFlags: ReadonlyArray<types.FeatureFlag>
): types.GetFeatureFlagsSuccessAction => ({
  type: actionTypes.FETCH_FEATURE_FLAGS_SUCCESS,
  featureFlags,
});

export const updateFeatureFlag = (
  id: string,
  key: string,
  value: boolean,
): types.UpdateFeatureFlagAction => ({
  type: actionTypes.UPDATE_FEATURE_FLAG,
  id,
  key,
  value,
});

export const deleteFeatureFlag = (id: string) => ({
  type: actionTypes.DELETE_FATURE_FLAG,
  id,
});
