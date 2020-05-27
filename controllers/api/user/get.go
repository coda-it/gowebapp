package user

import (
	"github.com/coda-it/gowebapp/handlers"
	"github.com/coda-it/gowebapp/models/user"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

func getHandler(w http.ResponseWriter, r *http.Request, sm session.ISessionManager, s store.IStore) {
	links := map[string]map[string]string{
		"self": map[string]string{
			"href": "/api/user",
		},
	}

	sidCookie, err := r.Cookie(utils.SessionKey)

	if err != nil {
		handlers.HandleJSONResponse(w, struct{}{}, struct{}{}, links, http.StatusOK)
		return
	}

	sid := sidCookie.Value
	sess := sm.Get(sid)

	u := sess.Get("user")
	if u == nil {
		handlers.HandleJSONResponse(w, struct{}{}, struct{}{}, links, http.StatusOK)
		return
	}

	embedded := map[string]map[string]bool{}
	embedded["featureFlags"] = make(map[string]bool)

	uu, ok := u.(user.User)
	if !ok {
		handlers.HandleErrorResponse(w, "error asserting user")
		return
	}

	handlers.HandleJSONResponse(w, uu, embedded, links, http.StatusOK)
}
