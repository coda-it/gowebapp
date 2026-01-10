package login

import (
	"net/http"

	"github.com/coda-it/goutils/hash"
	"github.com/coda-it/goutils/logger"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
)

// CtrLoginPost - authenticates user
func (c *Controller) CtrLoginPost(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	defer r.Body.Close()

	sessionID, _ := session.GetSessionID(r)
	isLogged := sm.IsExist(sessionID)

	if !isLogged {
		username := r.PostFormValue("username")
		password := hash.EncryptString(r.PostFormValue("password"))
		application := c.PlatformUsecases.GetApplicationByDomain(c.Config, r)

		_, err := c.UserUsecases.CreateClientSession(w, r, username, password, application, sm)
		if err != nil {
			logger.Log("user '" + username + "' failed to login: " + err.Error())
			http.Redirect(w, r, "/login?err", http.StatusSeeOther)
			return
		}

		config, err := c.PlatformUsecases.Fetch(application.ID)

		loginRedirectURL := "/"

		if err == nil {
			if config.LoginRedirectURL != "" {
				loginRedirectURL = config.LoginRedirectURL
			}
		} else {
			logger.Log("while logging in config fetching failed: " + err.Error())
		}

		http.Redirect(w, r, loginRedirectURL, http.StatusSeeOther)
		return
	}

	http.Redirect(w, r, "/login", http.StatusSeeOther)
}
