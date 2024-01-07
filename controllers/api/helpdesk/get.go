package helpdesk

import (
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
)

// CtrTicketGet - renders ticket view
func (c *Controller) CtrTicketGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	ticketID := opt.Params["id"]
	ticket, err := c.HelpdeskUsecases.Get(ticketID)

	if err != nil {
		c.HandleErrorResponse(w, err.Error())
		return
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": href,
		},
	}

	embedded := map[string]interface{}{}

	c.HandleJSONResponse(w, ticket, embedded, links, http.StatusOK)
}
