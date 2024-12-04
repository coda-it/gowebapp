export type Config = {
  landingModule: string;
  translation: Map<string, string>;
  featureFlags: Map<string, string>;
  languages: ReadonlyArray<string>;
  defaultLanguage: string;
};
