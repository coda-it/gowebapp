export type LandingModule = string | null;
export type Id = string | null;
/*
export type LandingModule = {
  landingModule: string | null;
};

export type Id = {
  id: string | null;
};
*/
export type AddLandingAction = {
  type: string;
  input: string;
};

export type UpdateLandingAction = {
  type: string;
  input: string;
  id: string;
};

export type State = {
  landingModule: string | null;
  id: string | null;
};

export type Action = {
  type: string;
  input: string;
  id: string;
};

type ApiResponseEmbedded = {
  id: string;
  landingModule: string;
};

export type ApiResponse =
  | {
      config: ApiResponseEmbedded;
    }
  | string
  | undefined;
