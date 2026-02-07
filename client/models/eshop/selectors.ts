import * as globalTypes from 'client/types';

export const getProducts = (state: globalTypes.State) =>
  state.eshop.products ?? [];
export const getProductById = (state: globalTypes.State, id: number) =>
  state.eshop.products?.find((product) => product.id === id);
export const getJWTToken = (state: globalTypes.State) => state.eshop.token;
export const getEditedProduct = (state: globalTypes.State) =>
  state.eshop.editedProduct;
export const getProductEditMode = (state: globalTypes.State) =>
  state.eshop.productEditMode;
