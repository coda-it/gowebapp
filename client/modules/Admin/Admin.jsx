// @flow
import React from 'react';
import { withRouter } from 'react-router';
import Posts from 'client/modules/Posts';
import * as userTypes from 'client/models/users/types';

type Props = {|
  user: userTypes.User,
|};

function Admin(props: Props) {
  const { user } = props;

  return (
    <div className="gc-panel gc-panel--separator gm-spacing-bl">
      <div className="gc-panel__content">
        <Posts user={user} />
      </div>
    </div>
  );
}

export default withRouter(Admin);
