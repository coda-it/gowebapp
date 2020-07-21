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
    <div className="gc-flex gc-flex--wrap">
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
            className="gc-flex__item gc-card gc-card--gradient gc-panel gm-spacing-l tst-category"
          >
            <Image src={image} height={200} width={300} />
            <div className="gc-panel__title tst-category-name">
              <a href={`/category/${id}`}>{name}</a> {editButton}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default withRouter(Categories);
