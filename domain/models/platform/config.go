package platform

import (
	"gopkg.in/mgo.v2/bson"
)

// Config - model representing platform config
type Config struct {
	ID            bson.ObjectId `json:"id" bson:"_id,omitempty"`
	LandingModule string        `json:"landingModule" bson:"landingModule"`
	StaticPage    string        `json:"staticPage" bson:"staticPage"`
}
