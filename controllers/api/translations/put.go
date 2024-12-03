package translations

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebapp/domain/models/translation"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"io/ioutil"
	"net/http"
)

// CtrTranslationPut - update translation
func (c *Controller) CtrTranslationPut(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	requestBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		c.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var editedTranslation translation.Translation
	err = json.Unmarshal(requestBody, &editedTranslation)
	if err != nil {
		c.HandleErrorResponse(w, err.Error())
		return
	}

	application := c.PlatformUsecases.GetApplicationByDomain(c.Config, r)
	editedTranslation.AppID = application.ID

	err = c.TranslationsUsecases.UpdateDynamicTranslation(editedTranslation)

	if err != nil {
		c.HandleErrorResponse(w, "error updating translation")
	}

	data := struct {
		Translation translation.Translation `json:"translation"`
	}{
		editedTranslation,
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": constants.TranslationEndpointURL,
		},
	}

	embedded := map[string]string{}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
