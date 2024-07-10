package translation

import "go.mongodb.org/mongo-driver/bson/primitive"

// Translation - model representing translation
type Translation struct {
	ID       primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	AppID    string             `json:"appId" bson:"appId"`
	Key      string             `json:"key" bson:"key"`
	Value    string             `json:"value" bson:"value"`
	Language string             `json:"language" bson:"language"`
}
