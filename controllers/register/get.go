package register

import (
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrRegisterGet - handler for rendering register page
func (c *Controller) CtrRegisterGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	_, ok := r.URL.Query()["err"]
	params := make(map[string]interface{})

	if ok {
		params["IsError"] = true
	}

	c.RenderTemplate(w, r, "register", sm, params, c.moduleID)
}
