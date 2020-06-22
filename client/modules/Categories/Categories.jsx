// @flow
import _ from 'lodash';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import * as types from './types';

function Categories(props: types.Props) {
  const { loadCategories, categories, isAdmin } = props;

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <>
      {_.map(categories, ({ id, name }, key) => {
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
          </div>
        );
      })}
    </>
  );
}

export default withRouter(Categories);
