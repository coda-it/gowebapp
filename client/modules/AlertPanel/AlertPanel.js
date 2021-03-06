import _ from 'lodash';
import React from 'react';
import Alert from './Alert';
const AlertPanel = (props) => {
    const { alerts } = props;
    return (React.createElement("div", { className: "alert-panel" }, _.map(alerts, (alert, index) => {
        const { type, message } = alert;
        const key = `alert-${index}`;
        return (React.createElement(Alert, { key: key, type: type }, message));
    })));
};
export default AlertPanel;
//# sourceMappingURL=AlertPanel.js.map