package category

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Category - model representing category
type Category struct {
	ID    primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name  string             `json:"name" bson:"name"`
	Image string             `json:"image" bson:"image"`
	AppID string             `json:"appId" bson:"appId"`
}
