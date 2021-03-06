import { takeEvery } from 'redux-saga/effects';
import * as applicationSagas from './modules/Application/sagas';
import * as applicationActionTypes from './modules/Application/actionTypes';
import * as categoriesSagas from './models/categories/sagas';
import * as categoriesActionTypes from './models/categories/actionTypes';
import * as postsSagas from './models/posts/sagas';
import * as postsActionTypes from './models/posts/actionTypes';
import * as usersSagas from './models/users/sagas';
import * as usersActionTypes from './models/users/actionTypes';
import * as landingSagas from './models/landing/sagas';
import * as landingActionTypes from './models/landing/actionTypes';

function* root() {
  yield [
    takeEvery(
      applicationActionTypes.MOUNT,
      applicationSagas.onApplicationMount
    ),
    takeEvery(postsActionTypes.ADD_POST, postsSagas.onAddPost),
    takeEvery(postsActionTypes.UPDATE_POST, postsSagas.onUpdatePost),
    takeEvery(postsActionTypes.DELETE_POST, postsSagas.onDeletePost),
    takeEvery(postsActionTypes.FETCH_POSTS, postsSagas.onFetchPosts),
    takeEvery(
      categoriesActionTypes.ADD_CATEGORY,
      categoriesSagas.onAddCategory
    ),
    takeEvery(
      categoriesActionTypes.UPDATE_CATEGORY,
      categoriesSagas.onUpdateCategory
    ),
    takeEvery(
      categoriesActionTypes.DELETE_CATEGORY,
      categoriesSagas.onDeleteCategory
    ),
    takeEvery(
      categoriesActionTypes.FETCH_CATEGORIES,
      categoriesSagas.onFetchCategories
    ),
    takeEvery(usersActionTypes.FETCH_USER, usersSagas.onFetchUser),
    takeEvery(landingActionTypes.FETCH_LANDING, landingSagas.onFetchLanding),
    takeEvery(landingActionTypes.UPDATE_LANDING, landingSagas.onUpdateLanding),
    takeEvery(landingActionTypes.ADD_LANDING, landingSagas.onAddLanding),
  ];
}

export default root;
