import React from 'react';
import { withRouter } from 'react-router';

function LandingPage() {
return (
      <div className="gc-panel gc-panel--separator">
        <header className="gc-panel__title">Landing Page</header>
        <article className="gc-panel__content">
        <div className="gc-input gc-input--full">
            {/* eslint-disable jsx-a11y/label-has-associated-control */}
            <label htmlFor="post-title" className="gc-input__label">
              Title
            </label>
            {/* eslint-enable jsx-a11y/label-has-associated-control */}
            <input
              id="landing page"
              className="gc-input__field tst-post-editor-title"
            />
            </div>
            </article>
       </div>
       
       );
}

export default withRouter(LandingPage);