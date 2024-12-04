import * as globalTypes from 'client/types';
import * as types from './types';
/* eslint-disable import/prefer-default-export */
export const getFeatureFlags = (
  state: globalTypes.State
): ReadonlyArray<types.FeatureFlag> => state.featureFlags.featureFlags || [];
/* eslint-enable import/prefer-default-export */
