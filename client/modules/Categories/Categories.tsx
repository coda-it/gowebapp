import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import {
  Image,
  Link,
  constants,
  Panel,
  PanelContent,
  PanelTitle,
  Flex,
  FlexItem,
  Card,
} from 'graphen';
import * as utils from 'client/utils/translations';
import * as types from './types';

function Categories(
  props: types.Props = { categories: [], loadCategories: () => {} }
) {
  const { loadCategories, categories, isAdmin } = props;

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <Panel>
      <PanelTitle>
        {utils.getLocalization('Categories_Header') ?? 'Categories'}
      </PanelTitle>
      <PanelContent>
        <Panel>
          <Flex wrap="wrap">
            {categories.map(({ id, name, image }) => {
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
                <FlexItem
                  key={`category-${id}`}
                  className="gm-spacing-l tst-category"
                >
                  <Card isGradient>
                    <Panel>
                      <PanelTitle className="tst-category-name">
                        <Flex>
                          <FlexItem isGrow>
                            {/* eslint-disable jsx-a11y/anchor-is-valid */}
                            <Link
                              skin={constants.SKIN_DEFAULT}
                              link={`/category/${id}`}
                            >
                              {name}
                            </Link>
                            {/* eslint-enable jsx-a11y/anchor-is-valid */}
                          </FlexItem>
                          <FlexItem isShrink>{editButton}</FlexItem>
                        </Flex>
                      </PanelTitle>
                      <PanelContent>
                        <Image
                          className="gm-margin-center"
                          src={image}
                          height={200}
                          width={300}
                        />
                      </PanelContent>
                    </Panel>
                  </Card>
                </FlexItem>
              );
            })}
          </Flex>
        </Panel>
      </PanelContent>
    </Panel>
  );
}

export default withRouter(Categories);
