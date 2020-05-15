// @flow
import React, { useState, useCallback } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'graphen';

type Props = {|
  onAdd: (string, string) => void,
|};

function NewPost(props: Props) {
  const { onAdd } = props;

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

  const handleAddPost = useCallback(() => {
    onAdd(title, description);
    setTitle('');
    setDescription('');
  }, [onAdd, title, description, setTitle, setDescription]);

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
        <Button className="gc-btn--primary" onClick={handleAddPost}>
          Add
        </Button>
      </div>
    </>
  );
}

export default withRouter(NewPost);
