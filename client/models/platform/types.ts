export type PlatformConfig = {
  id?: string;
  landingModule?: string;
  staticPage?: string;
  language?: string;
  loginRedirectURL?: string;
};

export type State = {
  config: PlatformConfig;
};

export type Action = {
  type: string;
  config: PlatformConfig;
};

export type ApiResponse =
  | {
      config: PlatformConfig;
    }
  | string
  | undefined;
