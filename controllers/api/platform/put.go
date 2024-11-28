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

// CtrPlatformPut - update post
func (c *Controller) CtrPlatformPut(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	requestBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		c.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var editedConfig platform.Config
	err = json.Unmarshal(requestBody, &editedConfig)
	if err != nil {
		c.HandleErrorResponse(w, err.Error())
		return
	}

	application := c.PlatformUsecases.GetApplicationByDomain(c.Config, r)
	editedConfig.AppID = application.ID

	err = c.PlatformUsecases.Update(editedConfig)

	if err != nil {
		c.HandleErrorResponse(w, "error updating platform config")
		return
	}

	data := struct {
		Config platform.Config `json:"config"`
	}{
		editedConfig,
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": href,
		},
	}

	embedded := map[string]string{}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
