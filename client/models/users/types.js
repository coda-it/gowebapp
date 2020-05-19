// @flow
export type FeatureFlags = {};

export type User = {
  id: string,
  username: string,
  password: string,
  featureFlags: FeatureFlags,
};
