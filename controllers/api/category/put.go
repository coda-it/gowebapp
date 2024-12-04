package category

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebapp/domain/models/category"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"io/ioutil"
	"net/http"
)

// CtrCategoryPut - updates category
func (c *Controller) CtrCategoryPut(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	requestBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		c.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var editedCategory category.Category

	err = json.Unmarshal(requestBody, &editedCategory)
	if err != nil {
		c.HandleErrorResponse(w, err.Error())
		return
	}

	application := c.PlatformUsecases.GetApplicationByDomain(c.Config, r)
	editedCategory.AppID = application.ID

	err = c.CategoryUsecases.Update(editedCategory)
	if err != nil {
		c.HandleErrorResponse(w, "error updating category")
	}

	data := struct {
		Category category.Category `json:"category"`
	}{
		editedCategory,
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": constants.CategoryEndpointURL,
		},
	}

	embedded := map[string]string{}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
