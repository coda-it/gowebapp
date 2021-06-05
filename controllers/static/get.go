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

	appConfig, err := c.Usecase.Fetch()

	if err != nil || appConfig.StaticPage == "" {
		c.RenderStaticTemplate(w, constants.DefaultStaticPage)
		return
	}

	c.RenderStaticTemplate(w, appConfig.StaticPage)
}
