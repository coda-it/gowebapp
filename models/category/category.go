package category

import (
	"gopkg.in/mgo.v2/bson"
)

// Category - model representing category
type Category struct {
	ID   bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Name string        `json:"name" bson:"title"`
}
