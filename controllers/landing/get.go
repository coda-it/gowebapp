package landing

import (
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrLandingGet - controller for landing page
func (c *Controller) CtrLandingGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	defer r.Body.Close()

	application := c.Usecase.GetApplicationByDomain(c.Config, r)

	appConfig, err := c.Usecase.Fetch(application.ID)

	if err != nil || appConfig.LandingModule == "" {
		c.RenderTemplate(w, r, constants.DefaultLandingPage, sm, make(map[string]interface{}), c.moduleID)
		return
	}

	if appConfig.LandingModule == constants.StaticModule {
		if appConfig.StaticPage == "" {
			c.RenderStaticTemplate(w, r, constants.DefaultStaticPage, sm, make(map[string]interface{}))
			return
		}

		c.RenderStaticTemplate(w, r, constants.DefaultStaticPage, sm, make(map[string]interface{}))
		return
	}

	c.RenderTemplate(w, r, appConfig.LandingModule, sm, make(map[string]interface{}), c.moduleID)
}
