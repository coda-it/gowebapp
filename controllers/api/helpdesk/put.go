package helpdesk

import (
	"encoding/json"
	ticketModel "github.com/coda-it/gowebapp/domain/models/ticket"
	"github.com/coda-it/gowebserver/router"
	"github.com/coda-it/gowebserver/session"
	"github.com/coda-it/gowebserver/store"
	"io/ioutil"
	"net/http"
)

// CtrTicketPut - updates helpdesk ticket
func (c *Controller) CtrTicketPut(w http.ResponseWriter, r *http.Request, opt router.URLOptions, sm session.ISessionManager, s store.IStore) {
	requestBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		c.HandleErrorResponse(w, "error reading request body")
		return
	}
	defer r.Body.Close()

	var editedTicket ticketModel.Ticket

	err = json.Unmarshal(requestBody, &editedTicket)
	if err != nil {
		c.HandleErrorResponse(w, err.Error())
		return
	}

	ticket, err := c.HelpdeskUsecases.Update(editedTicket)
	if err != nil {
		c.HandleErrorResponse(w, "error updating ticket")
	}

	data := struct {
		Ticket ticketModel.Ticket `json:"ticket"`
	}{
		ticket,
	}

	links := map[string]map[string]string{
		"self": map[string]string{
			"href": "/api/helpdesk",
		},
	}

	embedded := map[string]string{}

	c.HandleJSONResponse(w, data, embedded, links, http.StatusOK)
}
