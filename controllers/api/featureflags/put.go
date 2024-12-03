package featureflags

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/domain/models/featureflag"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"io/ioutil"
	"net/http"
)

// CtrFeatureFlagPut - update feature flag
func (c *Controller) CtrFeatureFlagPut(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	requestBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		c.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var editedFeatureFlag featureflag.FeatureFlag
	err = json.Unmarshal(requestBody, &editedFeatureFlag)
	if err != nil {
		c.HandleErrorResponse(w, err.Error())
		return
	}

	application := c.PlatformUsecases.GetApplicationByDomain(c.Config, r)
	editedFeatureFlag.AppID = application.ID

	err = c.FeatureFlagUsecases.UpdateFeatureFlag(editedFeatureFlag)

	if err != nil {
		c.HandleErrorResponse(w, "error updating feature flag")
	}

	data := struct {
		FeatureFlag featureflag.FeatureFlag `json:"featureFlag"`
	}{
		editedFeatureFlag,
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": href,
		},
	}

	embedded := map[string]string{}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
