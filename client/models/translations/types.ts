export type Translation = {
  id?: string;
  key: string;
  value: string;
  language: string;
};

export type State = {
  translations: ReadonlyArray<Translation>;
};

export type AddTranslationAction = {
  type: string;
  key: string;
  value: string;
  language: string;
};

export type UpdateTranslationAction = {
  id: string;
  type: string;
  key: string;
  value: string;
  language: string;
};

export type DeleteTranslationAction = {
  id: string;
  type: string;
};

export type GetTranslationsAction = {
  type: string;
};

export type GetTranslationsSuccessAction = {
  type: string;
  translations: ReadonlyArray<Translation>;
};

export type Action =
  | GetTranslationsSuccessAction
  | GetTranslationsAction
  | AddTranslationAction
  | UpdateTranslationAction;

type ApiResponseEmbedded = {
  translations: ReadonlyArray<Translation>;
};

export type ApiResponse =
  | {
      _embedded: ApiResponseEmbedded;
    }
  | string
  | undefined;
