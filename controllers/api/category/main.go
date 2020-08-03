package category

import (
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

var (
	href = "/api/category"
)

// CtrCategory - categories api controller entry-point
func CtrCategory(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	switch r.Method {
	case "PUT":
		putHandler(w, r, s)
		return
	case "GET":
		getHandler(w, r, s)
		return
	case "POST":
		postHandler(w, r, s)
		return
	case "DELETE":
		deleteHandler(w, r, s)
	default:
	}
}
