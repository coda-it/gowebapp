// @flow
import * as types from './types';

export const getUser = (state: Object): types.User => {
  return state.users?.user || {};
};

export const getId = (state: Object): string => {
  return getUser(state).id || '';
};

export const getUsername = (state: Object): string => {
  return getUser(state).username || '';
};

export const getPassword = (state: Object): string => {
  return getUser(state).password || '';
};

export const getFeatureFlags = (state: Object): Object => {
  return getUser(state).featureFlags || {};
};
