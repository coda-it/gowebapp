package helpdesk

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/domain/models/ticket"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"io"
	"net/http"
)

// CtrTicketPost - adds new helpdesk
func (c *Controller) CtrTicketPost(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	requestBody, err := io.ReadAll(r.Body)
	if err != nil {
		c.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var newTicket ticket.Ticket

	err = json.Unmarshal(requestBody, &newTicket)
	if err != nil {
		c.HandleErrorResponse(w, err.Error())
		return
	}

	application := c.PlatformUsecases.GetApplicationByDomain(c.Config, r)
	newTicket.AppID = application.ID

	createdTicket, err := c.HelpdeskUsecases.Add(newTicket)

	if err != nil {
		c.HandleErrorResponse(w, "error adding new helpdesk ticket")
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": href,
		},
	}

	embedded := map[string]interface{}{}

	c.HandleJSONResponse(w, createdTicket, embedded, links, http.StatusOK)
}
