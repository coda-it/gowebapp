import { call, put, select } from 'redux-saga/effects';
import globalConfig from 'client/config';
import * as alertActions from 'client/models/alerts/actions';
import * as alertConstants from 'client/models/alerts/constants';
import * as translations from 'client/utils/translations';
import * as actions from './actions';
import * as selectors from './selectors';
import * as constants from './constants';
import * as utils from './utils';
import * as types from './types';

function fetchProductsApi() {
  const eshopModule = utils.getEShopModule(globalConfig);
  const {
    properties: { shopDomain, shopId },
  } = eshopModule;
  const ENDPOINT_URL = constants.ESHOP_PRODUCTS_ENDPOINT(shopDomain, shopId);

  const request = new Request(ENDPOINT_URL, {
    method: 'GET',
  });
  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Fetching e-shop products failed');
}

export function* onFetchProductsSaga() {
  try {
    const products = yield call(fetchProductsApi);
    yield put(actions.fetchProductsSuccess(products));
  } catch (error: any) {
    yield put(
      alertActions.addAlert(
        translations.getLocalization('eShop_Admin_Product_Fetch_Error') ??
          'Error while fetching products',
        alertConstants.ALERT_TYPE_ERROR
      )
    );
  }
}

function deleteProductApi(productId: string, token: string) {
  const eshopModule = utils.getEShopModule(globalConfig);
  const {
    properties: { shopDomain, shopId },
  } = eshopModule;
  const ENDPOINT_URL = constants.ESHOP_PRODUCT_DELETE_ENDPOINT(
    shopDomain,
    shopId,
    productId
  );

  const request = new Request(ENDPOINT_URL, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Deleting e-shop product failed');
}

export function* onDeleteProductSaga({
  payload,
}: types.DeleteEShopProductAction) {
  try {
    const jwtToken = yield select(selectors.getJWTToken);

    yield call(deleteProductApi, payload, jwtToken);
    yield put(actions.fetchProductsRequest());
  } catch (error: any) {
    yield put(
      alertActions.addAlert(
        translations.getLocalization('eShop_Admin_Product_Delete_Error') ??
          'Error while deleting a product',
        alertConstants.ALERT_TYPE_ERROR
      )
    );
  }
}

function createProductApi(product: types.NewProduct, token: string) {
  const eshopModule = utils.getEShopModule(globalConfig);
  const {
    properties: { shopDomain, shopId },
  } = eshopModule;
  const ENDPOINT_URL = constants.ESHOP_PRODUCT_CREATE_ENDPOINT(
    shopDomain,
    shopId
  );

  const { name, description, image, price } = product;

  const request = new Request(ENDPOINT_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      image,
      price,
    }),
  });
  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Creating e-shop product failed');
}

export function* onCreateProductSaga({
  payload,
}: types.CreateEShopProductAction) {
  try {
    const jwtToken = yield select(selectors.getJWTToken);

    yield call(createProductApi, payload, jwtToken);
    yield put(actions.fetchProductsRequest());
  } catch (error: any) {
    yield put(
      alertActions.addAlert(
        translations.getLocalization('eShop_Admin_ProductCreateError') ??
          'Error while creating a product',
        alertConstants.ALERT_TYPE_ERROR
      )
    );
  }
}

function getJWTTokenRequestApi(username: string, password: string) {
  const eshopModule = utils.getEShopModule(globalConfig);
  const {
    properties: { shopDomain },
  } = eshopModule;
  const ENDPOINT_URL = constants.ESHOP_AUTH_LOGIN_ENDPOINT(shopDomain);

  const request = new Request(ENDPOINT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: username, password }),
  });
  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Getting e-shop JWT failed');
}

export function* onGetJWTToken({ payload }: types.GetJWTTokenRequestAction) {
  const { username, password } = payload;

  try {
    const response = yield call(getJWTTokenRequestApi, username, password);
    const { token } = response;

    localStorage.setItem(constants.ESHOP_JWT_LOCAL_STORAGE_KEY, token);

    yield put(actions.setJwtToken(token));
  } catch (error: any) {
    yield put(
      alertActions.addAlert(
        translations.getLocalization(
          'eShop_Admin_ProductAuthenticateGetJWTError'
        ) ?? 'Getting JWT failed',
        alertConstants.ALERT_TYPE_ERROR
      )
    );
  }
}

function validateJWTTokenRequestApi(token: string) {
  const eshopModule = utils.getEShopModule(globalConfig);
  const {
    properties: { shopDomain },
  } = eshopModule;
  const ENDPOINT_URL = constants.ESHOP_AUTH_VALIDATE_JWT_ENDPOINT(shopDomain);

  const request = new Request(ENDPOINT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Validating e-shop JWT failed');
}

export function* onValidateJWTToken({
  payload,
}: types.ValidateJWTTokenRequestAction) {
  const { token } = payload;

  try {
    const response = yield call(validateJWTTokenRequestApi, token);
    const { valid } = response;

    if (valid) {
      yield put(actions.setJwtToken(token));
    }
  } catch (error: any) {
    yield put(
      alertActions.addAlert(
        translations.getLocalization(
          'eShop_Admin_ProductAuthenticateValidateJWTError'
        ) ?? 'JWT validation failed',
        alertConstants.ALERT_TYPE_ERROR
      )
    );
  }
}
