// @flow
import _ from 'lodash';
import classNames from 'classnames';
import React, { useState, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Button, Dropdown } from 'graphen';
import * as types from './types';

function PostEditor(props: types.Props) {
  const {
    onAdd,
    onUpdate,
    post,
    categories,
    loadPosts,
    loadCategories,
    user,
    onDelete,
  } = props;

  useEffect(() => {
    loadPosts(user);
    loadCategories();
  }, [loadPosts]);

  const [isDirty, setIsDirty] = useState(false);

  const [title, setTitle] = useState('');
  const handleTitleChange = useCallback(
    event => {
      setTitle(event.target.value);
      setIsDirty(true);
    },
    [setTitle, setIsDirty]
  );

  const [image, setImage] = useState(null);
  const loadImage = useCallback(
    (event: Event) => {
      if (event.currentTarget instanceof FileReader) {
        if (typeof event.currentTarget.result === 'string') {
          setImage(event.currentTarget.result);
        }
      }
    },
    [setImage]
  );
  const handleImageChange = useCallback(
    (event: SyntheticInputEvent<HTMLInputElement>) => {
      const file = _.head(event.currentTarget.files);
      const fileReader = new FileReader();
      fileReader.addEventListener('load', loadImage);
      fileReader.readAsDataURL(file);
    },
    [loadImage]
  );

  const [categoryId, setCategoryId] = useState(null);
  const handleCategoryChange = useCallback(
    event => {
      setCategoryId(event.target.value);
      setIsDirty(true);
    },
    [setCategoryId, setIsDirty]
  );

  const [description, setDescription] = useState('');
  const handleDescriptionChange = useCallback(
    event => {
      setDescription(event.target.value);
      setIsDirty(true);
    },
    [setDescription, setIsDirty]
  );

  useEffect(() => {
    setTitle(post?.title || '');
    setDescription(post?.description || '');
    setCategoryId(post?.categoryId || null);
    setImage(post?.image || null);
  }, [post, setTitle, setDescription, setCategoryId, setImage]);

  const handleAddPost = useCallback(() => {
    onAdd(title, description, categoryId, image);
    setTitle('');
    setDescription('');
    setCategoryId(null);
  }, [
    onAdd,
    title,
    description,
    categoryId,
    setTitle,
    setDescription,
    setCategoryId,
    image,
    setImage,
  ]);

  const handleUpdatePost = useCallback(() => {
    if (post) {
      onUpdate(post.id, title, description, categoryId, image);
      setIsDirty(false);
    }
  }, [onUpdate, post, title, description, categoryId, setIsDirty, image]);

  const handleDeletePost = useCallback(() => {
    if (post) {
      onDelete(post.id);
    }
  }, [onDelete, post]);

  const updateButtonClasses = classNames(
    'gc-btn--primary',
    'gm-spacing-bl',
    'tst-post-editor-update',
    {
      'gc-btn--disabled': isDirty,
    }
  );

  return (
    <>
      <div className="gc-panel gc-panel--separator">
        <header className="gc-panel__title">Title</header>
        <article className="gc-panel__content">
          <div className="gc-input gc-input--full">
            <label htmlFor="post-title" className="gc-input__label">
              Title
            </label>
            <input
              id="post-title"
              value={title}
              onChange={handleTitleChange}
              className="gc-input__field tst-post-editor-title"
            />
          </div>
          <Dropdown
            initValue={{ label: '-Select Value-', value: 'selectValue' }}
            label="Categories"
            items={_.map(categories, category => ({
              label: `${category.name}`,
              value: `${category.id}`,
            }))}
          />
        </article>
      </div>
      <div className="gc-panel gc-panel--separator gm-spacing-bl">
        <header className="gc-panel__title">Post image</header>
        <input
          type="file"
          name="post-image"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          className="gm-spacing-bl"
        />
        <img src={image} role="presentation" />
      </div>
      <div className="gc-panel gc-panel--separator">
        <header className="gc-panel__title">Description</header>
        <article className="gc-panel__content">
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="gc-textarea  tst-post-editor-description"
          />
        </article>
        {_.isEmpty(post) && (
          <Button
            className="gc-btn--primary tst-post-editor-add"
            onClick={handleAddPost}
          >
            Add
          </Button>
        )}
        {!_.isEmpty(post) && (
          <>
            <Button className={updateButtonClasses} onClick={handleUpdatePost}>
              Update
            </Button>
            <Button
              className="gc-btn--danger tst-post-editor-delete"
              onClick={handleDeletePost}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export default withRouter(PostEditor);
