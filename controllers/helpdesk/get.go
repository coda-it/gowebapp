package helpdesk

import (
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrHelpdesk - controller for helpdesk
func (c *Controller) CtrHelpdesk(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	c.RenderTemplate(w, r, "helpdesk", sm, make(map[string]interface{}), c.moduleID)
}
