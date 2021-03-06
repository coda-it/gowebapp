import * as constants from './constants';

export type AlertType = string;

export type Alert = {
  message: string;
  type: AlertType;
  timestamp: Date;
  isOld: boolean;
};

export type State = {
  alerts: ReadonlyArray<AlertType>;
};

export type Action = {
  type: string;
  message: string;
  alertType: AlertType;
};
