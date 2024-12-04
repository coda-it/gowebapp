export type FeatureFlag = {
  id?: string;
  key: string;
  value: boolean;
};

export type State = {
  featureFlags: ReadonlyArray<FeatureFlag>;
};

export type AddFeatureFlagAction = {
  type: string;
  key: string;
  value: boolean;
};

export type UpdateFeatureFlagAction = {
  id: string;
  type: string;
  key: string;
  value: boolean;
};

export type DeleteFeatureFlagAction = {
  id: string;
  type: string;
};

export type GetFeatureFlagsAction = {
  type: string;
};

export type GetFeatureFlagsSuccessAction = {
  type: string;
  featureFlags: ReadonlyArray<FeatureFlag>;
};

export type Action =
  | GetFeatureFlagsSuccessAction
  | GetFeatureFlagsAction
  | AddFeatureFlagAction
  | UpdateFeatureFlagAction;

type ApiResponseEmbedded = {
  featureFlags: ReadonlyArray<FeatureFlag>;
};

export type ApiResponse =
  | {
      _embedded: ApiResponseEmbedded;
    }
  | string
  | undefined;
