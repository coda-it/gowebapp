package platform

import (
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrPlatformGet - gets platform config
func (c *Controller) CtrPlatformGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	application := c.PlatformUsecases.GetApplicationByDomain(c.Config, r)

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
			"href": constants.PlatformEndpointURL,
		},
	}

	embedded := map[string]interface{}{}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
