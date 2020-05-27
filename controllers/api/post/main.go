package post

import (
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

var (
	href = "/api/posts"
)

// CtrPosts - posts api controller entry-point
func CtrPosts(w http.ResponseWriter, r *http.Request, opt router.UrlOptions, sm session.ISessionManager, s store.IStore) {
	switch r.Method {
	case "GET":
		getHandler(w, r, s)
		return
	case "POST":
		postHandler(w, r, s)
		return
	default:
	}
}
