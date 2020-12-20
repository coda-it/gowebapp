package logout

import (
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// AuthenticateLogout - logout user
func (c *Controller) AuthenticateLogout(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	sid, err := session.GetSessionID(r)
	if err != nil {
		err := c.UserUsecases.Logout(sid)

		if err != nil {
			c.HandleErrorResponse(w, "error clearing sid in database")
			return
		}
	}

	session.ClearSession(w)
	http.Redirect(w, r, "/", http.StatusSeeOther)
}
