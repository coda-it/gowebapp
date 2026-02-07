// eslint-disable-next-line import/no-cycle
import * as globalTypes from 'client/types';

export type Product = {
  image?: string;
  imageFile?: File | null;
  price: number;
  description: string;
  name: string;
  id: number;
};

export type NewProduct = Omit<Product, 'id'>;

export enum ProductEditMode {
  CREATE = 'create',
  EDIT = 'edit',
}

export type State = {
  error: string | null;
  loading: boolean;
  products: Product[];
  token?: string;
  editedProduct: NewProduct | Product | null;
  productEditMode: ProductEditMode | null;
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
  payload: number;
};

export type CreateEShopProductAction = {
  type: string;
  payload: NewProduct;
};

export type UpdateEShopProductAction = {
  type: string;
  payload: Product;
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

export type BlobSASResponse = {
  blobName: string;
  blobUrl: string;
  expiresAt: string;
  uploadUrl: string;
};
