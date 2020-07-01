// @flow
import _ from 'lodash';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Image } from 'graphen';
import * as types from './types';

function Categories(props: types.Props) {
  const { loadCategories, categories, isAdmin } = props;

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <>
      {_.map(categories, ({ id, name, image }, key) => {
        const link = `/admin/categories/edit/${id}`;
        const editButton = isAdmin ? (
          <a
            className="gc-btn gc-btn--small gc-btn--primary tst-category-edit"
            href={link}
          >
            Edit
          </a>
        ) : null;

        return (
          <div
            key={key}
            className="gc-card gc-card--gradient gc-panel gm-spacing-bl tst-category"
          >
            <div className="gc-panel__title tst-category-name">
              {name} {editButton}
            </div>
            <div className="gc-panel__content">
              <Image src={image} height={200} width={400} />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default withRouter(Categories);
