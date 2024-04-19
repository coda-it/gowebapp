package platform

import (
	"github.com/coda-it/goappframe/config"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrPlatformGet - gets platform config
func (c *Controller) CtrPlatformGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	var application config.App

	for _, app := range c.Config.Apps {
		if app.Domain == "" || r.Host == app.Domain {
			application = app
		}
	}

	platformConfig, err := c.PlatformUsecases.Fetch(application.ID)
	var data map[string]interface{}

	if err != nil {
		data = map[string]interface{}{
			"config": struct{}{},
		}
	} else {
		data = map[string]interface{}{
			"config": platformConfig,
		}
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": href,
		},
	}

	embedded := map[string]interface{}{}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
