import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import {
  constants,
  Link,
  Image,
  Panel,
  PanelContent,
  PanelTitle,
  Flex,
  FlexItem,
  Card,
} from 'graphen';
import * as utils from 'client/utils/translations';
import * as types from './types';

function Posts(
  props: types.Props = {
    posts: [],
    loadPosts: () => {},
    loadCategories: () => {},
  }
) {
  const { isAdmin, loadPosts, posts, user, category, loadCategories } = props;

  useEffect(() => {
    loadPosts(user);
    loadCategories();
  }, [loadPosts, loadCategories]);

  const sectionTitle = utils.getLocalization('Posts_Header') ?? 'Category: ';

  return (
    <Panel>
      <PanelTitle>{`${sectionTitle} ${
        category ? category.name : 'All'
      }`}</PanelTitle>
      <PanelContent className="gc-flex gc-flex--wrap tst-posts">
        <Flex wrap="wrap">
          {posts.map(({ id, title, image }, key) => {
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
              <FlexItem
                key={`post-${id}`}
                className={`gm-spacing-l tst-post-${key}`}
              >
                <Card isGradient>
                  <Panel>
                    <PanelTitle className={`tst-post-title-${key}`}>
                      <Flex>
                        <FlexItem isGrow>
                          {/* eslint-disable jsx-a11y/anchor-is-valid */}
                          <Link
                            className={`tst-post-link-${key}`}
                            skin={constants.SKIN_DEFAULT}
                            link={`/post/${id}`}
                          >
                            {title}
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
      </PanelContent>
    </Panel>
  );
}

export default withRouter(Posts);
