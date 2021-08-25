export type PlatformConfig = {
  id?: string;
  landingModule: string;
  staticPage: string;
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
