// @flow
import * as actionTypes from './actionTypes';
import * as types from './types';

export const addCategory = (name: string) => ({
  type: actionTypes.ADD_CATEGORY,
  name,
});

export const updateCategory = (id: string, name: string) => ({
  type: actionTypes.UPDATE_CATEGORY,
  id,
  name,
});

export const deleteCategory = (id: string) => ({
  type: actionTypes.DELETE_CATEGORY,
  id,
});

export const fetchCategories = () => ({
  type: actionTypes.FETCH_CATEGORIES,
});

export const fetchCategoriesSuccess = (
  categories: $ReadOnlyArray<types.Category>
) => ({
  type: actionTypes.FETCH_CATEGORIES_SUCCESS,
  categories,
});
