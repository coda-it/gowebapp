// @flow
import _ from 'lodash';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import * as postTypes from 'client/models/posts/types';
import * as userTypes from 'client/models/users/types';

type Props = {|
  loadPosts: () => void,
  posts: $ReadOnlyArray<postTypes.Post>,
  user?: userTypes.User,
|};

function Posts(props: Props) {
  const { loadPosts, posts, user } = props;

  useEffect(() => {
    loadPosts(user);
  }, [loadPosts]);

  return (
    <>
      {_.map(posts, ({ title, description }, key) => (
        <div
          key={key}
          className="gc-card gc-card--gradient gc-panel gm-spacing-bl"
        >
          <div className="gc-panel__title">{title}</div>
          <div className="gc-panel__content">{description}</div>
        </div>
      ))}
    </>
  );
}

export default withRouter(Posts);
