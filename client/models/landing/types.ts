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
  landingModule: string || null;
  id: string || null;
};

export type Action = {
  type: string;
  input: string;
  id: string;
};

