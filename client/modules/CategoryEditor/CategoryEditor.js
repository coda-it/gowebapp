import _ from 'lodash';
import classNames from 'classnames';
import React, { useState, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'graphen';
function CategoryEditor(props) {
    const { onAdd, onUpdate, category, loadCategories, onDelete } = props;
    useEffect(() => {
        loadCategories();
    }, [loadCategories]);
    const [isDirty, setIsDirty] = useState(false);
    const [name, setName] = useState('');
    const handleNameChange = useCallback((event) => {
        setName(event.target.value);
        setIsDirty(true);
    }, [setName, setIsDirty]);
    const [image, setImage] = useState(null);
    const loadImage = useCallback((event) => {
        if (event.currentTarget instanceof FileReader) {
            if (typeof event.currentTarget.result === 'string') {
                setImage(event.currentTarget.result);
            }
        }
    }, [setImage]);
    const handleImageChange = useCallback((event) => {
        const file = _.head(event.currentTarget.files);
        const fileReader = new FileReader();
        fileReader.addEventListener('load', loadImage);
        fileReader.readAsDataURL(file);
    }, [loadImage]);
    useEffect(() => {
        setName(category?.name || '');
        setImage(category?.image || null);
    }, [category, setName, setImage]);
    const handleAddCategory = useCallback(() => {
        onAdd(name, image);
        setName('');
        setImage(null);
    }, [onAdd, name, setName, image, setImage]);
    const handleUpdateCategory = useCallback(() => {
        if (category) {
            onUpdate(category.id, name, image);
            setIsDirty(false);
        }
    }, [onUpdate, category, name, setIsDirty, image]);
    const handleDeleteCategory = useCallback(() => {
        if (category) {
            onDelete(category.id);
        }
    }, [onDelete, category]);
    const updateButtonClasses = classNames('gc-btn--primary', 'gm-spacing-bl', 'tst-category-editor-update', {
        'gc-btn--disabled': isDirty,
    });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "gc-panel gc-panel--separator" },
            React.createElement("header", { className: "gc-panel__title" }, "Name"),
            React.createElement("article", { className: "gc-panel__content" },
                React.createElement("div", { className: "gc-input gc-input--full" },
                    React.createElement("label", { htmlFor: "category-name", className: "gc-input__label" }, "Name"),
                    React.createElement("input", { id: "category-name", value: name, onChange: handleNameChange, className: "gc-input__field tst-category-editor-name" })))),
        React.createElement("div", { className: "gc-panel gc-panel--separator gm-spacing-bl" },
            React.createElement("header", { className: "gc-panel__title" }, "Category image"),
            React.createElement("input", { type: "file", name: "category-image", accept: "image/png, image/jpeg", onChange: handleImageChange, className: "gm-spacing-bl" }),
            React.createElement("img", { src: image, alt: "category" })),
        React.createElement("div", { className: "gc-panel gc-panel--separator" },
            _.isEmpty(category) && (React.createElement(Button, { className: "gc-btn--primary tst-category-editor-add", onClick: handleAddCategory }, "Add")),
            !_.isEmpty(category) && (React.createElement(React.Fragment, null,
                React.createElement(Button, { className: updateButtonClasses, onClick: handleUpdateCategory }, "Update"),
                React.createElement(Button, { className: "gc-btn--danger tst-category-editor-delete", onClick: handleDeleteCategory }, "Delete"))))));
}
export default withRouter(CategoryEditor);
//# sourceMappingURL=CategoryEditor.js.map