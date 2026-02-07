import * as actionTypes from './actionTypes';
import * as types from './types';

export const fetchProductsRequest = () => ({
  type: actionTypes.FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products: types.Product[]) => ({
  type: actionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const deleteProductRequest = (productId: number) => ({
  type: actionTypes.DELETE_PRODUCT_REQUEST,
  payload: productId,
});

export const deleteProductFailure = (
  error: string
): types.DeleteEShopProductAction => ({
  type: actionTypes.DELETE_PRODUCT_FAILURE,
  payload: error,
});

export const createProductRequest = (product: types.NewProduct) => ({
  type: actionTypes.CREATE_PRODUCT_REQUEST,
  payload: product,
});

export const createProductSuccess = () => ({
  type: actionTypes.CREATE_PRODUCT_SUCCESS,
});

export const updateProductRequest = (product: types.Product) => ({
  type: actionTypes.UPDATE_PRODUCT_REQUEST,
  payload: product,
});

export const updateProductSuccess = () => ({
  type: actionTypes.UPDATE_PRODUCT_SUCCESS,
});

export const getJwtTokenRequest = (username: string, password: string) => ({
  type: actionTypes.GET_JWT_TOKEN_REQUEST,
  payload: {
    username,
    password,
  },
});

export const setJwtToken = (token: string) => ({
  type: actionTypes.GET_JWT_TOKEN_SUCCESS,
  payload: token,
});

export const validateJwtTokenRequest = (token: string) => ({
  type: actionTypes.VALIDATE_JWT_TOKEN_REQUEST,
  payload: {
    token,
  },
});

export const setEditedProduct = (product: types.NewProduct | null) => ({
  type: actionTypes.SET_EDITED_PRODUCT,
  payload: product,
});

export const setEditMode = (mode: types.ProductEditMode | null) => ({
  type: actionTypes.SET_EDIT_MODE,
  payload: mode,
});
