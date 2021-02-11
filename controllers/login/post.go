package login

import (
	"github.com/coda-it/goutils/hash"
	"github.com/coda-it/goutils/logger"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrLoginPost - authenticates user
func (c *Controller) CtrLoginPost(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	defer r.Body.Close()

	sessionID, _ := session.GetSessionID(r)
	isLogged := sm.IsExist(sessionID)

	if !isLogged {
		username := r.PostFormValue("username")
		password := hash.EncryptString(r.PostFormValue("password"))

		_, err := c.UserUsecases.CreateClientSession(w, r, username, password, sm)
		if err != nil {
			logger.Log("user '" + username + "' failed to login: " + err.Error())
			http.Redirect(w, r, "/login?err", http.StatusSeeOther)
			return
		}

		http.Redirect(w, r, "/", http.StatusSeeOther)
		return
	}

	http.Redirect(w, r, "/login", http.StatusSeeOther)
}
