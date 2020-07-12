// @flow
import _ from 'lodash';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Image } from 'graphen';
import * as types from './types';

function Posts(props: types.Props) {
  const { isAdmin, loadPosts, posts, user } = props;

  useEffect(() => {
    loadPosts(user);
  }, [loadPosts]);

  return (
    <div className="gc-flex gc-flex--wrap">
      {_.map(posts, ({ id, title, image }, key) => {
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
            className="gc-flex__item gc-card gc-card--gradient gc-panel gm-spacing-l tst-post"
          >
            <div className="gc-panel__title tst-post-title">
              {title} {editButton}
            </div>
            <div className="gc-panel__content tst-post-description">
              <Image src={image} height={200} width={300} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default withRouter(Posts);
