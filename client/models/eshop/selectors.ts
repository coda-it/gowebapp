import * as globalTypes from 'client/types';

export const getProducts = (state: globalTypes.State) =>
  state.eshop.products ?? [];
export const getJWTToken = (state: globalTypes.State) => state.eshop.token;
