// eslint-disable-next-line import/no-cycle
import * as globalTypes from 'client/types';

export type Product = {
  image: string;
  price: number;
  description: string;
  name: string;
  id: number;
};

export type NewProduct = Omit<Product, 'id'>;

export type State = {
  error: string | null;
  loading: boolean;
  products: Product[];
  token?: string;
};

export type ModuleProperties = {
  shopId: string;
  shopDomain: string;
};

export interface EShopModule extends globalTypes.Module {
  properties: ModuleProperties;
}

export type DeleteEShopProductAction = {
  type: string;
  payload: string;
};

export type CreateEShopProductAction = {
  type: string;
  payload: NewProduct;
};

export type GetJWTTokenRequestAction = {
  type: string;
  payload: {
    username: string;
    password: string;
  };
};

export type ValidateJWTTokenRequestAction = {
  type: string;
  payload: {
    token: string;
  };
};
