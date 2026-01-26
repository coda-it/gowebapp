package eshop

import (
	"net/http"

	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
)

// Get - obsługuje żądania GET dla eshop
func (c *Controller) CtrEshop(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	c.RenderTemplate(w, r, "eshop", sm, make(map[string]interface{}), c.moduleID)
}
