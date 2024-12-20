package login

import (
	"github.com/coda-it/goutils/hash"
	goutilsSession "github.com/coda-it/goutils/session"
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrLoginPost - handle login page and login process
func (c *Controller) CtrLoginPost(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	defer r.Body.Close()

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": constants.LoginEndpointURL,
		},
	}

	embedded := map[string]string{}

	sessionID, _ := goutilsSession.GetSessionID(r, constants.SessionKey)
	isLogged := sm.IsExist(sessionID)

	if !isLogged {
		username := r.PostFormValue("username")
		password := hash.EncryptString(r.PostFormValue("password"))

		_, err := c.UserUsecases.CreateClientSession(w, r, username, password, sm)

		if err != nil {
			data := struct {
				IsSession bool `json:"isSession"`
			}{
				false,
			}
			c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
			return
		}
	}

	data := struct {
		IsSession bool `json:"isSession"`
	}{
		true,
	}
	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
