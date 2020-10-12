package category

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/handlers"
	"github.com/coda-it/gowebapp/models/category"
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
		handlers.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var editedCategory category.Category

	err = json.Unmarshal(requestBody, &editedCategory)
	if err != nil {
		handlers.HandleErrorResponse(w, err.Error())
		return
	}

	err = c.CategoryUsecases.Update(editedCategory)
	if err != nil {
		handlers.HandleErrorResponse(w, "error updating category")
	}

	data := struct {
		Category category.Category `json:"category"`
	}{
		editedCategory,
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": "/api/categories",
		},
	}

	embedded := map[string]string{}

	handlers.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
