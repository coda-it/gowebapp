import _ from 'lodash';
import * as actionTypes from './actionTypes';
import type * as types from './types';

const defaultState: types.State = {
  alerts: [],
};

export default function reducers(
  state: types.State = defaultState,
  action: types.Action
) {
  const { alerts } = state;
  const alert: types.Alert = {
    message: action.message,
    type: action.alertType,
    timestamp: new Date(),
    isOld: false,
  };

  switch (action.type) {
    case actionTypes.ADD:
      return {
        alerts: _.concat(alerts, [alert]),
      };
    default:
      return state;
  }
}
