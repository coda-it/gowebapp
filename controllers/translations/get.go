package translations

import (
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrAdmin - controller for translations page
func (c *Controller) CtrTranslations(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	c.RenderTemplate(w, r, "translations", sm, make(map[string]interface{}), c.moduleID)
}
