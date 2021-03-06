import _ from 'lodash';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { constants, Link, Image } from 'graphen';
import * as types from './types';

function Posts(props: types.Props) {
  const { isAdmin, loadPosts, posts, user, category, loadCategories } = props;

  useEffect(() => {
    loadPosts(user);
    loadCategories();
  }, [loadPosts]);

  return (
    <div className="gc-panel">
      <div className="gc-panel__title">
        {`Category: ${category ? category.name : 'All'}`}
      </div>
      <div className="gc-panel__content gc-flex gc-flex--wrap tst-posts">
        {/* @ts-ignore */}
        {_.map(posts, ({ id, title, image }, key) => {
          const link = `/admin/posts/edit/${id}`;
          const editButton = isAdmin ? (
            <a
              className={`gc-btn gc-btn--small gc-btn--primary tst-post-edit-${key}`}
              href={link}
            >
              Edit
            </a>
          ) : null;

          return (
            <div
              key={key}
              className={`gc-flex__item gc-card gc-card--gradient gc-panel gm-spacing-l tst-post-${key}`}
            >
              <div className={`gc-panel__title tst-post-title-${key}`}>
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <Link
                  className={`tst-post-link-${key}`}
                  skin={constants.SKINS.default}
                  link={`/post/${id}`}
                >
                  {title}
                </Link>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                {editButton}
              </div>
              <Image
                className="gm-margin-center"
                src={image}
                height={200}
                width={300}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default withRouter(Posts);
