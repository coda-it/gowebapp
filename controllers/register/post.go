package register

import (
	"github.com/coda-it/goutils/logger"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/store"
	"github.com/coda-it/gowebserver/session"
	"net/http"
	"os"
)

// CtrRegisterPost - registers user
func (c* RegisterController) CtrRegisterPost(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	username := r.PostFormValue("username")
	password := utils.HashString(r.PostFormValue("password"))

	err := c.UserUsecases.Register(username, password, os.Getenv("WEBAPP_ENV") == "test")

	if err != nil {
		logger.Log("error registering user '" + username + "'")
		return
	}
	logger.Log("registered user '" + username + "'")

	c.Mailer.SendEmail("", username)

	http.Redirect(w, r, "/", http.StatusSeeOther)
}
