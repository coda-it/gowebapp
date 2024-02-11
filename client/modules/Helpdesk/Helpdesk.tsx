import React, { useState, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'graphen';
import type * as types from './types';

function Helpdesk(props: types.Props) {
  const { createTicket, fetchTicket, id, ticket } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (id) {
      fetchTicket(id);
    }
  }, [id]);

  const handleTitleChange = useCallback(
    (event) => {
      setTitle(event.target.value);
    },
    [setTitle]
  );

  const handleDescriptionChange = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setTitle]
  );

  return (
    <div className="gc-panel">
      <header className="gc-panel__title">Helpdesk</header>
      <article className="gc-panel__content gc-flex gc-flex--wrap">
        <div className="gc-input gc-input--full">
          {/* eslint-disable jsx-a11y/label-has-associated-control */}
          <label htmlFor="post-title" className="gc-input__label">
            Title
          </label>
          {/* eslint-enable jsx-a11y/label-has-associated-control */}
          {ticket ? (
            <p>{ticket.title}</p>
          ) : (
            <input
              id="post-title"
              value={title}
              onChange={handleTitleChange}
              className="gc-input__field tst-post-editor-title"
            />
          )}
        </div>
      </article>
      <div className="gc-panel gc-panel--separator">
        {/* eslint-disable jsx-a11y/label-has-associated-control */}
        <label htmlFor="post-description" className="gc-input__label">
          Description
        </label>
        {/* eslint-enable jsx-a11y/label-has-associated-control */}
        {ticket ? (
          <p>{ticket.description}</p>
        ) : (
          <article className="gc-panel__content">
            <textarea
              id="post-description"
              value={description}
              onChange={handleDescriptionChange}
              className="gc-textarea  tst-post-editor-description"
            />
          </article>
        )}
      </div>
      {!id && (
        <Button
          className="gc-btn--primary tst-post-editor-add gc-btn"
          onClick={() => {
            createTicket(title, description);
          }}
        >
          Create ticket
        </Button>
      )}
    </div>
  );
}

export default withRouter(Helpdesk);
