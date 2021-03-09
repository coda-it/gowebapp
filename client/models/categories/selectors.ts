import _ from 'lodash';
import * as globalTypes from 'client/types';
import * as types from './types';

export const getCategories = (
  state: globalTypes.State
): ReadonlyArray<types.Category> => state.categories.categories;

export const getCategoryById = (
  state: globalTypes.State,
  id?: string
): types.Category => _.find(state.categories.categories, { id });
