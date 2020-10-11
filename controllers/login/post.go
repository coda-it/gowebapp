package login

import (
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/store"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/goutils/logger"
	"github.com/coda-it/gowebapp/utils"
	"net/http"
	"time"
)

// CtrLoginPost - authenticates user
func (c* LoginController) CtrLoginPost(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	sessionID, _ := session.GetSessionID(r)
	isLogged := sm.IsExist(sessionID)

	if !isLogged {
		u := r.PostFormValue("username")
		password := utils.HashString(r.PostFormValue("password"))
		expiration := time.Now().Add(365 * 24 * time.Hour)

		t := time.Now()
		timeStr := t.Format(time.RFC850)
		cookieValue := utils.CreateSessionID(u, password, timeStr)
		authenticatedUser, err := c.UserUsecases.Authenticate(u, password, cookieValue)

		if err == nil {
			logger.Log("Logged in as user", u)

			cookie := http.Cookie{
				Name:    utils.SessionKey,
				Value:   cookieValue,
				Expires: expiration}

			s := sm.Create(cookieValue)
			s.Set("user", authenticatedUser)

			http.SetCookie(w, &cookie)
			http.Redirect(w, r, "/", http.StatusSeeOther)
		} else {
			logger.Log(err)
			http.Redirect(w, r, "/login?err", http.StatusSeeOther)
		}
	}

	http.Redirect(w, r, "/login", http.StatusSeeOther)
}
