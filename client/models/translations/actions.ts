import * as actionTypes from './actionTypes';
import type * as types from './types';

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

export const fetchTranslations = (): types.GetTranslationsAction => ({
  type: actionTypes.FETCH_TRANSLATIONS,
});

export const fetchTranslationsSuccess = (
  translations: ReadonlyArray<types.Translation>
): types.GetTranslationsSuccessAction => ({
  type: actionTypes.FETCH_TRANSLATIONS_SUCCESS,
  translations,
});

export const updateTranslation = (
  id: string,
  key: string,
  value: string,
  language: string
): types.UpdateTranslationAction => ({
  type: actionTypes.UPDATE_TRANSLATION,
  id,
  key,
  value,
  language,
});

export const deleteTranslation = (id: string) => ({
  type: actionTypes.DELETE_TRANSLATION,
  id,
});
