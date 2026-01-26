import * as types from './types';

// eslint-disable-next-line import/prefer-default-export
export const getEShopModule = (config): types.EShopModule => {
  const { appId, apps } = config;
  const currentApp = apps.find((app) => app.id === appId);

  return currentApp?.modules?.find((module) => module.id === 'eshop');
};
