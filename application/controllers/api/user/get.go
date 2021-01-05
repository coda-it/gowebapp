package user

import (
	userServices "github.com/coda-it/gowebapp/helpers/user"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrUsersGet - gets user
func (c *Controller) CtrUsersGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	links := map[string]map[string]string{
		"self": map[string]string{
			"href": "/api/user",
		},
	}

	u, err := userServices.GetLoggedUser(r, sm)

	if err != nil {
		c.HandleJSONResponse(w, struct{}{}, struct{}{}, links, http.StatusOK)
		return
	}

	embedded := map[string]map[string]bool{}
	embedded["featureFlags"] = make(map[string]bool)

	c.HandleJSONResponse(w, u, embedded, links, http.StatusOK)
}
