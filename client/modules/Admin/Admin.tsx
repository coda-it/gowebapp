import React from 'react';
import { withRouter } from 'react-router';
import { Panel, PanelTitle, PanelContent } from 'graphen';

function Admin() {
  return (
    <Panel className="gm-spacing-bl">
      <PanelTitle>Admin</PanelTitle>
      <PanelContent />
    </Panel>
  );
}

export default withRouter(Admin);
