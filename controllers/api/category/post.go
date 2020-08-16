package category

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/handlers"
	"github.com/coda-it/gowebapp/models/category"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"io/ioutil"
	"net/http"
)

// CtrCategoryPost - adds new category
func CtrCategoryPost(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	requestBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		handlers.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var newCategory category.Category
	err = json.Unmarshal(requestBody, &newCategory)

	p, err := utils.GetPersistence(s)
	if err != nil {
		handlers.HandleErrorResponse(w, err.Error())
		return
	}

	err = category.AddCategory(p, newCategory)

	if err != nil {
		handlers.HandleErrorResponse(w, "error adding new category")
	}
}
