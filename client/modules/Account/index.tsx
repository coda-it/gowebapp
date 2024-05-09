import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Dialog } from 'graphen';
import * as userActions from 'client/models/users/actions';

function Account() {
  const dispatch = useDispatch();

  const [isDialogShown, setIsDialogShown] = useState(false);

  const handleDeleteAccountClick = useCallback(() => {
    setIsDialogShown(true);
  }, []);

  const handleCancelClick = useCallback(() => {
    setIsDialogShown(false);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    dispatch(userActions.deleteUser());
  }, [dispatch]);

  return (
    <div className="gc-panel gc-panel--separator gm-spacing-bl">
      <header className="gc-panel__title">Account</header>
      <div className="gc-panel__content">
        <Button
          className="gc-btn--danger tst-post-editor-add gc-btn"
          onClick={handleDeleteAccountClick}
        >
          Update
        </Button>
      </div>

      {isDialogShown && (
        <Dialog>
          <article className="gc-panel">
            <header className="gc-panel__title">Delete account</header>
            <div className="gc-panel__content">
              <p>Are you sure you want to delete your account?</p>
            </div>
            <div className="gc-panel__footer">
              <div className="gc-flex">
                <div className="gm-spacing-rl">
                  <Button
                    onClick={handleCancelClick}
                    className="gc-btn--secondary"
                  >
                    Cancel
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={handleConfirmDelete}
                    className="gc-btn--danger"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </Dialog>
      )}
    </div>
  );
}

export default withRouter(Account);
