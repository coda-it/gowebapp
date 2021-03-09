export type FeatureFlags = {};

export type User = {
  id: string;
  username: string;
  password: string;
  featureFlags: FeatureFlags;
};

export type State = {
  isLoading?: boolean;
  user?: User;
};

export type Action = {
  type: string;
  error: string;
  user: User;
};

type ApiResponseEmbedded = {
  featureFlags: FeatureFlags;
};

export type ApiResponse =
  | (User & {
      _embedded: ApiResponseEmbedded;
    })
  | string
  | undefined;
