import * as globalTypes from 'client/types';
import * as types from './types';
/* eslint-disable import/prefer-default-export */
export const getTranslations = (
  state: globalTypes.State
): ReadonlyArray<types.Translation> => state.translations.translations || [];
/* eslint-enable import/prefer-default-export */
