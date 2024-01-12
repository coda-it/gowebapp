package helpdesk

import (
	ticketModel "github.com/coda-it/gowebapp/domain/models/ticket"
)

// IRepository - helpdesk repository interface
type IRepository interface {
	Add(ticket ticketModel.Ticket) (ticketModel.Ticket, error)
	Get(ticketID string) (ticketModel.Ticket, error)
}
