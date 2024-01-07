import * as actionTypes from './actionTypes';
import type * as types from './types';

export const addCategory = (
  name: string,
  image: string | null
): types.AddCategoryAction => ({
  type: actionTypes.ADD_CATEGORY,
  name,
  image,
});

export const updateCategory = (
  id: string,
  name: string,
  image: string | null
): types.UpdateCategoryAction => ({
  type: actionTypes.UPDATE_CATEGORY,
  id,
  name,
  image,
});

export const deleteCategory = (id: string): types.DeleteCategoryAction => ({
  type: actionTypes.DELETE_CATEGORY,
  id,
});

export const fetchCategories = () => ({
  type: actionTypes.FETCH_CATEGORIES,
});

export const fetchCategoriesSuccess = (
  categories: ReadonlyArray<types.Category>
) => ({
  type: actionTypes.FETCH_CATEGORIES_SUCCESS,
  categories,
});
