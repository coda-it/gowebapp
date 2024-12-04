package featureflag

import "go.mongodb.org/mongo-driver/bson/primitive"

// FeatureFlag - model representing feature flag
type FeatureFlag struct {
	ID    primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	AppID string             `json:"appId" bson:"appId"`
	Key   string             `json:"key" bson:"key"`
	Value bool               `json:"value" bson:"value"`
}
