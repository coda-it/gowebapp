import * as globalTypes from 'client/types';

/* eslint-disable import/prefer-default-export */
export const getPlatformConfig = (state: globalTypes.State) =>
  state.platform.config;
/* eslint-enable import/prefer-default-export */
