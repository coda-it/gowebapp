package featureflags

import (
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
	"strconv"
)

// CtrFeatureFlagsGet - gets feature flags
func (c *Controller) CtrFeatureFlagsGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	application := c.PlatformUsecases.GetApplicationByDomain(c.Config, r)
	featureflags, err := c.FeatureFlagUsecases.GetFeatureFlags(application.ID)

	if err != nil {
		c.HandleErrorResponse(w, err.Error())
		return
	}

	data := map[string]string{
		"count": strconv.Itoa(len(featureflags)),
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": constants.FeatureFlagEndpointURL,
		},
	}

	embedded := map[string]interface{}{
		"featureFlags": featureflags,
	}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
