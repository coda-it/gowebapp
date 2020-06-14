// @flow
import _ from 'lodash';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import * as types from './types';

function Posts(props: types.Props) {
  const { isAdmin, loadPosts, posts, user } = props;

  useEffect(() => {
    loadPosts(user);
  }, [loadPosts]);

  return (
    <>
      {_.map(posts, ({ id, title, description }, key) => {
        const link = `/admin/posts/edit/${id}`;
        const editButton = isAdmin ? (
          <a
            className="gc-btn gc-btn--small gc-btn--primary tst-post-edit"
            href={link}
          >
            Edit
          </a>
        ) : null;

        return (
          <div
            key={key}
            className="gc-card gc-card--gradient gc-panel gm-spacing-bl tst-post"
          >
            <div className="gc-panel__title tst-post-title">
              {title} {editButton}
            </div>
            <div className="gc-panel__content tst-post-description">
              {description}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default withRouter(Posts);
