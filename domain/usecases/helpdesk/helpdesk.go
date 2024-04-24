package helpdesk

import (
	ticketModel "github.com/coda-it/gowebapp/domain/models/ticket"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Usecase - helpdesk usecases
type Usecase struct {
	ticketRepository IRepository
}

// New - creates new helpdesk usecases
func New(tr IRepository) *Usecase {
	return &Usecase{
		tr,
	}
}

// Add - add helpdesk to persistence
func (p *Usecase) Add(ticket ticketModel.Ticket) (ticketModel.Ticket, error) {
	return p.ticketRepository.Add(ticket)
}

// Delete - delete helpdesk ticket
func (p *Usecase) Delete(id primitive.ObjectID) error {
	return p.ticketRepository.Delete(id)
}

// Update - updates helpdesk ticket
func (p *Usecase) Update(ticket ticketModel.Ticket) (ticketModel.Ticket, error) {
	return p.ticketRepository.Update(ticket)
}

// Get - get helpdesk ticket
func (p *Usecase) Get(shortHash string) (ticketModel.Ticket, error) {
	return p.ticketRepository.Get(shortHash)
}

// FetchAll - fetches all helpdesk tickets
func (p *Usecase) FetchAll() ([]ticketModel.Ticket, error) { return p.ticketRepository.FetchAll() }
