package reset

import (
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

const resetHref string = "/api/reset"

// CtrResetDb - resets persistence
func CtrResetDb(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {

	switch r.Method {
	case "POST":
		postHandler(w, s)
		return
	}
}
