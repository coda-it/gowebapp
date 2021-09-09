import type * as config from 'client/models/config/types';

// @ts-ignore - its a hack to load platform config from the application template
const platformConfig: config.Config = {
  ...window.config,
  translation: window.translation,
};

// @ts-ignore - its a hack to load platform config from the application template
delete window.config;
// @ts-ignore - its a hack to load translations from the application template
delete window.translation;

export default platformConfig;
