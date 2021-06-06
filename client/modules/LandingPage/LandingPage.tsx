import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'graphen';

function LandingPage(props) {
	const {landingModule, id, loadLanding, onUpdate, onAdd} = props
	console.log('props', props)
  const [input, setInput] = useState('');
  const [localId, setLocalId] = useState('');

  useEffect(() => {
    props.loadLanding();
    setLocalId(props.id)
    console.log('useeffect id', props.id)
  }, [props.loadLanding]); 

  const handleChange = (event) => {	
    setInput(event.target.value);
  };

  const add = () => {

  	props.onAdd(input);
  	setLocalId(props.id)
  }

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
            //value={input}
            onChange={handleChange}
          />
        </div>
      </article>
      <Button
        className="gc-btn--primary tst-post-editor-add gc-btn"
       
        onClick = {(props.id) ? () => props.onUpdate(input, props.id) : () => props.onAdd(input)}
        //onClick={id ? putLanding : postLanding}
      >
        Add
      </Button>
    </div>
  );
}

export default withRouter(LandingPage);
