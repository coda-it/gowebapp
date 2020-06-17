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
            className="gc-card gc-card--gradient gc-panel gm-spacing-bl tst-post"
          >
            <div className="gc-panel__title tst-post-title">
              {name}{' '}
              <a
                className="gc-btn gc-btn--small gc-btn--primary tst-post-edit"
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
