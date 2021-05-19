import { put, call } from 'redux-saga/effects';
import * as alertActions from 'client/models/alerts/actions';
import * as alertConstants from 'client/models/alerts/constants';
import * as actions from './actions';
import * as constants from './constants';
import type * as types from './types';

function callAddCategory(name: string, image: string) {
  const request = new Request(constants.CATEGORY_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      name,
      image,
    }),
  });

  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Adding category failed');
}

export function* onAddCategory({
  name,
  image,
}: types.AddCategoryAction): Iterable<any> {
  const response = yield call(callAddCategory, name, image);

  if (typeof response === 'string') {
    put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
  }

  window.location.href = '/admin/categories';
}

function callUpdateCategory(name: string, image: string, id: string) {
  const request = new Request(constants.CATEGORY_ENDPOINT, {
    method: 'PUT',
    body: JSON.stringify({
      id,
      name,
      image,
    }),
  });

  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Updating category failed');
}

export function* onUpdateCategory({
  id,
  name,
  image,
}: types.UpdateCategoryAction): Iterable<any> {
  const response = yield call(callUpdateCategory, name, image, id);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  yield put(
    alertActions.addAlert('Category updated', alertConstants.ALERT_TYPE_INFO)
  );
}

function callDeleteCategory(id: string) {
  const request = new Request(constants.CATEGORY_ENDPOINT, {
    method: 'DELETE',
    body: JSON.stringify({
      id,
    }),
  });

  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Removing category failed');
}

export function* onDeleteCategory({
  id,
}: types.DeleteCategoryAction): Iterable<any> {
  const response = yield call(callDeleteCategory, id);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  window.location.href = '/admin/categories';
}

export function callFetchCategories() {
  const request = new Request(constants.CATEGORY_ENDPOINT, {
    method: 'GET',
  });

  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Fetch categories failed');
}

export function* onFetchCategories(): Iterable<any> {
  const response: types.ApiResponse = yield call(callFetchCategories);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  const categories = response?._embedded?.categories || [];
  yield put(actions.fetchCategoriesSuccess(categories));
}
