package register

import (
	"errors"
	"net/http"

	"github.com/coda-it/goutils/hash"
	"github.com/coda-it/goutils/logger"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
)

// CtrRegisterPost - registers user
func (c *Controller) CtrRegisterPost(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	username := r.PostFormValue("username")
	password := hash.EncryptString(r.PostFormValue("password"))
	application := c.PlatformUsecases.GetApplicationByDomain(c.GetConfig(), r)

	user, err := c.UserUsecases.Register(application.ID, username, password, utils.IsTestEnv())

	if err != nil {
		logger.Log("error registering user '" + username + "'")

		errQuery := "unknown"

		if errors.Is(err, utils.ErrUserAlreadyExists) {
			errQuery = "user_exists"
		}

		http.Redirect(w, r, "/login/register?err="+errQuery, http.StatusSeeOther)
		return
	}

	activationMessage := `Welcome!
		You have been successfully registered.
		In order to complete the registration process please visit ` + application.Domain + `/login/activation/` + user.ID.Hex() + `
	`

	c.GetMailer().SendEmail("Activation email", activationMessage, username)

	logger.Log("registered user '" + username + "'")

	http.Redirect(w, r, "/", http.StatusSeeOther)
}
