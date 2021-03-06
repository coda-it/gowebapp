import _ from 'lodash';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { constants, Link, Image } from 'graphen';
function Posts(props) {
    const { isAdmin, loadPosts, posts, user, category, loadCategories } = props;
    useEffect(() => {
        loadPosts(user);
        loadCategories();
    }, [loadPosts]);
    return (React.createElement("div", { className: "gc-panel" },
        React.createElement("div", { className: "gc-panel__title" }, `Category: ${category ? category.name : 'All'}`),
        React.createElement("div", { className: "gc-panel__content gc-flex gc-flex--wrap tst-posts" }, _.map(posts, ({ id, title, image }, key) => {
            const link = `/admin/posts/edit/${id}`;
            const editButton = isAdmin ? (React.createElement("a", { className: `gc-btn gc-btn--small gc-btn--primary tst-post-edit-${key}`, href: link }, "Edit")) : null;
            return (React.createElement("div", { key: key, className: `gc-flex__item gc-card gc-card--gradient gc-panel gm-spacing-l tst-post-${key}` },
                React.createElement("div", { className: `gc-panel__title tst-post-title-${key}` },
                    React.createElement(Link, { className: `tst-post-link-${key}`, skin: constants.SKINS.default, link: `/post/${id}` }, title),
                    editButton),
                React.createElement(Image, { className: "gm-margin-center", src: image, height: 200, width: 300 })));
        }))));
}
export default withRouter(Posts);
//# sourceMappingURL=Posts.js.map