package helpdesk

import (
	"github.com/coda-it/goutils/fixedhash"
	"github.com/coda-it/gowebapp/data/persistence"
	ticketModel "github.com/coda-it/gowebapp/domain/models/ticket"
	"gopkg.in/mgo.v2/bson"
)

const (
	collectionName = "tickets"
)

// Repository - post repository
type Repository struct {
	Persistence persistence.IPersistance
}

// New - creates new post repository
func New(p persistence.IPersistance) Repository {
	return Repository{
		p,
	}
}

// Add - add helpdesk to persistence
func (p *Repository) Add(ticket ticketModel.Ticket) (ticketModel.Ticket, error) {
	ticketsCollection := p.Persistence.GetCollection(collectionName)

	newID := bson.NewObjectId()
	shortHash, err := fixedhash.FixedHash(8)

	if err != nil {
		return ticketModel.Ticket{}, err
	}

	newTicket := ticketModel.Ticket{
		ID:          newID,
		ShortHash:   shortHash,
		Title:       ticket.Title,
		Description: ticket.Description,
	}

	err = ticketsCollection.Insert(newTicket)

	if err != nil {
		return ticketModel.Ticket{}, err
	}

	return newTicket, nil
}

func (p *Repository) Get(shortHash string) (ticketModel.Ticket, error) {
	ticketsCollection := p.Persistence.GetCollection(collectionName)

	var ticket ticketModel.Ticket
	searchQuery := bson.M{"shortHash": shortHash}

	err := ticketsCollection.Find(searchQuery).One(&ticket)

	if err != nil {
		return ticket, err
	}

	return ticket, nil
}
