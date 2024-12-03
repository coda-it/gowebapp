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

// CtrFeatureFlagDelete - deletes feature flag
func (c *Controller) CtrFeatureFlagDelete(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	requestBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		c.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var deletedFeatureFlag featureflag.FeatureFlag

	err = json.Unmarshal(requestBody, &deletedFeatureFlag)
	if err != nil {
		c.HandleErrorResponse(w, err.Error())
		return
	}

	err = c.FeatureFlagUsecases.DeleteFeatureFlag(deletedFeatureFlag.ID)

	if err != nil {
		c.HandleErrorResponse(w, "error removing feature flag")
	}

	data := struct {
		FeatureFlag featureflag.FeatureFlag `json:"featureFlag"`
	}{
		deletedFeatureFlag,
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": href,
		},
	}

	embedded := map[string]string{}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
