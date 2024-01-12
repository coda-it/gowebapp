export type HALResponse<T, U, W> = T & {
  _embedded: U;
  _links: W;
  _self: {
    href: string;
  };
};
