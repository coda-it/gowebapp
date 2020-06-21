// @flow
import _ from 'lodash';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import * as types from './types';

function Categories(props: types.Props) {
  const { loadCategories, categories } = props;

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <>
      {_.map(categories, ({ id, name }, key) => {
        const link = `/admin/categories/edit/${id}`;

        return (
          <div
            key={key}
            className="gc-card gc-card--gradient gc-panel gm-spacing-bl tst-category"
          >
            <div className="gc-panel__title tst-category-name">
              {name}{' '}
              <a
                className="gc-btn gc-btn--small gc-btn--primary tst-category-edit"
                href={link}
              >
                Edit
              </a>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default withRouter(Categories);
