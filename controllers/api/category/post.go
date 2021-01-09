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

// CtrCategoryPost - adds new category
func (c *Controller) CtrCategoryPost(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	requestBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		c.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var newCategory category.Category
	err = json.Unmarshal(requestBody, &newCategory)

	err = c.CategoryUsecases.Add(newCategory)

	if err != nil {
		c.HandleErrorResponse(w, "error adding new category")
	}
}
