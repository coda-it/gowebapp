package landing

import (
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrStaticGet - controller for static page
func (c *Controller) CtrStaticGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	defer r.Body.Close()

	application := c.Usecase.GetApplicationByDomain(c.Config, r)

	appConfig, err := c.Usecase.Fetch(application.ID)

	if err != nil || appConfig.StaticPage == "" {
		c.RenderStaticTemplate(w, r, constants.DefaultStaticPage, sm, make(map[string]interface{}))
		return
	}

	c.RenderStaticTemplate(w, r, constants.DefaultStaticPage, sm, make(map[string]interface{}))
}
