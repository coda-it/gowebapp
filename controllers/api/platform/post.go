package platform

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/domain/models/platform"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"io/ioutil"
	"net/http"
)

const platformHref string = "/api/platform"

// CtrPlatformPost - insert platform info
func (c *Controller) CtrPlatformPost(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		c.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var newConfig platform.Config

	err = json.Unmarshal(requestBody, &newConfig)
	if err != nil {
		c.HandleErrorResponse(w, err.Error())
		return
	}

	err = c.PlatformUsecases.Add(newConfig)

	if err != nil {
		c.HandleErrorResponse(w, "error adding new platform config")
		return
	}

	var data map[string]interface{}
	data = map[string]interface{}{
		"config": struct{}{},
	}

	appConfig, err := c.PlatformUsecases.Fetch()
	if err == nil {
		data = map[string]interface{}{
			"config": appConfig,
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
