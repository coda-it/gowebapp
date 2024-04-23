package helpdesk

import (
	"encoding/json"
	"github.com/coda-it/gowebapp/domain/models/ticket"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"io/ioutil"
	"net/http"
)

// CtrTicketDelete - deletes helpdesk ticket
func (c *Controller) CtrTicketDelete(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		c.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var deletedTicket ticket.Ticket
	err = json.Unmarshal(requestBody, &deletedTicket)

	err = c.HelpdeskUsecases.Delete(deletedTicket.ID)

	if err != nil {
		c.HandleErrorResponse(w, "error removing ticket")
	}

	data := struct {
		Ticket ticket.Ticket `json:"ticket"`
	}{
		deletedTicket,
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": "/api/tickets",
		},
	}

	embedded := map[string]string{}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
