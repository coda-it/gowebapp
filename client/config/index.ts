import type * as config from 'client/models/config/types';

const platformConfig: config.Config = {
  // @ts-ignore - its a hack to load platform config from the application template
  ...window.config,
  // @ts-ignore - its a hack to load platform translations from the application template
  translation: window.translation,
  // @ts-ignore - its a hack to load platform feature flags from the application template
  featureFlags: window.featureFlags,
};

// @ts-ignore - its a hack to load platform config from the application template
delete window.config;
// @ts-ignore - its a hack to load translations from the application template
delete window.translation;

export default platformConfig;
