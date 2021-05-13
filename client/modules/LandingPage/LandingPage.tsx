import React, { useState, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'graphen';

function LandingPage() {
	
const [id, setId] = useState('');
const [input, setInput] = useState('');
const handleChange = (event) => {setInput(event.target.value)}

	function loadLanding() {
		console.log('load landing')
    fetch('http://localhost:3000/api/platform')
	.then(res => res.json())
	.then(data => {
		setId(data.config.id);
		setInput(data.config.landingModule)
	})
	
	}
	
function putLanding() {
	console.log('before another put sending')
	fetch('http://localhost:3000/api/platform', {
        method: "put",
		headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    		id: id,
 			landingModule: input
			})
    })
   	.then(loadLanding())
}

function postLanding() {
	console.log('before first post sending')
	fetch('http://localhost:3000/api/platform', {
        method: "post",
		headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
 			landingModule: input
			})
    })
    .then(loadLanding())
}

useEffect(() => {
		loadLanding()
	
  }, []);

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
              value={input}
              onChange={handleChange}
            />
            </div>
            </article>
             <Button
            className="gc-btn--primary tst-post-editor-add gc-btn"
            onClick={(id) ? putLanding : postLanding}
          >
            Add
          </Button>
       </div>
       
       );
}

export default withRouter(LandingPage);