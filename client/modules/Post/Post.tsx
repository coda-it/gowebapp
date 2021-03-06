import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Image } from 'graphen';
import * as types from './types';

function Post(props: types.Props) {
  const { loadPosts, post } = props;

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <div className="gc-panel tst-post-module">
      <div className="gc-panel__title">{post?.title}</div>
      <div className="gc-panel__content">
        <Image
          className="gm-margin-center"
          src={post?.image}
          height={200}
          width={300}
        />
      </div>
      <div className="gc-panel__content">{post?.description}</div>
    </div>
  );
}

export default withRouter(Post);
