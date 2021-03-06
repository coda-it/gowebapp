import _ from 'lodash';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Image, Link, constants } from 'graphen';
import * as categoryModelTypes from 'client/models/categories/types';
import * as types from './types';

function Categories(props: types.Props) {
  const { loadCategories, categories, isAdmin } = props;

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <div className="gc-panel">
      <div className="gc-panel__title">Categories</div>
      <div className="gc-panel__content gc-flex gc-flex--wrap">
        {_.map(
          categories,
          ({ id, name, image }: categoryModelTypes.Category, key: string) => {
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
                <div className="gc-panel__title tst-category-name">
                  {/* eslint-disable jsx-a11y/anchor-is-valid */}
                  <Link skin={constants.SKINS.default} link={`/category/${id}`}>
                    {name}
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
          }
        )}
      </div>
    </div>
  );
}

export default withRouter(Categories);
