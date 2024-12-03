package featureflags

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebapp/domain/models/featureflag"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"io/ioutil"
	"net/http"
)

// CtrFeatureFlagsPost - adds new feature flag
func (c *Controller) CtrFeatureFlagsPost(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	requestBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		c.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var newFeatureFlag featureflag.FeatureFlag

	err = json.Unmarshal(requestBody, &newFeatureFlag)
	if err != nil {
		c.HandleErrorResponse(w, err.Error())
		return
	}

	application := c.PlatformUsecases.GetApplicationByDomain(c.Config, r)
	newFeatureFlag.AppID = application.ID

	err = c.FeatureFlagUsecases.AddFeatureFlag(newFeatureFlag)

	if err != nil {
		c.HandleErrorResponse(w, "error adding new feature flag")
	}

	var data map[string]interface{}
	data = map[string]interface{}{
		"featureflag": struct{}{},
	}

	if err == nil {
		data = map[string]interface{}{
			"featureflag": newFeatureFlag,
		}
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": constants.FeatureFlagEndpointURL,
		},
	}

	embedded := map[string]interface{}{}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
