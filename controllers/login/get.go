package login

import (
	"github.com/coda-it/gowebapp/handlers"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/store"
	"github.com/coda-it/gowebserver/session"
	"net/http"
)

// CtrLoginGet - handler for rendering login page
func (c* LoginController) CtrLoginGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	_, ok := r.URL.Query()["err"]
	params := make(map[string]interface{})

	if ok {
		params["IsError"] = true
	}

	handlers.RenderTemplate(w, r, "login", sm, params)
}
