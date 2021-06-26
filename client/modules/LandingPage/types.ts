import * as landingTypes from 'client/models/landing/types';

export type Props = {
  landingModule?: landingTypes.LandingModule;
  id?: landingTypes.Id;
  onAdd: (arg0: string) => void;
  onUpdate: (arg0: string, arg1: string) => void;
  loadLanding: () => void;
};
