package user

import (
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrUsers - api serving user data
func CtrUsers(w http.ResponseWriter, r *http.Request, opt router.UrlOptions, sm session.ISessionManager, s store.IStore) {
	switch r.Method {
	case "GET":
		getHandler(w, r, sm, s)
		return
	default:
	}
}
