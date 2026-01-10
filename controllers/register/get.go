package register

import (
	"net/http"

	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
)

// CtrRegisterGet - handler for rendering register page
func (c *Controller) CtrRegisterGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	message, ok := r.URL.Query()["err"]
	params := make(map[string]interface{})

	if ok {
		params["IsError"] = true
		params["ErrorType"] = message[0]
	}

	c.RenderTemplate(w, r, "register", sm, params, c.moduleID)
}
