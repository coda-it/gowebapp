import _ from 'lodash';
import React from 'react';
import type * as types from 'client/models/alerts/types';
import Alert from './Alert';

type Props = {
  alerts: ReadonlyArray<types.Alert>;
};

const AlertPanel = (props: Props) => {
  const { alerts } = props;

  return (
    <div className="alert-panel">
      {_.map(alerts, (alert, index) => {
        const { type, message } = alert;
        const key = `alert-${index}`;

        return (
          <Alert key={key} type={type}>
            {message}
          </Alert>
        );
      })}
    </div>
  );
};

export default AlertPanel;
