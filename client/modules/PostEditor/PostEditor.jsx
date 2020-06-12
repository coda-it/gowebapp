// @flow
import _ from 'lodash';
import React, { useState, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'graphen';
import * as types from './types';

function PostEditor(props: types.Props) {
  const { onAdd, onUpdate, post, loadPosts, user } = props;

  useEffect(() => {
    loadPosts(user);
  }, [loadPosts]);

  const [title, setTitle] = useState('');
  const handleTitleChange = useCallback(
    event => {
      setTitle(event.target.value);
    },
    [setTitle]
  );

  const [description, setDescription] = useState('');
  const handleDescriptionChange = useCallback(
    event => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  useEffect(() => {
    setTitle(post?.title || '');
    setDescription(post?.description || '');
  }, [post]);

  const handleAddPost = useCallback(() => {
    onAdd(title, description);
    setTitle('');
    setDescription('');
  }, [onAdd, title, description, setTitle, setDescription]);

  const handleUpdatePost = useCallback(() => {
    if (post) {
      onUpdate(post.id, title, description);
    }
  }, [onUpdate, post, title, description]);

  const onSubmit = _.isEmpty(post) ? handleAddPost : handleUpdatePost;
  const submitTitle = _.isEmpty(post) ? 'Add' : 'Update';

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
              className="gc-input__field"
            />
          </div>
        </article>
      </div>
      <div className="gc-panel gc-panel--separator">
        <header className="gc-panel__title">Description</header>
        <article className="gc-panel__content">
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="gc-textarea"
          />
        </article>
        <Button className="gc-btn--primary" onClick={onSubmit}>
          {submitTitle}
        </Button>
      </div>
    </>
  );
}

export default withRouter(PostEditor);
