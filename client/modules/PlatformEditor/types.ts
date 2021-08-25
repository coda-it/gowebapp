import * as platformTypes from 'client/models/platform/types';

export type Props = {
  config?: platformTypes.PlatformConfig;
  onAdd: (config: platformTypes.PlatformConfig) => void;
  onUpdate: (config: platformTypes.PlatformConfig) => void;
  load: () => void;
};
