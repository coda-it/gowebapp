package post

import (
	"gopkg.in/mgo.v2/bson"
)

// Post - model representing post
type Post struct {
	ID          bson.ObjectId `json:"id" bson:"_id,omitempty"`
	UserID      string        `json:"userId" bson:"userId"`
	CategoryID  string        `json:"categoryId" bson:"categoryId"`
	Title       string        `json:"title" bson:"title"`
	Description string        `json:"description" bson:"description"`
}
