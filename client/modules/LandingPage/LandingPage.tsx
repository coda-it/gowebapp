import React from 'react';
import { withRouter } from 'react-router';
import { Button } from 'graphen';

function LandingPage() {
return (
      <div className="gc-panel gc-panel--separator">
        <header className="gc-panel__title">Landing Page</header>
        <article className="gc-panel__content">
        <div className="gc-input gc-input--full">
            {/* eslint-disable jsx-a11y/label-has-associated-control */}
            <label htmlFor="landing-page-title" className="gc-input__label">
              Landing Page Title
            </label>
            {/* eslint-enable jsx-a11y/label-has-associated-control */}
            <input
              id="landing page"
              className="gc-input__field tst-landing-page-title"
            />
            </div>
            </article>
             <Button
            className="gc-btn--primary tst-post-editor-add gc-btn"
            onClick={() => console.log('click')}
          >
            Add
          </Button>
       </div>
       
       );
}

export default withRouter(LandingPage);