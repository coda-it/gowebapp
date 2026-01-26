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
import * as eshopActionTypes from './models/eshop/actionTypes';
import * as eshopSagas from './models/eshop/sagas';
import * as translationsSagas from './models/translations/sagas';
import * as translationActionTypes from './models/translations/actionTypes';
import * as featureFlagsActionTypes from './models/featureFlags/actionTypes';
import * as featureFlagsSagas from './models/featureFlags/sagas';

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
    takeEvery(usersActionTypes.DELETE_USER, usersSagas.onDeleteUser),
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
    takeEvery(helpdeskActionTypes.UPDATE_TICKET, helpdeskSagas.onUpdateTicket),
    takeEvery(
      eshopActionTypes.FETCH_PRODUCTS_REQUEST,
      eshopSagas.onFetchProductsSaga
    ),
    takeEvery(
      eshopActionTypes.DELETE_PRODUCT_REQUEST,
      eshopSagas.onDeleteProductSaga
    ),
    takeEvery(
      eshopActionTypes.CREATE_PRODUCT_REQUEST,
      eshopSagas.onCreateProductSaga
    ),
    takeEvery(eshopActionTypes.GET_JWT_TOKEN_REQUEST, eshopSagas.onGetJWTToken),
    takeEvery(
      eshopActionTypes.VALIDATE_JWT_TOKEN_REQUEST,
      eshopSagas.onValidateJWTToken
    ),
    takeEvery(
      translationActionTypes.ADD_TRANSLATION,
      translationsSagas.onAddTranslation
    ),
    takeEvery(
      translationActionTypes.FETCH_TRANSLATIONS,
      translationsSagas.onFetchTranslations
    ),
    takeEvery(
      translationActionTypes.UPDATE_TRANSLATION,
      translationsSagas.onUpdateTranslation
    ),
    takeEvery(
      translationActionTypes.DELETE_TRANSLATION,
      translationsSagas.onDeleteTranslation
    ),
    takeEvery(
      featureFlagsActionTypes.ADD_FEATURE_FLAG,
      featureFlagsSagas.onAddFeatureFlag
    ),
    takeEvery(
      featureFlagsActionTypes.FETCH_FEATURE_FLAGS,
      featureFlagsSagas.onFetchFeatureFlags
    ),
    takeEvery(
      featureFlagsActionTypes.UPDATE_FEATURE_FLAG,
      featureFlagsSagas.onUpdateFeatureFlag
    ),
    takeEvery(
      featureFlagsActionTypes.DELETE_FATURE_FLAG,
      featureFlagsSagas.onDeleteFeatureFlag
    ),
  ]);
}

export default root;
