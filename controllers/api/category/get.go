package category

import (
	"github.com/coda-it/gowebapp/handlers"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
	"strconv"
)

// CtrCategoryGet - gets categories
func (c* CategoryController) CtrCategoryGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	categories, err := c.CategoryUsecases.FetchCategories()

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
