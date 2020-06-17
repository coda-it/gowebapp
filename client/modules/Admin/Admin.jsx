// @flow
import React from 'react';
import { withRouter } from 'react-router';

function Admin() {
  return (
    <div className="gc-panel gc-panel--separator gm-spacing-bl">
      <header className="gc-panel__title">Admin</header>
      <div className="gc-panel__content"></div>
    </div>
  );
}

export default withRouter(Admin);
