// @flow
import React from 'react';
import { withRouter } from 'react-router';

function Admin() {
  return (
    <div className="gc-panel gc-panel--separator gm-spacing-bl">
      <div className="gc-panel__content">Admin</div>
    </div>
  );
}

export default withRouter(Admin);
