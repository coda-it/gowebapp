package activation

import (
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrActivationGet - activates user
func (c *Controller) CtrActivationGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	userID := opt.Params["id"]

	err := c.UserUsecases.Activate(userID)
	if err != nil {
		c.HandleErrorResponse(w, "user activation error: "+err.Error())
		return
	}

	http.Redirect(w, r, "/", http.StatusSeeOther)
}
