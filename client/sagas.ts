import { takeEvery, all } from 'redux-saga/effects';
import * as applicationSagas from './modules/Application/sagas';
import * as applicationActionTypes from './modules/Application/actionTypes';
import * as categoriesSagas from './models/categories/sagas';
import * as categoriesActionTypes from './models/categories/actionTypes';
import * as postsSagas from './models/posts/sagas';
import * as postsActionTypes from './models/posts/actionTypes';
import * as usersSagas from './models/users/sagas';
import * as usersActionTypes from './models/users/actionTypes';
import * as platformSagas from './models/platform/sagas';
import * as platformActionTypes from './models/platform/actionTypes';
import * as helpdeskSagas from './models/helpdesk/sagas';
import * as helpdeskActionTypes from './models/helpdesk/actionTypes';

function* root() {
  yield all([
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
    takeEvery(
      platformActionTypes.FETCH_PLATFORM,
      platformSagas.onFetchPlatform
    ),
    takeEvery(
      platformActionTypes.UPDATE_PLATFORM,
      platformSagas.onUpdatePlatform
    ),
    takeEvery(platformActionTypes.ADD_PLATFORM, platformSagas.onAddPlatform),
    takeEvery(helpdeskActionTypes.CREATE_TICKET, helpdeskSagas.onCreateTicket),
    takeEvery(helpdeskActionTypes.FETCH_TICKET, helpdeskSagas.onFetchTicket),
    takeEvery(
      helpdeskActionTypes.FETCH_ALL_TICKETS,
      helpdeskSagas.onFetchAllTickets
    ),
    takeEvery(helpdeskActionTypes.DELETE_TICKET, helpdeskSagas.onDeleteTicket),
  ]);
}

export default root;
