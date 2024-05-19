import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Image, Panel, PanelTitle, PanelContent } from 'graphen';
import * as types from './types';

function Post(props: types.Props) {
  const { loadPosts, post } = props;

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <Panel className="tst-post-module">
      <PanelTitle>{post?.title}</PanelTitle>
      <PanelContent>
        <Image
          className="gm-margin-center"
          src={post?.image}
          height={200}
          width={300}
        />
      </PanelContent>
      <div className="gc-panel__content">{post?.description}</div>
    </Panel>
  );
}

export default withRouter(Post);
