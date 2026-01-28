import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  GET_JWT_TOKEN_SUCCESS,
} from './actionTypes';
import { State } from './types';

const initialState: State = {
  products: [],
  loading: false,
  error: null,
};

export default function eshopReducer(state = initialState, action): State {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_JWT_TOKEN_SUCCESS:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}
