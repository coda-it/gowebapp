package category

import (
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
	"strconv"
)

// CtrCategoryGet - gets categories
func (c *Controller) CtrCategoryGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	application := c.PlatformUsecases.GetApplicationByDomain(c.Config, r)
	categories, err := c.CategoryUsecases.FetchAll(application.ID)

	if err != nil {
		c.HandleErrorResponse(w, err.Error())
		return
	}

	data := map[string]string{
		"count": strconv.Itoa(len(categories)),
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": constants.CategoryEndpointURL,
		},
	}

	embedded := map[string]interface{}{
		"categories": categories,
	}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
