package post

import (
	"github.com/coda-it/gowebapp/constants"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
	"strconv"
)

// CtrPostGet - gets posts
func (c *Controller) CtrPostGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	userID := r.URL.Query().Get("userId")
	application := c.PlatformUsecases.GetApplicationByDomain(c.Config, r)
	posts, err := c.PostUsecases.FetchAll(application.ID, userID)

	if err != nil {
		c.HandleErrorResponse(w, err.Error())
		return
	}

	data := map[string]string{
		"count": strconv.Itoa(len(posts)),
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": constants.PostEndpointURL,
		},
	}

	embedded := map[string]interface{}{
		"posts": posts,
	}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
