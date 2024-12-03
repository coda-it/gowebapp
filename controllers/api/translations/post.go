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

// CtrTranslationsPost - adds new key-value translation
func (c *Controller) CtrTranslationsPost(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		c.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var newTranslation translation.Translation

	err = json.Unmarshal(requestBody, &newTranslation)
	if err != nil {
		c.HandleErrorResponse(w, err.Error())
		return
	}

	application := c.PlatformUsecases.GetApplicationByDomain(c.Config, r)
	newTranslation.AppID = application.ID

	err = c.TranslationsUsecases.AddDynamicTranslation(newTranslation)

	if err != nil {
		c.HandleErrorResponse(w, "error adding new translation")
	}

	var data map[string]interface{}
	data = map[string]interface{}{
		"translation": struct{}{},
	}

	if err == nil {
		data = map[string]interface{}{
			"translation": newTranslation,
		}
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": constants.TranslationEndpointURL,
		},
	}

	embedded := map[string]interface{}{}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
