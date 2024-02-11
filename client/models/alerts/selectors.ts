import { createSelector } from 'reselect';
import * as constants from './constants';

export const getAlerts = (state) => state.alerts.alerts ?? [];

export const getLimitedAlerts = createSelector(getAlerts, (alerts) =>
  alerts.slice(alerts.length - constants.ALERT_LIMIT, alerts.length)
);
