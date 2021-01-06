package category

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/domain/models/category"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"io/ioutil"
	"net/http"
)

// CtrCategoryDelete - deletes category
func (c *Controller) CtrCategoryDelete(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		c.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var deletedCategory category.Category
	err = json.Unmarshal(requestBody, &deletedCategory)

	err = c.CategoryUsecases.Delete(deletedCategory.ID)

	if err != nil {
		c.HandleErrorResponse(w, "error removing category")
	}

	data := struct {
		Category category.Category `json:"category"`
	}{
		deletedCategory,
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": "/api/categories",
		},
	}

	embedded := map[string]string{}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
