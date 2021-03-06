import _ from 'lodash';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Image, Link, constants } from 'graphen';
function Categories(props) {
    const { loadCategories, categories, isAdmin } = props;
    useEffect(() => {
        loadCategories();
    }, [loadCategories]);
    return (React.createElement("div", { className: "gc-panel" },
        React.createElement("div", { className: "gc-panel__title" }, "Categories"),
        React.createElement("div", { className: "gc-panel__content gc-flex gc-flex--wrap" }, _.map(categories, ({ id, name, image }, key) => {
            const link = `/admin/categories/edit/${id}`;
            const editButton = isAdmin ? (React.createElement("a", { className: "gc-btn gc-btn--small gc-btn--primary tst-category-edit", href: link }, "Edit")) : null;
            return (React.createElement("div", { key: key, className: "gc-flex__item gc-card gc-card--gradient gc-panel gm-spacing-l tst-category" },
                React.createElement("div", { className: "gc-panel__title tst-category-name" },
                    React.createElement(Link, { skin: constants.SKINS.default, link: `/category/${id}` }, name),
                    editButton),
                React.createElement(Image, { className: "gm-margin-center", src: image, height: 200, width: 300 })));
        }))));
}
export default withRouter(Categories);
//# sourceMappingURL=Categories.js.map