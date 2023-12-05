import React from 'react';
import { withRouter } from 'react-router';

function Helpdesk() {
  return (
    <div className="gc-panel">
      <div className="gc-panel__title">Helpdesk</div>
      <div className="gc-panel__content gc-flex gc-flex--wrap" />
    </div>
  );
}

export default withRouter(Helpdesk);
