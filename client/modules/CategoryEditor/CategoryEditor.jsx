// @flow
import _ from 'lodash';
import classNames from 'classnames';
import React, { useState, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'graphen';
import * as types from './types';

function CategoryEditor(props: types.Props) {
  const { onAdd, onUpdate, category, loadCategories, onDelete } = props;

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const [isDirty, setIsDirty] = useState(false);

  const [name, setName] = useState('');
  const handleNameChange = useCallback(
    event => {
      setName(event.target.value);
      setIsDirty(true);
    },
    [setName, setIsDirty]
  );

  useEffect(() => {
    setName(category?.name || '');
  }, [category]);

  const handleAddCategory = useCallback(() => {
    onAdd(name);
    setName('');
  }, [onAdd, name, setName]);

  const handleUpdateCategory = useCallback(() => {
    if (category) {
      onUpdate(category.id, name);
      setIsDirty(false);
    }
  }, [onUpdate, category, name, setIsDirty]);

  const handleDeleteCategory = useCallback(() => {
    if (category) {
      onDelete(category.id);
    }
  }, [onDelete, category]);

  const updateButtonClasses = classNames(
    'gc-btn--primary',
    'gm-spacing-bl',
    'tst-category-editor-update',
    {
      'gc-btn--disabled': isDirty,
    }
  );

  return (
    <>
      <div className="gc-panel gc-panel--separator">
        <header className="gc-panel__title">Name</header>
        <article className="gc-panel__content">
          <div className="gc-input gc-input--full">
            <label htmlFor="category-name" className="gc-input__label">
              Name
            </label>
            <input
              id="category-name"
              value={name}
              onChange={handleNameChange}
              className="gc-input__field tst-category-editor-name"
            />
          </div>
        </article>
      </div>
      <div className="gc-panel gc-panel--separator">
        {_.isEmpty(category) && (
          <Button
            className="gc-btn--primary tst-category-editor-add"
            onClick={handleAddCategory}
          >
            Add
          </Button>
        )}
        {!_.isEmpty(category) && (
          <>
            <Button
              className={updateButtonClasses}
              onClick={handleUpdateCategory}
            >
              Update
            </Button>
            <Button
              className="gc-btn--danger tst-category-editor-delete"
              onClick={handleDeleteCategory}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export default withRouter(CategoryEditor);
