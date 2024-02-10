import React from 'react';
import { useSelector } from 'react-redux';
import * as selectors from 'client/models/alerts/selectors';
import Alert from './Alert';

const AlertPanel = () => {
  const alerts = useSelector(selectors.getLimitedAlerts);

  return (
    <div className="alert-panel">
      {alerts.map((alert, index) => {
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
