import * as alertTypes from './models/alerts/types';
import * as postTypes from './models/posts/types';
import * as categoryTypes from './models/categories/types';
import * as userTypes from './models/users/types';
import * as helpdeskTypes from './models/helpdesk/types';
import * as platformTypes from './models/platform/types';
import * as translationTypes from './models/translations/types';
import * as featureFlagsTypes from './models/featureFlags/types';
import * as eshopTypes from './models/eshop/types';

export type State = Partial<{
  posts: postTypes.State;
  alerts: alertTypes.State;
  categories: categoryTypes.State;
  users: userTypes.State;
  application: {
    isLoaded?: boolean;
  };
  platform: platformTypes.State;
  helpdesk: helpdeskTypes.State;
  translations: translationTypes.State;
  featureFlags: featureFlagsTypes.State;
  eshop: eshopTypes.State;
}>;

export interface Module {
  id: string;
  properties: Record<string, any>;
}
