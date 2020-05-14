// @flow
import _ from 'lodash';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'graphen';
import * as postTypes from 'client/models/posts/types';

type Props = {|
  loadPosts: () => void,
  posts: $ReadOnlyArray<postTypes.Post>,
|};

function Posts(props: Props) {
  const { loadPosts, posts } = props;

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <>
      <div className="gc-panel gc-panel--separator gm-spacing-bl">
        <div className="gc-panel__content">
          <Link link="/posts/new">Add post</Link>
        </div>
      </div>
      {_.map(posts, ({ title, description }, key) => (
        <div
          key={key}
          className="gc-card gc-card--gradient gc-panel gm-spacing-bl"
        >
          <div className="gc-panel__title">{title}</div>
          <div className="gc-p  anel__content">{description}</div>
        </div>
      ))}
    </>
  );
}

export default withRouter(Posts);
