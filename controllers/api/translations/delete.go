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

// CtrTranslationDelete - deletes translation
func (c *Controller) CtrTranslationDelete(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	requestBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		c.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var deletedTranslation translation.Translation

	err = json.Unmarshal(requestBody, &deletedTranslation)
	if err != nil {
		c.HandleErrorResponse(w, err.Error())
		return
	}

	err = c.TranslationsUsecases.DeleteDynamicTranslation(deletedTranslation.ID)

	if err != nil {
		c.HandleErrorResponse(w, "error removing translation")
	}

	data := struct {
		Translation translation.Translation `json:"translation"`
	}{
		deletedTranslation,
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": constants.TranslationEndpointURL,
		},
	}

	embedded := map[string]string{}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
