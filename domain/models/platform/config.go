package platform

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Config - model representing platform config
type Config struct {
	ID               primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	AppID            string             `json:"appId" bson:"appId"`
	LandingModule    string             `json:"landingModule" bson:"landingModule"`
	StaticPage       string             `json:"staticPage" bson:"staticPage"`
	Language         string             `json:"language" bson:"language"`
	LoginRedirectURL string             `json:"loginRedirectURL" bson:"loginRedirectURL"`
}
