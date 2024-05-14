package post

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Post - model representing post
type Post struct {
	ID          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	UserID      string             `json:"userId" bson:"userId"`
	CategoryID  string             `json:"categoryId" bson:"categoryId"`
	Title       string             `json:"title" bson:"title"`
	Description string             `json:"description" bson:"description"`
	Image       string             `json:"image" bson:"image"`
	AppID       string             `json:"appId" bson:"appId"`
}
