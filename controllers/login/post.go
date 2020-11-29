package login

import (
	"github.com/coda-it/goutils/hash"
	"github.com/coda-it/goutils/logger"
	goutilsSession "github.com/coda-it/goutils/session"
	"github.com/coda-it/gowebapp/constants"
	userServices "github.com/coda-it/gowebapp/services/user"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
	"time"
)

// CtrLoginPost - authenticates user
func (c *Controller) CtrLoginPost(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	sessionID, _ := session.GetSessionID(r)
	isLogged := sm.IsExist(sessionID)

	if !isLogged {
		u := r.PostFormValue("username")
		password := hash.EncryptString(r.PostFormValue("password"))
		expiration := time.Now().Add(365 * 24 * time.Hour)

		t := time.Now()
		timeStr := t.Format(time.RFC850)
		cookieValue := goutilsSession.CreateSessionID(u, password, timeStr)

		authenticatedUser, err := c.UserUsecases.Authenticate(u, password, cookieValue)
		if err != nil {
			logger.Log("user '" + u + "' failed to login: " + err.Error())
		}

		isActivated := userServices.IsActivated(authenticatedUser)

		if err == nil && isActivated {
			logger.Log("logged in as user " + u)

			cookie := http.Cookie{
				Name:    constants.SessionKey,
				Value:   cookieValue,
				Expires: expiration}

			s := sm.Create(cookieValue)
			s.Set("user", authenticatedUser)

			http.SetCookie(w, &cookie)
			http.Redirect(w, r, "/", http.StatusSeeOther)
			return
		}

		http.Redirect(w, r, "/login?err", http.StatusSeeOther)
		return
	}

	http.Redirect(w, r, "/login", http.StatusSeeOther)
}
