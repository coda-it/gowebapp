package helpdesk

import (
	ticketModel "github.com/coda-it/gowebapp/domain/models/ticket"
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

// Get - get helpdesk ticket
func (p *Usecase) Get(shortHash string) (ticketModel.Ticket, error) {
	return p.ticketRepository.Get(shortHash)
}
