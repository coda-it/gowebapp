package helpdesk

import (
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"net/http"
	"strconv"
)

// CtrTicketGet - renders ticket view
func (c *Controller) CtrTicketGet(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	shortHash := opt.Params["id"]
	ticket, err := c.HelpdeskUsecases.Get(shortHash)

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

// CtrTicketGetAll - renders ticket view
func (c *Controller) CtrTicketGetAll(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	tickets, err := c.HelpdeskUsecases.FetchAll()

	if err != nil {
		c.HandleErrorResponse(w, err.Error())
		return
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": href,
		},
	}

	data := map[string]string{
		"count": strconv.Itoa(len(tickets)),
	}

	embedded := map[string]interface{}{
		"tickets": tickets,
	}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
