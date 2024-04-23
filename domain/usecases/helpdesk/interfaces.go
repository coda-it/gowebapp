package helpdesk

import (
	ticketModel "github.com/coda-it/gowebapp/domain/models/ticket"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// IRepository - helpdesk repository interface
type IRepository interface {
	Add(ticket ticketModel.Ticket) (ticketModel.Ticket, error)
	Delete(id primitive.ObjectID) error
	Get(ticketID string) (ticketModel.Ticket, error)
	FetchAll() ([]ticketModel.Ticket, error)
}
