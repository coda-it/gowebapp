package user

import (
	"github.com/coda-it/gowebapp/handlers"
	"github.com/coda-it/gowebapp/models/user"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrUsersGet - gets user
func CtrUsersGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	links := map[string]map[string]string{
		"self": map[string]string{
			"href": "/api/user",
		},
	}

	u, err := user.GetLoggedUser(r, sm)

	if err != nil {
		handlers.HandleJSONResponse(w, struct{}{}, struct{}{}, links, http.StatusOK)
		return
	}

	embedded := map[string]map[string]bool{}
	embedded["featureFlags"] = make(map[string]bool)

	handlers.HandleJSONResponse(w, u, embedded, links, http.StatusOK)
}
