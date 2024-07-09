export type Translation = {
  key: string;
  value: string;
  language: string;
};

export type AddTranslationAction = {
  type: string;
  key: string;
  value: string;
  language: string;
};
