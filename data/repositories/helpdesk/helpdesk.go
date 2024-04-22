package helpdesk

import (
	"context"
	"github.com/coda-it/goutils/fixedhash"
	"github.com/coda-it/gowebapp/data/persistence"
	ticketModel "github.com/coda-it/gowebapp/domain/models/ticket"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

	newID := primitive.NewObjectID()
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

	_, err = ticketsCollection.InsertOne(context.TODO(), newTicket)

	if err != nil {
		return ticketModel.Ticket{}, err
	}

	return newTicket, nil
}

// Get - gets one ticket by ID
func (p *Repository) Get(shortHash string) (ticketModel.Ticket, error) {
	ticketsCollection := p.Persistence.GetCollection(collectionName)

	var ticket ticketModel.Ticket
	searchQuery := bson.M{"shortHash": shortHash}

	result := ticketsCollection.FindOne(context.TODO(), searchQuery)
	err := result.Decode(&ticket)

	if err != nil {
		return ticket, err
	}

	return ticket, nil
}

// FetchAll - fetches all tickets
func (p *Repository) FetchAll() ([]ticketModel.Ticket, error) {
	ticketsCollection := p.Persistence.GetCollection(collectionName)

	var tickets []ticketModel.Ticket
	var searchQuery bson.M

	cursor, err := ticketsCollection.Find(context.TODO(), searchQuery)
	if err != nil {
		return tickets, err
	}

	err = cursor.All(context.TODO(), &tickets)
	if err != nil {
		return tickets, err
	}

	return tickets, nil
}
