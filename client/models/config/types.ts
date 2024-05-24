export type Config = {
  landingModule: string;
  translation: Map<string, string>;
  languages: ReadonlyArray<string>;
  defaultLanguage: string;
};
