// @flow
import { put, call, select } from 'redux-saga/effects';
import * as alertActions from 'client/models/alerts/actions';
import * as alertConstants from 'client/models/alerts/constants';
import * as userSelectors from 'client/models/users/selectors';
import * as userTypes from 'client/models/users/types';
import * as actions from './actions';
import * as constants from './constants';

function callAddPost(
  title: string,
  description: string,
  categoryId: string | null,
  userId: string,
  image: string | null
) {
  const request = new Request(constants.POST_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      userId,
      categoryId,
      title,
      description,
      image,
    }),
  });

  return fetch(request)
    .then(response => response.json())
    .catch(() => 'Adding post failed');
}

export function* onAddPost({
  title,
  description,
  categoryId,
  image,
}: {
  title: string,
  description: string,
  categoryId: string | null,
  image: string | null,
}): Iterable<any> {
  const userId = yield select(userSelectors.getId);
  const response = yield call(
    callAddPost,
    title,
    description,
    categoryId,
    userId,
    image
  );

  if (typeof response === 'string') {
    put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
  }

  window.location.href = '/admin/posts';
}

function callUpdatePost(
  title: string,
  description: string,
  id: string,
  categoryId: string | null,
  userId: string,
  image: string | null
) {
  const request = new Request(constants.POST_ENDPOINT, {
    method: 'PUT',
    body: JSON.stringify({
      id,
      userId,
      categoryId,
      title,
      description,
      image,
    }),
  });

  return fetch(request)
    .then(response => response.json())
    .catch(() => 'Updating post failed');
}

export function* onUpdatePost({
  id,
  title,
  description,
  categoryId,
  image,
}: {
  id: string,
  title: string,
  description: string,
  categoryId: string | null,
  image: string | null,
}): Iterable<any> {
  const userId = yield select(userSelectors.getId);
  const response = yield call(
    callUpdatePost,
    title,
    description,
    id,
    categoryId,
    userId,
    image
  );

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  yield put(
    alertActions.addAlert('Post updated', alertConstants.ALERT_TYPE_INFO)
  );
}

function callDeletePost(id: string) {
  const request = new Request(constants.POST_ENDPOINT, {
    method: 'DELETE',
    body: JSON.stringify({
      id,
    }),
  });

  return fetch(request)
    .then(response => response.json())
    .catch(() => 'Updating post failed');
}

export function* onDeletePost({ id }: { id: string }): Iterable<any> {
  const response = yield call(callDeletePost, id);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  window.location.href = '/admin/posts';
}

export function callFetchPosts(userId: string) {
  const userIdParam = userId ? `userId=${userId}` : null;
  const urlParams = userIdParam ? `?${userIdParam}` : '';

  const request = new Request(`${constants.POST_ENDPOINT}${urlParams}`, {
    method: 'GET',
  });

  return fetch(request)
    .then(response => response.json())
    .catch(() => 'Fetch posts failed');
}

export function* onFetchPosts({
  user,
}: {
  user?: userTypes.User,
}): Iterable<any> {
  const userId = user?.id;
  const response = yield call(callFetchPosts, userId);

  if (typeof response === 'string') {
    yield put(alertActions.addAlert(response, alertConstants.ALERT_TYPE_ERROR));
    return;
  }

  const posts = response?._embedded?.posts || [];
  yield put(actions.fetchPostsSuccess(posts));
}
