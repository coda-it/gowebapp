import type * as globalTypes from 'client/types';
import type * as types from './types';

export const getUser = (state: globalTypes.State): types.User => {
  return state.users?.user;
};

export const getId = (state: globalTypes.State): string => {
  return getUser(state).id || '';
};

export const getUsername = (state: globalTypes.State): string => {
  return getUser(state).username || '';
};

export const getPassword = (state: globalTypes.State): string => {
  return getUser(state).password || '';
};

export const getFeatureFlags = (state: globalTypes.State): Object => {
  return getUser(state).featureFlags || {};
};
