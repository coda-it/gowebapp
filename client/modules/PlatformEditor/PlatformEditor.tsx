import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'graphen';
import * as types from './types';

function PlatformEditor(props: types.Props) {
  const { config, load, onUpdate, onAdd } = props;
  const { id, landingModule, staticPage } = config ?? {};
  const [landingPageInput, setLandingPageInput] = useState(landingModule);
  const [staticPageInput, setStaticPageInput] = useState(staticPage);

  useEffect(() => {
    load();
  }, [load]);

  const handleLangingPageInputChange = useCallback(
    (event) => {
      setLandingPageInput(event.target.value);
    },
    [setLandingPageInput]
  );

  const handleStaticPageInputChange = useCallback(
    (event) => {
      setStaticPageInput(event.target.value);
    },
    [setStaticPageInput]
  );

  return (
    <div className="gc-panel gc-panel--separator">
      <header className="gc-panel__title">Platform Editor</header>
      <article className="gc-panel__content">
        <div className="gc-input gc-input--full">
          {/* eslint-disable jsx-a11y/label-has-associated-control */}
          <label htmlFor="landing-page-title" className="gc-input__label">
            Landing Page Module
          </label>
          {/* eslint-enable jsx-a11y/label-has-associated-control */}
          <input
            id="landing-page"
            className="gc-input__field tst-landing-page-title"
            defaultValue={id ? landingModule : ''}
            onChange={handleLangingPageInputChange}
          />
        </div>
        <div className="gc-input gc-input--full">
          {/* eslint-disable jsx-a11y/label-has-associated-control */}
          <label htmlFor="static-page-title" className="gc-input__label">
            Static Page
          </label>
          {/* eslint-enable jsx-a11y/label-has-associated-control */}
          <input
            id="static-page"
            className="gc-input__field tst-static-page-title"
            defaultValue={id ? staticPage : ''}
            onChange={handleStaticPageInputChange}
          />
        </div>
      </article>
      {id ? (
        <Button
          className="gc-btn--primary tst-post-editor-add gc-btn"
          onClick={() =>
            onUpdate({
              id,
              landingModule: landingPageInput,
              staticPage: staticPageInput,
            })
          }
        >
          Update
        </Button>
      ) : (
        <Button
          className="gc-btn--primary tst-post-editor-add gc-btn"
          onClick={() =>
            onAdd({
              landingModule: landingPageInput,
              staticPage: staticPageInput,
            })
          }
        >
          Add
        </Button>
      )}
    </div>
  );
}

export default withRouter(PlatformEditor);
