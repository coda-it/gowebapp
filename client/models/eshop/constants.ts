export const ESHOP_PRODUCTS_ENDPOINT = (shopURL: string, shopId: string) =>
  `${shopURL}/shops/${shopId}/products`;
export const ESHOP_PRODUCT_DELETE_ENDPOINT = (
  shopURL: string,
  shopId: string,
  productId: string
) => `${shopURL}/shops/${shopId}/products/${productId}`;
export const ESHOP_PRODUCT_CREATE_ENDPOINT = (
  shopURL: string,
  shopId: string
) => `${shopURL}/shops/${shopId}/products`;
export const ESHOP_AUTH_LOGIN_ENDPOINT = (shopURL: string) =>
  `${shopURL}/auth/login`;
export const ESHOP_AUTH_VALIDATE_JWT_ENDPOINT = (shopURL: string) =>
  `${shopURL}/auth/validate`;
export const ESHOP_JWT_LOCAL_STORAGE_KEY = 'eshop_jwt_token';
