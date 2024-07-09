import * as actionTypes from './actionTypes';
import type * as types from './types';
/* eslint-disable import/prefer-default-export */
export const addTranslation = (
  key: string,
  value: string,
  language: string
): types.AddTranslationAction => ({
  type: actionTypes.ADD_TRANSLATION,
  key,
  value,
  language,
});
/* eslint-enable import/prefer-default-export */
