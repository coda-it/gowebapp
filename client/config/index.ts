import type * as config from 'client/models/config/types';

// @ts-ignore - its a hack to load platform config from the application template
const platformConfig: config.Config = { ...window.config };
// @ts-ignore - its a hack to load platform config from the application template
delete window.config;

export default platformConfig;
