package ticket

import (
	"gopkg.in/mgo.v2/bson"
)

// Ticket - model representing helpdesk helpdesk
type Ticket struct {
	ID          bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Title       string        `json:"title" bson:"title"`
	Description string        `json:"description" bson:"description"`
}
