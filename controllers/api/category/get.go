package category

import (
	"github.com/coda-it/gowebapp/handlers"
	"github.com/coda-it/gowebapp/models/category"
	"github.com/coda-it/gowebapp/utils"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
	"strconv"
)

// CtrCategoryGet - gets categories
func CtrCategoryGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	p, err := utils.GetPersistence(s)
	if err != nil {
		handlers.HandleErrorResponse(w, err.Error())
		return
	}

	categories, err := category.FetchCategories(p)

	if err != nil {
		handlers.HandleErrorResponse(w, err.Error())
		return
	}

	data := map[string]string{
		"count": strconv.Itoa(len(categories)),
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": href,
		},
	}

	embedded := map[string]interface{}{
		"categories": categories,
	}

	handlers.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
