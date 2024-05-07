package register

import (
	"github.com/coda-it/goutils/hash"
	"github.com/coda-it/goutils/logger"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrRegisterPost - registers user
func (c *Controller) CtrRegisterPost(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	username := r.PostFormValue("username")
	password := hash.EncryptString(r.PostFormValue("password"))

	user, err := c.UserUsecases.Register(username, password, utils.IsTestEnv())

	if err != nil {
		logger.Log("error registering user '" + username + "'")
		http.Redirect(w, r, "/login/register?err", http.StatusSeeOther)
		return
	}

	application := c.PlatformUsecases.GetApplicationByDomain(c.Config, r)

	activationMessage := `Welcome!
		You have been successfully registered.
		In order to complete the registration process please visit ` + application.Domain + `/login/activation/` + user.ID.Hex() + `
	`

	c.Mailer.SendEmail("Activation email", activationMessage, username)

	logger.Log("registered user '" + username + "'")

	http.Redirect(w, r, "/", http.StatusSeeOther)
}
