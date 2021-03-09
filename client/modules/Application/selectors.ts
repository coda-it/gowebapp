import type * as globalTypes from 'client/types';

/* eslint-disable import/prefer-default-export */
export const getIsLoaded = (state: globalTypes.State): boolean => state.application?.isLoaded ?? false;
/* eslint-enable import/prefer-default-export */
