import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  GET_JWT_TOKEN_SUCCESS,
  SET_EDITED_PRODUCT,
  SET_EDIT_MODE,
  SET_PRODUCT_TO_DELETE,
} from './actionTypes';
import * as types from './types';

const initialState: types.State = {
  products: [],
  loading: false,
  error: null,
  editedProduct: null,
  productEditMode: null,
};

export default function eshopReducer(
  state = initialState,
  action
): types.State {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_JWT_TOKEN_SUCCESS:
      return { ...state, token: action.payload };
    case SET_EDITED_PRODUCT:
      return { ...state, editedProduct: action.payload };
    case SET_EDIT_MODE:
      return { ...state, productEditMode: action.payload };
    case SET_PRODUCT_TO_DELETE:
      return { ...state, productToDelete: action.payload };
    default:
      return state;
  }
}
