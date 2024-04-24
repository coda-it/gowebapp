package ticket

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Ticket - model representing helpdesk helpdesk
type Ticket struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	ShortHash   string             `json:"shortHash" bson:"shortHash"`
	Title       string             `json:"title" bson:"title"`
	Description string             `json:"description" bson:"description"`
	Status      string             `json:"status" bson:"status"`
}
