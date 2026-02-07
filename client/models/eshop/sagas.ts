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
    .catch(() => {
      throw new Error('Fetching e-shop products failed');
    });
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

function deleteProductApi(productId: number, token: string) {
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

function deleteProductBlobStorageApi(imageUrl: string, token: string) {
  const eshopModule = utils.getEShopModule(globalConfig);
  const {
    properties: { shopDomain },
  } = eshopModule;
  const ENDPOINT_URL = constants.ESHOP_AZURE_DELETE_BLOB_ENDPOINT(shopDomain);

  const request = new Request(ENDPOINT_URL, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      blobUrl: imageUrl,
    }),
  });
  return fetch(request).catch(() => {
    throw new Error('Deleting blob storage image failed');
  });
}

export function* onDeleteProductSaga({
  payload,
}: types.DeleteEShopProductAction) {
  try {
    const jwtToken = yield select(selectors.getJWTToken);
    const product = yield select(selectors.getProductById, payload);
    yield call(deleteProductBlobStorageApi, product.image, jwtToken);

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

function createProductBlobStorageApi(image: File, token: string) {
  const eshopModule = utils.getEShopModule(globalConfig);
  const {
    properties: { shopDomain },
  } = eshopModule;
  const ENDPOINT_URL = constants.ESHOP_AZURE_BLOB_SAS_ENDPOINT(shopDomain);

  const request = new Request(ENDPOINT_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fileName: image.name,
      fileType: image.type,
    }),
  });
  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Creating blob storage SAS failed');
}

function createProductImageUploadApi(
  blobSAS: types.BlobSASResponse,
  image: File
) {
  const request = new Request(blobSAS.uploadUrl, {
    method: 'PUT',
    headers: {
      'x-ms-blob-type': 'BlockBlob',
      'Content-Type': image.type,
    },
    body: image,
  });
  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Uploading product image failed');
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

    let product = { ...payload };

    if (payload.imageFile) {
      const blobStorageSAS = yield call(
        createProductBlobStorageApi,
        payload.imageFile,
        jwtToken
      );
      yield call(
        createProductImageUploadApi,
        blobStorageSAS,
        payload.imageFile
      );

      product = { ...payload, image: blobStorageSAS.blobUrl };
    }

    yield call(createProductApi, product, jwtToken);
    yield put(actions.setEditedProduct(null));
    yield put(actions.setEditMode(null));
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

function patchProductApi(product: types.Product, token: string) {
  const eshopModule = utils.getEShopModule(globalConfig);
  const {
    properties: { shopDomain, shopId },
  } = eshopModule;

  const ENDPOINT_URL = constants.ESHOP_PRODUCT_UPDATE_ENDPOINT(
    shopDomain,
    shopId,
    product.id
  );

  const { name, description, image, price } = product;

  const request = new Request(ENDPOINT_URL, {
    method: 'PATCH',
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
    .catch(() => 'Updating e-shop product failed');
}

export function* onUpdateProductSaga({
  payload,
}: types.UpdateEShopProductAction) {
  try {
    const jwtToken = yield select(selectors.getJWTToken);

    let product = { ...payload };

    if (payload.imageFile) {
      const blobStorageSAS = yield call(
        createProductBlobStorageApi,
        payload.imageFile,
        jwtToken
      );
      yield call(
        createProductImageUploadApi,
        blobStorageSAS,
        payload.imageFile
      );

      product = { ...payload, image: blobStorageSAS.blobUrl };
    }

    yield call(patchProductApi, product, jwtToken);
    yield put(actions.setEditedProduct(null));
    yield put(actions.setEditMode(null));
    yield put(actions.fetchProductsRequest());
  } catch (error: any) {
    yield put(
      alertActions.addAlert(
        translations.getLocalization('eShop_Admin_ProductUpdateError') ??
          'Error while updating a product',
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
