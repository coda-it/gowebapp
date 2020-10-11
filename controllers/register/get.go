package register

import (
	"github.com/coda-it/gowebapp/handlers"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/store"
	"github.com/coda-it/gowebserver/session"
	"net/http"
)

// CtrRegisterGet - handler for rendering register page
func (c* RegisterController) CtrRegisterGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	handlers.RenderTemplate(w, r, "register", sm, make(map[string]interface{}))
}
