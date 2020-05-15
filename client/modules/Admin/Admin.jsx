// @flow
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'graphen';

function Posts() {
  return (
    <div className="gc-panel gc-panel--separator gm-spacing-bl">
      <div className="gc-panel__content">
        <Link link="/admin/new-post">Add post</Link>
      </div>
    </div>
  );
}

export default withRouter(Posts);
