import config from 'client/config';

/* eslint-disable import/prefer-default-export */
export const getLocalization = (key: string): string =>
  config?.translation?.[key];
/* eslint-enable import/prefer-default-export */
