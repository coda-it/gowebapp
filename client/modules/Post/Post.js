import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Image } from 'graphen';
function Post(props) {
    const { loadPosts, post } = props;
    useEffect(() => {
        loadPosts();
    }, [loadPosts]);
    return (React.createElement("div", { className: "gc-panel tst-post-module" },
        React.createElement("div", { className: "gc-panel__title" }, post?.title),
        React.createElement("div", { className: "gc-panel__content" },
            React.createElement(Image, { className: "gm-margin-center", src: post?.image, height: 200, width: 300 })),
        React.createElement("div", { className: "gc-panel__content" }, post?.description)));
}
export default withRouter(Post);
//# sourceMappingURL=Post.js.map