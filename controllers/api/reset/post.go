package reset

import (
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

const resetHref string = "/api/reset"

// CtrResetDb - resets persistence
func (c *Controller) CtrResetDb(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	err := c.PlatformUsecases.Drop()

	if err != nil {
		c.HandleErrorResponse(w, "error clearing database")
		return
	}

	data := struct {
		Message string `json:"message"`
	}{
		"state cleared",
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": resetHref,
		},
	}

	embedded := map[string]string{}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
